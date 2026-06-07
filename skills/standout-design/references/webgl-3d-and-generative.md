# WebGL, 3D, and generative visuals

Use this when a brief calls for an immersive 3D world, a reactive background, a
liquid/glass effect, particle work, image transitions, or one-of-a-kind
generative motifs. The goal is awe that is cheap to run and earns its weight.

## Contents

- [When 3D earns its place](#when-3d-earns-its-place)
- [Fake and bake, do not compute](#fake-and-bake-do-not-compute)
- [The recurring archetypes](#the-recurring-archetypes)
- [Shader patterns](#shader-patterns)
- [Rendering UI inside WebGL (the tradeoff)](#rendering-ui-inside-webgl-the-tradeoff)
- [Fluid / liquid glass](#fluid--liquid-glass)
- [The toolchain](#the-toolchain)
- [Asset and delivery pipeline](#asset-and-delivery-pipeline)
- [The render-to-FBO skeleton](#the-render-to-fbo-skeleton)
- [Generative visuals](#generative-visuals)
- [Generative color](#generative-color)
- [Shipping generative art](#shipping-generative-art)

---

## When 3D earns its place

Award-tier 3D is almost never "a model sitting on a page." It is a medium for
motion and atmosphere. The single rule that separates great from gimmick:

**The 3D earns its weight only if it is reactive** (mouse, scroll velocity,
audio, time). Static 3D loses to a good photo. The one-of-a-kind feeling comes
from a bespoke shader, not from heavier geometry.

Two corollaries:

- **Awe does not require WebGL.** A noise gradient, a CSS/Canvas grain layer, a
  scroll-driven SVG, or kinetic type can carry the same emotional weight at a
  fraction of the cost. Reach for WebGL when the effect is genuinely per-pixel,
  reactive, and full-viewport, not by default.
- **A reactive shader beats heavy geometry.** A single high-subdivision sphere
  plus noise in the vertex shader reads as more "expensive" than an imported
  glTF with thousands of triangles, and runs faster.
- **Deploy 3D at a few moments, not as a whole-site VR layer.** The strongest 3D
  sites (Montfort-style flight-throughs, a single rotating hero product) use 3D to
  spike attention at chosen beats (hero, one product reveal, one scene change) and
  carry the rest with cheaper depth (parallax layers, scrollytelling, faux-3D
  transforms). Continuous full-immersion reads as a tech demo and punishes old
  hardware; the juxtaposition of one 3D moment against flat sections is what creates
  hierarchy.

---

## Fake and bake, do not compute

The "expensive" look is usually baked art direction, not real-time simulation.
Pick tricks that delete entire systems:

- **Baked lighting.** Bake the whole scene's light and shadow into one texture in
  Blender, then ship a single unlit material. This is the cheapest possible
  "realistic" scene and the technique behind many award 3D worlds. A fully
  hand-baked portfolio can ship in single-digit megabytes by faking all lighting
  and shadows.
- **Matcaps** for instant material lighting with no lights in the scene.
- **Primitive collision shapes** instead of mesh-accurate physics.
- **2D sprite compositing** of a pre-rendered 3D film instead of real-time global
  illumination.

When you choose between "simulate it" and "bake it," bake it. Baked lighting and
"code structuring for bigger projects" are the two most under-appreciated rungs
of the 3D skill ladder; shaders are the largest single investment.

---

## The recurring archetypes

Most award WebGL is one of these. Pick the archetype, then build the minimum
shader that delivers it.

- **Hero scene** - a full-bleed canvas behind or around the headline: a single
  drifting blob, particle field, or distorted plane. The most common usage.
- **Product showcase** - a rotatable, scroll-driven hero product (sneaker,
  bottle, device, car). Camera orbits/flies as you scroll; usually a glTF model
  with custom materials, studio lighting, and post.
- **Particle field** - instanced or GPGPU particles forming a logo, text, or
  drifting "dreamy" dust. High wow-to-weight ratio.
- **Fluid / blob / metaball** - organic, gooey, liquid-metal forms driven by
  noise in the vertex shader. Reads as expensive, is cheap: one high-subdivision
  sphere/icosahedron plus a shader.
- **Distortion** - RGB shift, refraction, displacement, "liquid" warping of
  images/text reacting to mouse and scroll velocity.
- **Interactive background** - ambient WebGL that responds to the cursor
  (gradient mesh, noise flow field, ripple/water).
- **WebGL image transitions** - the signature agency move: images live as
  DOM-positioned shader planes; hover or route change drives a shader transition
  (displacement-map wipe, RGB split, melt, page-curtain).

---

## Shader patterns

### Organic motion: noise + time + mouse uniform

Simplex/Perlin/curl noise in the **vertex shader** displaces vertices over
`uTime` to make blobs breathe and surfaces ripple. In the **fragment shader** it
drives gradient meshes and flow fields. The formula for organic motion is always
**noise + time + a mouse/scroll uniform**. drei's `MeshDistortMaterial` is the
no-shader shortcut for the blob look.

### Image hover / distortion / transition

A textured plane samples the image; UV manipulation does the work (multiplying UV
scales the image, adding shifts it). A displacement texture plus `mix()` between
two images on a `progress` uniform yields the signature **WebGL image
transition**. Add an RGB split (sample R/G/B at offset UVs) for chromatic edges.
Feed mouse position and **scroll velocity** uniforms for the "liquid" feel.

You can build organic reveal masks with **zero texture payload** by combining a
circle SDF with summed trig waves:

```glsl
float d = length(r - c);
float mask = step(d, radius);              // circle SDF
float angle = atan(p.y, p.x);
float w0 = (cos(angle * f) + 1.0) / 2.0;
float w1 = (sin(2.0 * angle * f) + 1.0) / 2.0;
float w2 = (cos(3.0 * angle * f) + 1.0) / 2.0;
float wave = (w0 + w1 + w2) / 3.0;         // wobbly edge, no noise lib
float t = pow(uProgress, 1.5);             // ease inside the shader
```

Merge multiple blobs with a soft-max instead of `max()`:

```glsl
float softMax(float a, float b, float k){ return log(exp(k*a)+exp(k*b))/k; }
```

### The uProgress scroll contract

Every scroll-revealed plane is driven by one float `uProgress` (0 to 1) written
from a **smooth-scroll loop** (Lenis), not from raw `scroll` events. The
non-negotiable: drive WebGL plane positions from the **same interpolated scroll
value** you give the DOM, or HTML and canvas drift apart by a frame or two.

### Instanced particles

`InstancedMesh` draws thousands of particles in **one draw call**; the CPU sets
per-instance matrices/colors. Good up to tens of thousands when motion is simple
and CPU-driven.

### GPGPU / FBO particles (the high-end version)

Particle state (position, velocity) lives **in textures, not CPU arrays**: each
pixel's RGB encodes one particle's XYZ. A fragment shader updates the texture
off-screen into a `WebGLRenderTarget` (FBO); the result feeds the next frame via
**ping-pong buffers** (two textures alternating to avoid a read/write conflict).
Three.js's `GPUComputationRenderer` handles the ping-pong, color format, and
plumbing. Forces (mouse repulsion, attraction back to a mesh surface, curl-noise
flow) are computed in the sim shader, so **hundreds of thousands of particles**
run in parallel on the GPU where the CPU would choke. Pair with **additive
blending + bloom** for the dreamy-dust aesthetic.

On WebGPU + TSL, the storage-buffer form retires ping-pong: allocate
`instancedArray(COUNT, 'vec3')`, address by `instanceIndex`, wrap the update in
`Fn(...).compute(COUNT)`, and run `await gl.computeAsync(node)` in the frame
loop. Cleaner and the modern path.

### Bloom (selective by default)

In pmndrs postprocessing / react-postprocessing, bloom is **selective**: nothing
glows unless a material's color is pushed **outside the 0-1 range** (emissive > 1)
and `luminanceThreshold` is ~1. Light only specific meshes by setting
`emissiveIntensity > 1` or `color={[r*4, g*4, b*4]}`. This is the modern glow
path: emissive > 1 plus an MRT mask. Use post passes sparingly; each is a
full-screen redraw and a real perf cost.

---

## Rendering UI inside WebGL (the tradeoff)

If you already own the render loop, you can render text and UI **inside** WebGL
with SDF/MSDF glyphs for a seamless world (text dissolving into particles, text
that refracts). The cost: you must **re-solve accessibility, text selection, and
SEO** with a parallel semantic layer (see `accessibility.md`).

Default rule: keep headlines and body copy as **real HTML overlaid on the
canvas** (absolutely positioned, `pointer-events: none` where needed). You get
crisp text, selection, zoom, and indexing for free. Render text into WebGL only
when the effect itself is the text (MSDF dissolve, extrusion), and pair it with a
real HTML mirror.

---

## Fluid / liquid glass

The trendy refraction effect. drei's `<MeshTransmissionMaterial>` is production
glass in one component, with a second full-scene FBO pass for real refraction and
chromatic dispersion:

```jsx
<MeshTransmissionMaterial
  transmission={1}
  thickness={0.5}
  roughness={0.1}
  chromaticAberration={0.4}
  anisotropicBlur={0.3}
  distortion={0.2}
  temporalDistortion={0.1}
  resolution={256}        // drop to 128-256; this is the FBO pass cost
/>
```

Perf rules: drop `resolution` to **128-256**, cap DPR, use **one mesh not many**,
ship a CSS-glass fallback, and keep text off the refracted layer. Use it like a
**lens** (to reveal, focus, add depth), not as wallpaper.

For finer control than the off-the-shelf material, write a custom shader:
dispersion is **per-channel IOR** (refract R, G, B separately with
`uIorR/uIorG/uIorB`, sample `uTexture` at each offset, recombine; split into 6
bands RYGCBV for richer rainbows). Thick glass = render `THREE.BackSide` and
`THREE.FrontSide` into separate FBOs so light refracts through the back surface
before the front. Finish with Fresnel
(`pow(1.0 - abs(dot(eye, normal)), uFresnelPower)`).

---

## The toolchain

| Tool | Job | Notes |
|---|---|---|
| **Raw WebGL/WebGL2** | The browser 3D API | Teaching / tiny effects only; nobody hand-writes whole sites. |
| **OGL** (`oframe/ogl`) | Minimal WebGL lib | Three-like API, far fewer features, ~10x smaller. The pick for image-distortion / shader-plane sites where Three.js is overkill. Small bundle = good Core Web Vitals. |
| **Three.js** | The default WebGL engine | The workhorse: scene graph, loaders, materials, `EffectComposer`, `GPUComputationRenderer`. Now also a WebGPU renderer + TSL path. |
| **R3F + drei** | React renderer + helpers | Dominant in React/Next. drei gives `<Float>`, `<MeshDistortMaterial>`, `<MeshTransmissionMaterial>`, `<Environment>`, `<ScrollControls>`, `<Instances>`, `useFBO`, `shaderMaterial`. |
| **Babylon.js** | Full 3D engine | More game-engine; strong for configurators and WebXR; less common on pure-aesthetic sites. |
| **Spline** | No-code 3D authoring | Designer-friendly; exports to R3F or an embeddable component. Perf degrades on complex scenes; best for one small hero object. Export to R3F to regain shader control. |
| **Womp** | No-code 3D, liquid/organic | Browser modeller for soft morphing blob forms; the fast path to a friendly 3D hero object without Blender. Export glb. |
| **A-Frame** | HTML-tag 3D / WebXR | Declarative `<a-scene>` tags over Three.js; quickest entry for scene/WebXR work without JS. |
| **curtains.js** | DOM images/videos to shader planes | You size/position planes with CSS; the lib keeps WebGL planes synced to DOM scroll/resize. |
| **pmndrs postprocessing** | Bloom, chromatic aberration, AO | Merges effects into fewer passes; reach for N8AO and SSR for realism. |

The library-to-effect map and animation stack live in `tech-stack.md`.

---

## Asset and delivery pipeline

A 3D hero is only as good as its load. Most "3D site is slow" failures are
shipping a raw, uncompressed model and rendering at full device pixel ratio.

- **Ship glTF/`.glb`, compressed.** glTF is the web's 3D format; `.glb` is the
  binary single-file form. Run every model through **gltf-transform** or
  **gltfpack**: **Draco** or **meshopt** for geometry, **KTX2 / Basis** for GPU
  texture compression. This routinely cuts a model 5 to 10x with no visible loss.
  Bake lighting first (see above) so you can ship one unlit material.
- **Clamp the pixel ratio.** `gl.setPixelRatio(Math.min(devicePixelRatio, 2))` (or
  ~1.5 for heavy shaders). Retina screens otherwise render 4x the pixels for no
  perceptible gain; this is the single biggest framerate win.
- **Lazy-load and gate the canvas.** Mount WebGL only when in view and only above a
  capability/connection floor; serve a baked image or video poster otherwise, and
  never let the canvas block first paint or the reading path.
- **Source models** from Sketchfab (CC + online editor), Poly Haven and Quaternius
  (free, web-ready), or CGTrader / TurboSquid (marketplace) rather than modelling
  from scratch; retopo and re-bake before shipping.

---

## The render-to-FBO skeleton

One reusable loop sits behind refraction, caustics, trails, and post-FX: render
the rest of the scene into an offscreen texture, then sample it as a uniform on
the effect mesh.

```js
const target = useFBO();
useFrame((state) => {
  const { gl, scene, camera } = state;
  mesh.current.visible = false;     // 1. hide the effect mesh
  gl.setRenderTarget(target);       // 2. render the scene into an FBO
  gl.render(scene, camera);
  mesh.current.material.uniforms.uTexture.value = target.texture;
  gl.setRenderTarget(null);         // 3. back to screen
  mesh.current.visible = true;      // 4. mesh samples the scene behind it
});
```

For volumetric work (clouds, fog): a **constant-step** march (`depth +=
MARCH_SIZE`, not SDF distance), density from inverted SDF + fBm, a nested light
march toward the sun, Beer's Law (`transmittance = exp(-density * absorption)`),
and a **blue-noise dithered ray start** so you can render at **0.5x resolution**
then bicubic-upscale. That last step is the performance unlock.

---

## Generative visuals

Generative art computes the image from rules and a seed, so the output is
genuinely one-of-a-kind. Two foundations: **The Nature of Code** (CPU/canvas,
algorithmic motion) and **The Book of Shaders** (GPU, per-pixel).

### Flow fields (the signature look)

The single most recognizable generative-web aesthetic. Build a grid of angle
vectors where each angle is sampled from 3D Perlin noise (`noise(x*scale,
y*scale, t)` mapped to `0..TWO_PI`). Drop thousands of particles; each reads the
field vector at its cell, applies it as a force, and leaves a faint translucent
trail. Render thousands of short strokes (not one frame) to build painterly
density. Advance the noise's third (time) dimension slowly (`t += 0.002`) for the
characteristic living drift.

### fBm and domain warping (the background-texture core)

Sum several octaves of noise, each at double frequency and half amplitude:

```glsl
float f = 0.0, amp = 0.5, freq = 1.0;
for (int i = 0; i < OCTAVES; i++) {
  f += amp * noise(p * freq);
  freq *= 2.0; amp *= 0.5;
}
```

This single function produces clouds, smoke, marble, fog, watercolor, and
terrain. **Domain warping** is the secret to "expensive" swirling backgrounds:
distort the coordinate before sampling, `fbm(p + fbm(p + fbm(p)))`. Add time to
the inner warp and it slowly churns.

### Other procedural primitives

- **`smoothstep` is the workhorse.** `smoothstep(edge0, edge1, x)` draws an
  antialiased edge, a soft gradient band, a glowing line
  (`smoothstep(w, 0.0, abs(dist))`), or a vignette. Almost every clean shader
  effect is `smoothstep` shaping a noise or distance value.
- **Voronoi / Worley** (cellular noise): distance to the nearest scattered
  feature point gives organic cell/crackle/stained-glass patterns; use
  second-nearest minus nearest for crisp borders.
- **Reaction-diffusion** (Gray-Scott): two virtual chemicals diffusing on a
  grid grow coral, fingerprint, zebra, Turing patterns. Naturally a GPU
  ping-pong shader (render to texture A, read into B, swap).
- **Tiling/patterns:** `st = fract(st * N)` chops space into an N x N grid;
  `floor(st * N)` gives each cell a unique index to randomize per cell. The basis
  for Truchet tiles and generative grids.
- **Dither / halftone / ASCII:** the 2025-26 retro look. Pixelate first
  (`vec2 uvPixel = cellSize * floor(uv / cellSize)`), then draw inside each cell:
  an SDF for halftone/LED, a Bayer threshold matrix for ordered dithering, or a
  luminance-indexed glyph atlas (built at runtime via canvas `fillText` to a
  `CanvasTexture`) for ASCII.
- **Boids / flocking, L-systems, cellular automata** for murmurations, botanical
  ornament, and evolving grid textures.

### Canvas vs shader

If it must **react smoothly to mouse/scroll/audio/time** and cover a large area,
do it in a **fragment shader** (per-pixel, often under 0.2ms at 4K). If the
algorithm is inherently **sequential** or you want crisp vector / SVG export
(L-systems, flow-field trails, pen-plotter work), do it on **canvas**. 2D canvas
comfortably handles ~1,000-3,000 simple draws per frame at 60fps; WebGL sails
past tens of thousands.

---

## Generative color

Random RGB is muddy; this is where generative art most often fails. Generate
palettes algorithmically with perceptual control instead.

**Inigo Quilez cosine palettes** - the standard procedural gradient. For `t` in
`0..1`:

```
color(t) = a + b * cos( 2*PI * (c*t + d) )
```

Each of `a, b, c, d` is an RGB vector: `a` = base brightness, `b` = contrast,
`c` = frequency (use integers/half-integers for clean looping), `d` = per-channel
phase (offsetting R/G/B phases is what creates rich, non-grey color travel). Feed
a noise/fBm value in as `t`. One line, infinite palettes, GPU-cheap.

**OKLCH harmonic palettes** - OKLCH is perceptually uniform, so harmony rules
become arithmetic: complementary = +180 degrees, triadic = +120, analogous = +30.
Fix L and C and step H for even harmonies; ramp L at fixed C/H for tints/shades
that keep identity (HSL washes out). Libraries: RampenSau, Poline, Culori.

**The practical rule:** constrain the system to a curated palette plus
algorithmic variation within it (vary L slightly, jitter H a few degrees), rather
than fully random color. This is the difference between gallery-grade output and
random-generator soup.

---

## Shipping generative art

- **Seed deterministically.** `Math.random()` is non-reproducible. Use a seeded
  PRNG (**mulberry32**: tiny, fast, same seed -> same sequence) so a seed string
  maps to an exact replayable result and can live in the URL (each visitor gets a
  stable-but-unique variant). Use a seedable simplex/Perlin so the noise field is
  reproducible too. `canvas-sketch` bakes in `random.setSeed()` plus noise and
  export utilities.
- **Drive with a time value, not a frame counter** (`requestAnimationFrame`), so
  motion is framerate-independent.
- **Keep the main thread free:** OffscreenCanvas + Web Worker for heavy render;
  pre-render static layers to an offscreen buffer once and composite; only
  recompute what animates.
- **Respect reduced motion:** render a single static seeded frame instead of the
  loop (also saves battery). See `accessibility.md`.
- **Export:** `canvas.toBlob()` for PNG; SVG for crisp/print/plotter (canvas-sketch
  and two.js support it). Render at 2-4x device resolution off-screen for prints.

Creative coders worth studying: Patricio Gonzalez Vivo (Book of Shaders),
Inigo Quilez (SDF/fBm/warp/palettes), George Francis (generative *web* art,
the best bridge to production), Matt DesLauriers (canvas-sketch, shipping and
export), Daniel Shiffman (Nature of Code), Tim Holman, meodai (color tooling).
