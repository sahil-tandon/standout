# Imagery and illustration: matching technique to subject

The single most common way a self-contained page caps its own ceiling is hand-coding
flat, low-fidelity vector illustration for a subject whose **realism and texture are
the entire appeal**. A croissant rendered as three beige rounded rectangles will never
look appetising, no matter how good the type and layout around it are. Food, products,
fashion, skin, nature: where the subject's beauty IS the wow, do not draw it as flat
SVG. Reach for photography, 3D, or AI imagery. Hand-coded illustration is the right
call only when the look is **deliberately stylized** (editorial line art, geometric,
retro, diagrammatic, brand marks), and even then it must be built with layered light
and texture, not a single fill.

This guide gives you (1) a decision framework for picking the right imagery technique
per subject and quality bar, and (2) the concrete, code-level techniques for making
hand-coded SVG/CSS illustration genuinely high-fidelity when stylization is the
intended look.

## Contents

1. [The decision framework](#the-decision-framework)
2. [Real photography: the gold standard](#real-photography-the-gold-standard)
3. [Photoreal 3D: pre-rendered and interactive](#photoreal-3d-pre-rendered-and-interactive)
4. [AI-generated imagery](#ai-generated-imagery)
5. [Rive and Lottie for animated illustration](#rive-and-lottie-for-animated-illustration)
6. [When hand-coded SVG/CSS is the right call](#when-hand-coded-svgcss-is-the-right-call)
7. [Making hand-coded illustration high-fidelity](#making-hand-coded-illustration-high-fidelity)
8. [Grain and noise so it does not read as flat vector](#grain-and-noise-so-it-does-not-read-as-flat-vector)
9. [Anatomy, proportion, and real reference](#anatomy-proportion-and-real-reference)
10. [Where to study](#where-to-study)

---

## The decision framework

Pick technique by asking two questions: **is the subject's texture/realism the wow?**
and **what is the quality bar / effort budget?**

| Subject | Default technique | Why |
|---|---|---|
| Food, drink, plated dishes | **Photography** (then 3D, then art-directed AI) | Gloss, crumb, steam, char are the appeal; flat vector kills appetite |
| Physical products (bottle, shoe, gadget, watch) | **Interactive 3D** for a hero you rotate; **photography or pre-rendered 3D** for stills | Material and form sell the product; rotation rewards curiosity |
| Fashion, beauty, skin, people | **Photography** | Skin, fabric, fall of light are uncannily hard to fake; faces especially |
| Nature, landscape, texture | **Photography** | Real light and depth |
| Mascot, character, animated icon | **Rive** (interactive) or **Lottie** (playback) | Designed-to-move illustration with state |
| Editorial line art, geometric, retro, isometric, diagram | **Hand-coded SVG/CSS** | Stylization is the point; vector is the correct register |
| Brand marks, logos, iconography | **Hand-coded SVG** | Crisp, scalable, on-brand |
| Abstract atmosphere, gradients, generative | **Canvas/WebGL/SVG** | See `webgl-3d-and-generative.md` |

**The rule that prevents the most damage:** if the subject is something you would
photograph for a magazine or a menu, do not draw it as flat vector. Use a photo, a 3D
render, or an art-directed AI image. Save hand-coded illustration for looks that are
*supposed* to look drawn.

When several techniques are viable, climb this fidelity-vs-effort ladder and stop at
the first rung that clears your quality bar: art-directed stock photo -> treated stock
(duotone/grain) -> AI-generated and art-directed -> pre-rendered 3D still -> bespoke
photo shoot -> interactive 3D. Do not pay for interactive WebGL when a single treated
photograph would land harder.

---

## Real photography: the gold standard

For food, products, fashion, nature, and people, **a real photograph beats almost any
hand-built alternative.** Award-winning restaurant and food sites lean on this almost
universally: large, art-directed, professionally shot food imagery against
dark/premium backgrounds, with reservation CTAs floating clear of it. Eleven Madison
Park pairs dark mode with bright food photography; Dishoom builds warmth from textured
photography and period-inspired type. Study the Awwwards Food & Drink and
Hotel & Restaurant galleries to calibrate what "appetising" actually looks like on the
web ([Awwwards Food & Drink](https://www.awwwards.com/websites/food-drink/),
[operationtechnology restaurant roundup](https://www.operationtechnology.com/blog/best-25-restaurant-website-designs-for-inspiration/)).

**Sourcing without the stock-photo look:**

- Prefer real shoots when there is any budget. Even a phone shoot with good window
  light and a single foam-core bounce beats generic vector.
- When using stock, reject anything that reads as stock: no fake-smiling models on
  white, no obviously composited props. Pick tight crops, real grain, natural light,
  off-center framing.
- **Treat every photo so disparate sources cohere.** A duotone or graded treatment
  unifies mismatched stock into one art-directed system. Map shadows to color A and
  highlights to color B with an SVG `feColorMatrix`/`feBlend` filter or stacked
  `mix-blend-mode` layers, then add grain for a printed/risograph register
  ([CSS-Tricks duotone](https://css-tricks.com/using-svg-to-create-a-duotone-image-effect/)).

```css
/* Grade + grain a photo to lift it out of "stock" territory */
.photo {
  filter: contrast(1.08) saturate(0.92) brightness(1.02);
}
.photo-wrap { position: relative; isolation: isolate; }
.photo-wrap::after { /* grain overlay; see grain section for the SVG */
  content: ""; position: absolute; inset: 0;
  background: url(#grain); mix-blend-mode: soft-light; opacity: 0.5;
  pointer-events: none;
}
```

Duotone via SVG filter (two-color map, brand-consistent across any source image):

```html
<svg width="0" height="0">
  <filter id="duotone">
    <feColorMatrix type="matrix" values="0.299 0.587 0.114 0 0
                                          0.299 0.587 0.114 0 0
                                          0.299 0.587 0.114 0 0
                                          0     0     0     1 0"/>
    <feComponentTransfer color-interpolation-filters="sRGB">
      <feFuncR type="table" tableValues="0.06 0.95"/>  <!-- shadow R -> highlight R -->
      <feFuncG type="table" tableValues="0.05 0.86"/>
      <feFuncB type="table" tableValues="0.20 0.72"/>
    </feComponentTransfer>
  </filter>
</svg>
<img src="dish.jpg" style="filter:url(#duotone)" alt="...">
```

Treatment, grade, grain, and a consistent crop ratio are what make a wall of
photographs feel designed rather than assembled.

---

## Photoreal 3D: pre-rendered and interactive

Reach for 3D when you want material realism plus either a perfect, repeatable hero
still or genuine interactivity (rotate, configure, explore). It is the right tool for
hero products where form and finish are the sell.

**Pre-rendered (Blender) for hero stills.** Model and light once, render a high-res
PNG/WebP (or a baked turntable sprite sequence). You get full path-traced realism,
zero runtime cost, and total art direction over light. Best when the hero is a single
beauty shot: a bottle, a watch, a sneaker, a stylized food item you cannot photograph.
Export at 2-3x for retina and serve a responsive `srcset`.

**Interactive (Three.js / React Three Fiber + drei, or Spline) for rotatable heroes.**
Worth the lift only when rotation or configuration is part of the experience: a product
configurator, a "spin to explore" hero, a 3D portfolio. R3F + drei gives fine-grained
control and performance for complex scenes; Spline is a visual editor that ships an
embed fast with less control, good for prototypes and simple scenes
([Spline vs R3F](https://medium.com/@akbar123jason/simplifying-3d-integration-in-react-spline-vs-react-three-fiber-3f5e1a9e39d3)).

**Is the lift worth it?** Interactive 3D costs real bytes (model + textures + runtime)
and engineering time. Use it when interactivity is the point. If the user only ever
sees one angle, a pre-rendered still is lighter, sharper, and faster. See
`webgl-3d-and-generative.md` for the R3F pipeline, PBR materials, glTF/Draco assets,
and performance budgets.

---

## AI-generated imagery

Practical when there is no photographer and no time: prototypes, placeholder heroes,
mood/atmosphere imagery, abstract backgrounds, and stylized illustration you then
treat. Tools: Midjourney (highest aesthetic ceiling), Adobe Firefly (trained on
licensed data, the safer commercial choice), and others.

**Art-direct it; do not accept the first output.**

- Use **style references** (Midjourney `--sref`) to lock a consistent look, color
  palette, and texture across a set, and **character references** (`--cref`) to keep a
  recurring subject consistent across images
  ([Midjourney consistency](https://aitoolsdevpro.com/ai-tools/midjourney-guide/)).
- Prompt for the photographic specifics that defeat the generic look: lens and
  aperture ("85mm, f/1.8"), light ("single soft window light, deep shadow"), film
  stock or grain, surface and material, time of day.
- Generate a set, then **grade and grain them through the same treatment** as your
  photos so they share one register.

**Caveats, do not skip these:**

- **Consistency is hard.** Hands, text, reflections, repeated subjects, and brand
  details drift. AI is weak exactly where photos are strong (faces, hands, legible
  type). Do not use AI for hero faces or anything with readable text.
- **Licensing and rights are unsettled.** Midjourney outputs may be effectively public
  domain and reusable by others; the platform faces active copyright litigation.
  Prefer Firefly (licensed training data) for anything commercial, and confirm the
  current commercial terms before shipping
  ([commercial use notes](https://ec-pr.com/using-midjourney-ai-images-commercially-what-you-need-to-know/),
  [Disney/Universal v. Midjourney](https://itsartlaw.org/art-law/framing-the-future-disney-and-universal-challenge-midjourney-over-ai-generated-imagery/)).
- **Avoid the "AI look":** plastic over-smooth skin, impossible reflections, mushy
  background detail, that uniform soft glow, six-fingered hands, melted text. If it
  has the look, regenerate or treat it until it does not.

---

## Rive and Lottie for animated illustration

For mascots, animated icons, and illustration designed to move, use a real animation
runtime, not hand-keyframed SVG.

- **Rive** when the illustration needs **state and interactivity**: idle/hover/loading/
  success states, cursor following, scroll- or input-driven response. Rive's state
  machines transition between states from your app's input values with no JS animation
  logic, ship as small binary `.riv` files, and run at high frame rates. The right
  choice for interactive mascots in onboarding and conversion flows (Duolingo's
  characters run on Rive)
  ([Rive vs Lottie](https://rive.app/blog/rive-as-a-lottie-alternative)).
- **Lottie** when the animation is **playback-only**: a looping hero illustration, a
  one-shot success checkmark, a marketing flourish exported from After Effects. Simpler
  pipeline, huge ecosystem; use `.lottie` (dotLottie) for 40-70% smaller files
  ([Rive vs Lottie 2026](https://unicornicons.com/learn/rive-vs-lottie)).

Always gate autoplay/loops behind `prefers-reduced-motion` (see `accessibility.md`).

---

## When hand-coded SVG/CSS is the right call

Reserve hand-coded illustration for looks where **stylization is intentional and the
vector register is the point**:

- Editorial / line art (single-weight strokes, halftone, hatching)
- Geometric and flat-design illustration where flatness is the aesthetic
- Retro / vintage / risograph (limited palette, registration offset, grain)
- Isometric and diagrammatic illustration, infographics, technical cutaways
- Brand marks, logos, custom iconography
- Decorative motifs, patterns, borders, blobs, dividers

In every one of these, looking "drawn" is a feature. What is *not* on this list:
photoreal food, products, faces, or anything whose appeal is real-world texture. If you
catch yourself reaching for `<rect rx>` and a two-stop gradient to depict a croissant,
stop and use a photo or 3D render instead.

---

## Material pastiche: when the look IS a physical object

A whole class of briefs asks the interface to imitate a real material: a board game on
cardboard, a printed map, a paper dossier, a wooden console, a ceramic toy, a leather
ledger, a letterpress poster. These live or die on the same few moves, and the default
failure is consistent and worth naming.

- **Put the material on the largest (hero) surface, not just the edges and props.** The
  signature tell of a "themed web app" is a page whose borders, chips, buttons, and
  small objects carry texture while the big focal surface stays a flat clean fill. If
  the thing is cardboard, the whole board must read as cardboard, especially the open
  central field, not a smooth panel inside a textured frame. Texture only on the rim
  reads as "a flat surface with a costume," which is exactly the giveaway.
- **Make the texture bold enough to survive at real viewing scale.** A subtle 6-8%
  grain overlay vanishes once the page is seen at normal size (and doubly so when
  downscaled in a screenshot or on a dense display). Push amplitude AND coarseness:
  use a coarse, low-frequency fibre/speckle plus a large-scale aging mottle (uneven
  tonal blotching, foxing, dirt toward edges and creases), layered `multiply`, until
  the surface unmistakably reads as the material at 1x. Then back off only where it
  actually hurts legibility, do not pre-emptively keep it timid.
- **Crisp vector lines betray a printed or handmade look.** Perfectly uniform stroke
  width and flat saturation read as digital no matter how aged the paper behind them.
  For litho/print/risograph/letterpress pastiches, give lines and fills slight ink
  unevenness: density variation along the stroke, a faint texture or halftone inside
  fills, hairline mis-registration between a color and its outline. The imperfection is
  what sells "printed onto the material" over "drawn in software."
- **Physical pieces are matte and top-lit, not glossy domes.** A token, tile, standee,
  or knob should use a flat, top-lit fill (a near-vertical light-to-dark gradient) with
  a die-cut bevel ring and a real contact shadow on the surface below. A radial
  highlight hotspot reads as glossy enamel or plastic, i.e. a UI dot, not cardboard or
  wood. Match the finish to the actual material: matte for card/paper/wood, sheen only
  for genuinely glossy subjects.
- **Embrace wear as art direction.** Fold creases (with a real directional valley
  shadow, asymmetric, not an even gradient seam), soft edge darkening, a slight ink
  bleed at a coastline or boundary, a printed legend/cartouche/scale bar drawn ON the
  surface rather than floated over it as a translucent UI chip. These details are what
  separate "a real object photographed on a table" from "a tasteful themed layout."

The same trap as everywhere else in this skill, craft pooling in the safe places while
the hero stays quiet, just wearing a different costume: here the chrome and props get
all the texture while the main surface stays flat. Texture the hero first.

---

## Making hand-coded illustration high-fidelity

When stylized illustration IS the right call, the difference between flat-vector slop
and gallery-grade is **layered light and texture**, not a single fill. Real form comes
from stacking light: base shape -> many-stop gradients -> highlight layer ->
shadow/occlusion layer -> texture/grain overlay -> rim light. Below are the SVG and CSS
techniques that add the dimension flat gradients cannot.

### Layer light like a painter

One fill is flat. Build volume from stacked layers, each doing one job:

1. **Base shape** with a many-stop gradient (8-12 stops, not 2) following the form.
2. **Core shadow / occlusion** layer: a dark multiply blob where forms meet.
3. **Highlight** layer: a bright soft-light shape where light hits.
4. **Rim light:** a thin bright stroke or offset shape on the lit edge.
5. **Texture/grain overlay** clipped to the shape so it does not read as flat vector.

```html
<g clip-path="url(#bun)">
  <rect fill="url(#manyStop)" .../>                              <!-- base -->
  <ellipse fill="#3a1d08" opacity=".5" style="mix-blend-mode:multiply"/> <!-- occlusion -->
  <ellipse fill="#fff6e0" opacity=".7" style="mix-blend-mode:soft-light"/> <!-- highlight -->
  <path stroke="#fff3d0" stroke-width="2" opacity=".6"/>          <!-- rim light -->
  <rect filter="url(#grain)" style="mix-blend-mode:overlay" opacity=".35"/> <!-- texture -->
</g>
```

Use **many-stop radial gradients** for volume (a sphere needs a highlight stop, a
midtone falloff, a terminator, and a cool reflected-light stop near the shadow edge),
and stack several radial gradients at different positions to model complex form.
`clip-path` and `mask` keep every layer inside the silhouette and carve detail
(seeds, holes, bites) cleanly.

### feTurbulence for surface texture, crust, and grain

`feTurbulence` synthesises Perlin noise: the basis for crumb, crust, paper, fabric, and
grain. `type="fractalNoise"` gives smooth cloudy texture; `type="turbulence"` gives
ripply, liquid/marbled lines. `baseFrequency` sets grain scale (0.02-0.2 is a useful
range; higher = finer), `numOctaves` adds detail (plateaus around 5)
([Codrops feTurbulence](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/)).

```html
<filter id="crust">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" result="n"/>
  <feColorMatrix in="n" type="matrix"
     values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -1.2 1"/> <!-- noise -> alpha -->
  <feComposite operator="in" in2="SourceGraphic"/>            <!-- clip to shape -->
</filter>
```

### feDisplacementMap for organic distortion and blistering

Feed turbulence into `feDisplacementMap` to push pixels around: blistered crust,
melted edges, hand-torn borders, wobble. `scale` controls distortion amount;
`xChannelSelector`/`yChannelSelector` pick which noise channel drives each axis
([Codrops feDisplacementMap](https://tympanus.net/codrops/2019/02/12/svg-filter-effects-conforming-text-to-surface-texture-with-fedisplacementmap/)).

```html
<filter id="blister">
  <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="n"/>
  <feDisplacementMap in="SourceGraphic" in2="n" scale="14"
                     xChannelSelector="R" yChannelSelector="G"/>
</filter>
```

### feDiffuseLighting + feSpecularLighting for real 3D form and sheen

This is the highest-leverage move for dimensionality. The lighting primitives treat the
**alpha channel as a bump map** and light it with a real light source, giving form and
specular highlights a flat gradient cannot fake. `feDiffuseLighting` scatters soft
light (matte form); `feSpecularLighting` adds the bright reflective hotspot (gloss,
glaze, wet sheen). Combine turbulence (the bump map) with lighting to light an actual
textured surface ([CSS-Tricks light filters](https://css-tricks.com/look-svg-light-source-filters/),
[Codrops lit paper texture](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/)).

```html
<filter id="glazed">
  <feTurbulence type="fractalNoise" baseFrequency="0.6" numOctaves="4" result="bump"/>
  <!-- matte form from a distant light -->
  <feDiffuseLighting in="bump" surfaceScale="2.2" diffuse-color="#caa24a"
                     lighting-color="#fff" result="diff">
    <feDistantLight azimuth="235" elevation="55"/>
  </feDiffuseLighting>
  <!-- glossy hotspot from a point light -->
  <feSpecularLighting in="bump" surfaceScale="4" specularConstant="0.9"
                      specularExponent="22" lighting-color="#fff" result="spec">
    <fePointLight x="120" y="40" z="160"/>
  </feSpecularLighting>
  <feComposite in="spec" in2="SourceGraphic" operator="in" result="specClip"/>
  <feBlend in="diff" in2="specClip" mode="screen"/>
</filter>
```

Key knobs: **surfaceScale** = relief height; **specularExponent** = highlight sharpness
(high = tight wet glint, low = broad satin sheen); **diffuse/specularConstant** =
intensity; **lighting-color** = the light's color; move **fePointLight** x/y/z to place
the highlight, raise z to spread it. `feDistantLight` (azimuth/elevation) is sun-like
directional light; `feSpotLight` (+`limitingConeAngle`) is a focused beam.

### The rest of the filter toolbox

- **feGaussianBlur** for soft shadows, glow, and depth-of-field on background layers.
- **feComposite / feBlend** to combine layers (`in`/`over`/`screen`/`multiply`,
  `arithmetic` for fine control) and to clip a filter result back into the shape.
- **feColorMatrix** to recolor, saturate, or convert noise into an alpha mask (as in
  the crust example) and for duotone mapping.
- **feMerge** to stack multiple lit/textured passes into one output.

### CSS-side techniques

- **box-shadow stacks** (5-10 layered shadows of increasing blur/opacity) model soft
  contact shadows and ambient occlusion far better than one shadow.
- **`filter: drop-shadow()`** follows the alpha silhouette (irregular shapes), unlike
  `box-shadow` which follows the box.
- **Blend modes** (`mix-blend-mode`, `background-blend-mode`) layer highlights,
  shadows, and grain into the surface instead of pasting them on top.
- **`backdrop-filter`** for glass/steam/frosted layers over imagery.

---

## Grain and noise so it does not read as flat vector

The fastest single fix that stops illustration looking like flat vector: overlay fine
grain. Generate it with `feTurbulence`, mute it with `feColorMatrix`/
`feComponentTransfer`, and composite with a blend mode and low opacity
([CSS-Tricks grainy gradients](https://css-tricks.com/grainy-gradients/),
[freeCodeCamp grainy backgrounds](https://www.freecodecamp.org/news/grainy-css-backgrounds-using-svg-filters/)).

```html
<svg width="0" height="0">
  <filter id="grain">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0"/>
  </filter>
</svg>
```

```css
.surface::after {
  content: ""; position: absolute; inset: 0;
  filter: url(#grain);            /* or background:url("data:image/svg+xml,...") */
  mix-blend-mode: soft-light;     /* overlay/soft-light blends in; never a grey sheet */
  opacity: 0.4;
  pointer-events: none;           /* must not block clicks */
}
```

Rules: keep `baseFrequency` high (fine grain, ~0.6-0.9), use `mix-blend-mode:
soft-light` or `overlay` so grain integrates instead of sitting as a flat film, always
`pointer-events: none`, and `stitchTiles="stitch"` for seamless tiling. For animated
film grain, jump a slightly oversized noise layer between positions with `steps()`.
Clip grain to the illustration so it textures the form, not just the background.

---

## Anatomy, proportion, and real reference

High fidelity is as much drawing accuracy as filters. Flat-vector slop usually fails on
**proportion and structure**, not just shading.

- **Pull a real reference photo before drawing.** Match silhouette, proportion, and
  where light actually falls. Guessing produces generic shapes.
- **Get the structure right.** A croissant or other wound pastry is a **true diagonal
  helical spiral** with tapering crescent ends, not horizontal stripes across a blob.
  Layers overlap on a diagonal and the lamination casts shadow between folds. Stripes
  read as cartoon; the helix reads as real.
- **Respect perspective and ellipses.** Circular rims (cups, plates, bowls) are
  ellipses whose openness depends on viewing angle; get the ellipse wrong and the whole
  object looks broken.
- **Light from one consistent direction** across every layer and object, with matching
  cast shadows. Inconsistent light is the fastest tell of a fake.

Then apply the layered-light and texture techniques above. Correct structure plus
layered light plus grain is the recipe for stylized illustration that reads as
crafted.

---

## Where to study

- **[Codrops: SVG Filters 101](https://tympanus.net/codrops/2019/01/15/svg-filters-101/)** and
  **[Creating Texture with feTurbulence](https://tympanus.net/codrops/2019/02/19/svg-filter-effects-creating-texture-with-feturbulence/)**:
  the canonical, code-level series on noise, displacement, and lighting filters. Take
  the exact attribute ranges and the noise-to-texture workflow.
- **[CSS-Tricks: A Look at SVG Light Source Filters](https://css-tricks.com/look-svg-light-source-filters/)**:
  how to make a 2D shape look lit and 3D with diffuse/specular lighting. Take the
  apple-style sheen recipe.
- **[CSS-Tricks: Grainy Gradients](https://css-tricks.com/grainy-gradients/)** and
  **[freeCodeCamp grainy backgrounds](https://www.freecodecamp.org/news/grainy-css-backgrounds-using-svg-filters/)**:
  the grain-overlay technique that lifts flat vector. Take blend mode + opacity tuning.
- **[CSS-Tricks: SVG duotone](https://css-tricks.com/using-svg-to-create-a-duotone-image-effect/)**:
  unify mismatched photography into one branded treatment. Take the feColorMatrix +
  feComponentTransfer map.
- **[Awwwards Food & Drink](https://www.awwwards.com/websites/food-drink/)** and
  **[Hotel & Restaurant](https://www.awwwards.com/websites/hotel-restaurant/)**
  galleries: how award sites use photography, dark mode, and treatment for appetite
  appeal. Calibrate the bar for food imagery.
- **Awwwards 3D / WebGL category**: when interactive 3D earns its weight, and how heroes
  are staged and lit.
- **Blender** (pre-rendered food/product stills, full path-traced realism) and
  **[Spline](https://spline.design/)** (fast interactive 3D embeds): pick by whether you
  need a perfect still or runtime interactivity.
- **MDN**: [`feTurbulence`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feTurbulence),
  [`feSpecularLighting`](https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Element/feSpecularLighting),
  [`feDiffuseLighting`](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feDiffuseLighting):
  the authoritative attribute reference.
- **Dribbble / Behance**: reference for *stylized* illustration looks (line art,
  isometric, retro). Use for the look to emulate and for anatomy/proportion reference,
  not as a cue to hand-draw photoreal subjects.
- **[Rive](https://rive.app/blog/rive-as-a-lottie-alternative)** docs and community:
  interactive mascots and state-machine illustration.

Cross-references: `webgl-3d-and-generative.md` (the 3D/WebGL pipeline and generative
art), `color-and-atmosphere.md` (grain, glass, glow, duotone as surface atmosphere),
`motion-and-interaction.md` (animating illustration responsibly).
