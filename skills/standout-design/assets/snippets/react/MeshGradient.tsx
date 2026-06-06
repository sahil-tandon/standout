/**
 * MeshGradient
 * ------------
 * An animated mesh / aurora gradient background, Stripe-MiniGL style. A single
 * full-screen fragment shader blends 2-3 colour stops through layered simplex
 * noise so the colour fields swirl and breathe. Rendered with raw WebGL on one
 * <canvas> - no three.js, no react-three, ~3KB of runtime.
 *
 * Why raw WebGL (no library): a gradient needs exactly one full-screen triangle
 * and one shader. Pulling in three.js (~600KB) for that is wasteful; raw WebGL
 * keeps this snippet dependency-free and trivially embeddable as a background.
 *
 * Usage:
 *   <div style={{ position: "fixed", inset: 0, zIndex: -1 }}>
 *     <MeshGradient
 *       colors={["#5b21b6", "#2563eb", "#06b6d4"]}
 *       speed={0.6}
 *     />
 *   </div>
 *
 * Colour stops: pass any CSS hex. They are sRGB; for perceptually even blends
 * prefer colours you picked in OKLCH (e.g. via `oklch()` in DevTools) and paste
 * their hex here. The mix happens in linear-ish RGB in the shader.
 *
 * REDUCED MOTION: when `prefers-reduced-motion: reduce`, the animation loop is
 * never started and we draw a single static frame (uTime frozen at a pleasant
 * offset), so users still get the gradient, just not the movement.
 *
 * Dependencies: react@^19. No other deps. TypeScript.
 */

import { useEffect, useRef } from "react";
import { useReducedMotion } from "./useReducedMotion";

export interface MeshGradientProps {
  /** 2-5 CSS hex colour stops. */
  colors?: string[];
  /** Animation speed multiplier (1 = default). */
  speed?: number;
  /** Spatial scale of the noise; smaller = bigger, softer blobs. */
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
}

const DEFAULT_COLORS = ["#5b21b6", "#2563eb", "#06b6d4", "#10b981"];

const VERT = /* glsl */ `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = /* glsl */ `
precision highp float;
uniform vec2  uResolution;
uniform float uTime;
uniform float uScale;
uniform int   uCount;
uniform vec3  uColors[5];

// --- simplex noise 2D (Ashima / McEwan, public domain) ----------------------
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy));
  vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1;
  i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);
  m=m*m; m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0;
  vec3 h=abs(x)-0.5;
  vec3 ox=floor(x+0.5);
  vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g;
  g.x=a0.x*x0.x+h.x*x0.y;
  g.yz=a0.yz*x12.xz+h.yz*x12.yw;
  return 130.0*dot(m,g);
}

vec3 colorAt(int idx){
  // Index a const-sized array with a dynamic int (GLES2-safe via branches).
  if(idx==0) return uColors[0];
  if(idx==1) return uColors[1];
  if(idx==2) return uColors[2];
  if(idx==3) return uColors[3];
  return uColors[4];
}

void main(){
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  vec2 p = vec2(uv.x * aspect, uv.y) * uScale;
  float t = uTime;

  // Three drifting noise layers at different frequencies/phases.
  float n1 = snoise(p + vec2(t * 0.10, t * 0.06));
  float n2 = snoise(p * 1.7 + vec2(-t * 0.08, t * 0.12) + 11.3);
  float n3 = snoise(p * 0.6 + vec2(t * 0.05, -t * 0.04) - 5.1);

  // Map noise into [0,1] blend weights along the palette.
  float a = 0.5 + 0.5 * n1;
  float b = 0.5 + 0.5 * (n2 * 0.7 + n3 * 0.3);

  int n = uCount;
  // Blend consecutive stops by `a`, then cross-blend two passes by `b`.
  float fpos = a * float(n - 1);
  int i0 = int(floor(fpos));
  int i1 = i0 + 1; if (i1 > n - 1) i1 = n - 1;
  float f = fract(fpos);
  vec3 lowPass = mix(colorAt(i0), colorAt(i1), f);

  float gpos = b * float(n - 1);
  int j0 = int(floor(gpos));
  int j1 = j0 + 1; if (j1 > n - 1) j1 = n - 1;
  float g = fract(gpos);
  vec3 hiPass = mix(colorAt(j0), colorAt(j1), g);

  vec3 col = mix(lowPass, hiPass, 0.5 + 0.4 * n3);

  // Subtle vignette for depth.
  float vig = smoothstep(1.3, 0.2, distance(uv, vec2(0.5)));
  col *= mix(0.85, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const int = parseInt(full, 16);
  return [((int >> 16) & 255) / 255, ((int >> 8) & 255) / 255, (int & 255) / 255];
}

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(sh);
    gl.deleteShader(sh);
    throw new Error("MeshGradient shader compile error: " + log);
  }
  return sh;
}

export function MeshGradient({
  colors = DEFAULT_COLORS,
  speed = 1,
  scale = 2.2,
  className,
  style,
}: MeshGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
    if (!gl) return; // No WebGL: leave the canvas transparent / let CSS bg show.

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    gl.useProgram(program);

    // Full-screen quad (two triangles).
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]), // single big triangle trick
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uScale = gl.getUniformLocation(program, "uScale");
    const uCount = gl.getUniformLocation(program, "uCount");

    const stops = colors.slice(0, 5);
    const flat = new Float32Array(15); // 5 * vec3
    stops.forEach((c, i) => {
      const [r, g, b] = hexToRgb(c);
      flat[i * 3] = r;
      flat[i * 3 + 1] = g;
      flat[i * 3 + 2] = b;
    });
    gl.uniform3fv(gl.getUniformLocation(program, "uColors"), flat);
    gl.uniform1i(uCount, stops.length);
    gl.uniform1f(uScale, scale);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    function resize() {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    }
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();

    function draw(now: number) {
      const elapsed = ((now - start) / 1000) * speed;
      gl.uniform1f(uTime, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(draw);
    }

    if (reduced) {
      // Static frame at a pleasant phase offset.
      gl.uniform1f(uTime, 12.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteBuffer(buf);
    };
  }, [colors, speed, scale, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ display: "block", width: "100%", height: "100%", ...style }}
      aria-hidden="true"
    />
  );
}

export default MeshGradient;
