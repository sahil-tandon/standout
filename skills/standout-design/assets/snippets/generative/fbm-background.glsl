// fbm-background.glsl
// -------------------
// A reusable full-screen fragment shader for an "expensive"-looking abstract
// background: simplex noise -> fractal Brownian motion (fbm) -> domain warping
// (fbm of fbm) for those organic, marbled, ink-in-water fields. Cheap enough to
// run full-screen at 60fps on integrated GPUs at OCTAVES = 5.
//
// Targets WebGL1 (GLSL ES 1.00). For WebGL2 / desktop GL, swap `gl_FragColor`
// for an `out vec4` and bump the `#version` line.
//
// UNIFORMS (set these from JS):
//   uTime        float  seconds since start (drives the drift)
//   uResolution  vec2   canvas size in device pixels
//   uMouse       vec2   pointer in pixels (0,0 top-left); pulls the warp toward it
//   uColorA..C   vec3   three palette stops (linear/sRGB 0..1)
//   uSpeed       float  time multiplier (default 1.0)
//
// REDUCED MOTION: there is no per-frame state in the shader, so honouring
// `prefers-reduced-motion` is the host's job: simply stop updating `uTime`
// (freeze it at a fixed value, e.g. 8.0) and render a single frame. See the
// mounting boilerplate at the bottom.
//
// -------- MOUNT BOILERPLATE (raw WebGL, paste into a .js file) --------------
// const gl = canvas.getContext('webgl');
// const vs = `attribute vec2 p; void main(){ gl_Position = vec4(p,0.,1.); }`;
// const fs = /* this file's source as a string */;
// function sh(t,s){const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);
//   if(!gl.getShaderParameter(o,gl.COMPILE_STATUS))throw gl.getShaderInfoLog(o);return o;}
// const prog=gl.createProgram();
// gl.attachShader(prog,sh(gl.VERTEX_SHADER,vs));
// gl.attachShader(prog,sh(gl.FRAGMENT_SHADER,fs));
// gl.linkProgram(prog); gl.useProgram(prog);
// const buf=gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER,buf);
// gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
// const loc=gl.getAttribLocation(prog,'p');
// gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc,2,gl.FLOAT,false,0,0);
// const U=n=>gl.getUniformLocation(prog,n);
// gl.uniform3f(U('uColorA'),0.05,0.03,0.18);
// gl.uniform3f(U('uColorB'),0.85,0.20,0.55);
// gl.uniform3f(U('uColorC'),0.30,0.75,0.95);
// gl.uniform1f(U('uSpeed'),1.0);
// const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
// const t0=performance.now();
// function frame(now){
//   gl.uniform2f(U('uResolution'),canvas.width,canvas.height);
//   gl.uniform1f(U('uTime'), reduced ? 8.0 : (now-t0)/1000);
//   gl.viewport(0,0,canvas.width,canvas.height);
//   gl.drawArrays(gl.TRIANGLES,0,3);
//   if(!reduced) requestAnimationFrame(frame);
// }
// requestAnimationFrame(frame); // reduced: draws exactly one frozen frame
// ----------------------------------------------------------------------------

precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMouse;
uniform vec3  uColorA;
uniform vec3  uColorB;
uniform vec3  uColorC;
uniform float uSpeed;

#define OCTAVES 5

// --- simplex noise 2D (Ashima Arts / Stefan Gustavson, public domain) -------
vec3 mod289(vec3 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x){ return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x){ return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                         + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                          dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x  = 2.0 * fract(p * C.www) - 1.0;
  vec3 h  = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// --- fractal Brownian motion: sum noise octaves at rising frequency ---------
float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  float frequency = 1.0;
  // Slight rotation per octave breaks up axis-aligned artifacts.
  mat2 rot = mat2(0.80, 0.60, -0.60, 0.80);
  for (int i = 0; i < OCTAVES; i++) {
    value += amplitude * snoise(p * frequency);
    p = rot * p;
    frequency *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  // Normalised, aspect-corrected coords centred-ish on the screen.
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y);

  float t = uTime * uSpeed * 0.15;
  vec2 mouse = uMouse / uResolution.xy;

  // --- domain warping: warp the lookup coords by two fbm fields -------------
  // q displaces p; r displaces (p + q). This nested distortion is what gives
  // the marbled / fluid look (Inigo Quilez "warp" technique).
  vec2 q = vec2(
    fbm(p + vec2(0.0, 0.0) + t),
    fbm(p + vec2(5.2, 1.3) - t)
  );

  vec2 r = vec2(
    fbm(p + 4.0 * q + vec2(1.7, 9.2) + 0.15 * t + mouse * 0.6),
    fbm(p + 4.0 * q + vec2(8.3, 2.8) - 0.12 * t)
  );

  float f = fbm(p + 4.0 * r);

  // --- colour mapping: blend the three stops by warp fields -----------------
  vec3 col = mix(uColorA, uColorB, clamp(f * f * 2.0, 0.0, 1.0));
  col = mix(col, uColorC, clamp(length(q), 0.0, 1.0));
  col = mix(col, uColorB, clamp(length(r.x), 0.0, 1.0));

  // Lift midtones, keep some contrast.
  col = pow(col, vec3(0.85));
  col *= 0.7 + 0.6 * f;

  // Soft vignette.
  float vig = smoothstep(1.2, 0.25, distance(uv, vec2(0.5)));
  col *= mix(0.75, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
