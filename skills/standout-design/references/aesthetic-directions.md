# Aesthetic directions: pick one extreme and commit

Before any code, commit to one aesthetic direction and execute it with intention.
Bold maximalism and refined minimalism both win; the timid middle ground does not.
The named direction drives every later decision: type, color, motion budget, layout,
and sound. When in doubt, pick the more extreme reading of the brief and commit
fully.

The two rules that matter most:

1. **Commit to ONE direction per project.** Do not blend three flavors into a mush.
   A minimal editorial site and a maximal WebGL site draw from different drawers; a
   page that does both at once reads as indecisive.
2. **Vary across projects.** Never converge on the same safe choice every time.
   Alternate light and dark, serif and grotesque, calm and loud. Sameness across a
   body of work is itself the generic tell.

---

## The palette of directions

| Direction | Defining traits | When it fits |
|-----------|-----------------|--------------|
| **Brutalist / Swiss editorial** | Huge type, near-monochrome, generous whitespace, precise grid, micro-meta in corners | Studios, writing, fashion, premium |
| **Maximalist / expressive** | Density, clashing color, layered motion, kinetic type, more-is-more | Music, culture, youth brands, events |
| **Cinematic 3D / immersive** | Full-bleed WebGL world, atmosphere, scroll-as-camera, sound | Product launches, brand experiences |
| **Retro-technical / HUD** | Mono type, coordinates, scanlines, terminal aesthetics, monochrome + acid accent | Crypto, AI, dev tools, gaming |
| **Organic / natural** | Soft gradients, blobs, grain, hand-drawn touches, warm palette | Wellness, food, craft brands |
| **Luxury / refined** | Restraint, high-contrast serif, deep negative space, slow expensive easing | Fashion, hospitality, finance |
| **Playful / toy-like** | Bouncy spring physics, bright color, characters, game mechanics | Portfolios, kids, consumer apps |
| **Industrial / utilitarian** | Exposed grid, data-dense, mono labels, function-forward | B2B, dashboards, infrastructure |

---

## Each direction in depth

### Brutalist / Swiss editorial

Oversized type does the heavy lifting. Near-monochrome (warm paper plus near-black
ink, or the inverse), a precise underlying grid, and generous whitespace. Detail
lives in the margins: timezone clocks, page counters, view toggles, and small-caps
meta anchored to corners. One structural device can carry the whole layout (an
oversized bracket pair framing a column, a single rule line). Restraint and precise
type out-craft spectacle here.

- **Type:** a giant custom or display serif wordmark, grotesque body, mono micro-meta.
- **Color:** dominant neutral + a single ink accent.
- **Motion:** sparse and exact; one signature transition, slow expensive easing.
- **Fits:** studios, writers, fashion, premium brands that want to read as authored.

### Maximalist / expressive

More is more, executed with intent rather than chaos. Density, clashing high-chroma
color, layered and overlapping motion, kinetic typography, marquees, broken grids.
The discipline is invisible: even the loudest maximalist work runs on a spacing
scale and motion tokens underneath, which is what keeps it coherent instead of busy.

- **Type:** heavy display faces at extreme sizes, kinetic and variable-axis animation.
- **Color:** multiple bold tones, but still anchored by one dominant; never a flat
  even rainbow.
- **Motion:** layered, velocity-reactive, expressive easing and springs.
- **Fits:** music, culture, youth brands, events, festivals.

### Cinematic 3D / immersive

A full-bleed WebGL world is the page. Scroll becomes a camera. Heavy atmosphere
(fog, particles, depth) and often sound. The wow is a reactive shader (mouse, scroll
velocity, audio, time), not a static model. Frame the spectacle inside calm,
restrained chrome (a pill nav, corner meta) so it stays navigable.

- **Type:** real HTML headlines over the canvas (for selection, zoom, SEO), often a
  mono HUD overlay.
- **Color:** dark canvas + a single luminous accent reads as expensive.
- **Motion:** scroll-driven scene progression on one interpolated scroll value shared
  by DOM and WebGL so they never drift.
- **Fits:** product launches, brand experiences, immersive storytelling.

### Retro-technical / HUD

The terminal and instrument-panel aesthetic. Monospace type, coordinate readouts,
wireframe registration marks, scanlines, dither and halftone textures. Monochrome
base plus one acid accent (acid green, hot orange, ultramarine). Reads as
engineered, technical, and precise.

- **Type:** mono everywhere (Space Mono, JetBrains Mono, Fraktion Mono), pixel/grid
  display faces (OffBit) for headers.
- **Color:** near-black + one electric accent; constrained, never soft.
- **Motion:** scramble/decode text effects, terminal-style reveals, blinking cursors.
- **Fits:** crypto, AI, developer tools, gaming.

### Organic / natural

Soft and warm. Gentle gradients, blob shapes, grain overlays, hand-drawn marks, a
warm palette pulled from materials and light. Avoid hard edges; let shapes flow.
Grain and warm tints are what keep it from feeling sterile.

- **Type:** humanist grotesques with flared terminals (Apparat), warm serifs
  (Fraunces, Cotta).
- **Color:** warm off-whites, earthy mids, soft accents; aurora and mesh gradients.
- **Motion:** slow, eased, breathing; nothing snappy or mechanical.
- **Fits:** wellness, food, craft and artisan brands.

### Luxury / refined

Confidence through restraint. High-contrast serif against deep negative space, slow
and expensive easing, sparse motion. Every element earns its place. The luxury signal
is what you leave out and how slowly things move.

- **Type:** high-contrast display serif (PP Editorial New, GT Super, Migra) over a
  quiet grotesque body.
- **Color:** near-monochrome with one restrained accent; crafted dark or warm light.
- **Motion:** `expo.out` reveals, long luxurious settles, generous delays.
- **Fits:** fashion, hospitality, finance, jewelry.

### Playful / toy-like

Joy as the concept. Bouncy spring physics, bright saturated color, characters or
mascots, game mechanics. A single playful idea executed completely is more memorable
than polish on a conventional layout. Lean into interactivity the user can grab.

- **Type:** rounded or characterful display, friendly geometric body.
- **Color:** bright and high-energy; multiple accents allowed if anchored.
- **Motion:** springs everywhere (`type:"spring"`, low damping for bounce), magnetic
  elements, draggable physics (Matter.js), reactive mascots (Rive over Lottie).
- **Fits:** portfolios, kids' products, consumer apps.

### Industrial / utilitarian

Function forward, exposed structure. Visible grid, data density, monospace labels,
minimal ornament. Polish lives in obsessive alignment and a mature data-table
vocabulary, not in effects. The craft is in density done legibly.

- **Type:** neutral grotesque (GT America, Söhne), mono labels and data.
- **Color:** restrained neutrals + one functional accent; semantic state colors.
- **Motion:** minimal and productive; no animation on precise data; instant feedback
  on high-frequency actions.
- **Fits:** B2B tools, dashboards, infrastructure, internal apps.

---

## Choosing and committing

- Read the brief for its most extreme honest interpretation, then pick the direction
  that serves that reading.
- Let the direction set the motion budget: a luxury site barely moves; a maximalist
  one layers motion; an immersive one is motion.
- Treat current trends (big type, bento grids, fluid glass, dither, experimental nav)
  as vocabulary, not a mandate. Pull only what serves the chosen concept.
- Once committed, push the direction to its edge. The middle is where generic lives.
