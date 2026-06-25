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

Two moves lift a Swiss grid from correct to memorable. **Organic annotation over the
rigid grid:** lay a hand-drawn mark (a marker ellipse scribbled around the active item,
a circled note, a casual aside or emoji) on top of the machined layout. The tension
between exact and human *is* the personality; without it the same grid reads cold.
**A primitive glyph system as wayfinding:** assign a small family of marks (circle,
square, triangle, cross) to your sections and reuse them everywhere, nav, legends,
bullets, diagram vertices, footer. Repetition of one simple symbol set is the cheapest,
strongest cohesion device the direction has. See `signature-builds.md`.

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
- **Instruments:** wire the panel vocabulary into real components, nested rotating
  gauge/tachometer rings (numbered tick marks) around a central button or stat,
  coordinate readouts, a blinking caret on an oversized headline. A slowly rotating dial
  framing a CTA is a striking close. See `signature-builds.md`.
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

## The wider bench: named web aesthetics to pull from

The eight above are the families you will reach for most, detailed because they
recur. They are not the whole menu. Below is a broader bench of named, web-native
directions. Most are a specific reading of one of the eight families (Neo-brutalism
is one cut of expressive, Claymorphism one cut of playful), but naming them widens
the menu so you stop defaulting to the same handful. The commit rule still holds:
pick ONE and push it to its edge. Look a direction up before using it; translate its
real-world motifs into web type, color, depth, and motion rather than pasting a
texture.

| Direction | Signature | Mode / type | Fits |
|-----------|-----------|-------------|------|
| **Monochrome editorial** | Pure black/white, zero accent, oversized serif, dramatic contrast | light / serif | Fashion, architecture, portfolios |
| **Newsprint** | High-contrast B/W, tight grids, rule lines, masthead energy | light / serif | Journalism, essays, archives |
| **Bauhaus** | Primary R/B/Y, circle/square/triangle, black borders, hard shadow, constructivist asymmetry | light / sans | Culture, art, education |
| **Art Deco** | Gatsby geometry, metallic gold, sunbursts, architectural symmetry | dark / serif | Luxury heritage, hospitality, events |
| **Flat design** | No depth cues, pure color blocking, crisp geometric 2D | light / sans | Marketing, illustration-led apps |
| **Material (MD3)** | Elevation states, dynamic color extraction, pill buttons, tactile depth | light / sans | Android-aligned and consumer apps |
| **Neumorphism** | Extruded/inset dual-shadow elements on one monochrome ground, soft tactile | light / sans | Controls, audio, calm utilities (watch contrast) |
| **Claymorphism** | Inflatable 3D clay, stacked soft shadows, candy color, floating ambient blobs | light / sans | Playful consumer, kids, friendly fintech |
| **Glassmorphism / liquid glass** | Frosted translucent panels, blur, layered depth, tint glowing behind | either / sans | Spatial UI, overlays, premium dashboards |
| **Neo-brutalism** | Cream ground, 4px black borders, hard zero-blur offset shadows, clashing brights, sticker layering | light / sans | Indie, dev tools, bold brands |
| **Bold typography / poster** | Type IS the image, ultra-large headline, extreme negative space | dark / sans | Statements, agencies, launches |
| **Kinetic** | Motion-first, marquees, viewport-scaled text, scroll-triggered uppercase | dark / sans | Music, fashion drops, events |
| **Academia** | Old-library warmth, paper texture, traditional serif, gold/crimson | dark or light / serif | Education, publishing, archives |
| **Cyberpunk** | Neon-on-black, glitch, mono, HUD decoration, dystopian 80s sci-fi | dark / mono | Gaming, AI, edgy tech |
| **Vaporwave / synthwave** | Neon pink/cyan on void purple, grid horizon, CRT scanlines, surreal sunset | dark / mono | Music, retro-digital, nostalgia |
| **Web3 / crypto** | Deep void, one token-color accent (BTC orange), glow, data-viz precision | dark / sans | Crypto, finance-tech, data products |
| **Botanical / organic serif** | Earthy muted tones, paper grain, rounded organic shapes, warm serif | light / serif | Wellness, food, craft, beauty |
| **Sketch / hand-drawn** | Wobbly borders, handwritten type, paper texture, marker imperfection | light / sans | Education, kids, friendly SaaS |
| **Playful geometric (Memphis)** | Bright solids, primitive shapes and squiggles, stable grid plus whimsy | light / sans | Consumer, community, events |
| **Retro 90s / Win95** | Beveled system UI, system fonts, primary color, marquees, ugly-cool chaos | light / sans | Nostalgia, indie, irony-aware brands |
| **Cinematic dark SaaS** | Layered ambient gradient blobs, mouse-spotlight, premium-software micro-interactions | dark / sans | SaaS, AI, dev products |
| **Electric tech** | Electric-blue gradients, display-serif plus grotesque pairing, animated hero, inverted sections | light / sans | Startups, B2B, product |
| **Industrial skeuomorphism** | Copper, cogs, screws/vents/LEDs, realistic hardware lighting (Teenage Engineering, Rams) | light / sans | Hardware, audio, maker brands |

---

## The cultural well: styles to mine for a specific world

When a brief wants a distinctive world (especially for repositioning a category the
default renders cold or generic), pull from the broader history of visual culture,
not just web trends. These are not web-ready presets; name the one that fits, study
its real motifs, then translate them into type, color, depth, texture, and motion. A
sampler, grouped so you can find a register fast:

- **Ornate / historical:** Neoclassical, Baroque, Rococo, Victorian, Gothic
  (blackletter), Art Nouveau, Filigree, Acanthus.
- **Retro-digital:** Y2K (chrome, iridescence), Synthwave, Vaporwave, Cybercore,
  Pixel art, Frutiger Aero (aqua gloss).
- **Cozy / craft:** Japandi, Cottagecore/Farmhouse, Shabby chic, Scrapbook,
  Wabi-sabi, Light and Dark Academia.
- **Bold-graphic:** Memphis, Pop art (Ben-Day dots), Brutalism, Neo-brutalism,
  Graffiti, Modular typography.
- **Soft / dreamy:** Aurora (iridescent gradients), Ethereal, Glassmorphism, Kawaii,
  Coquette (ribbons, pearls).
- **Earthy / regional:** Bohemian, Southwest/Wild West, Mystical Western, Nautical,
  Organic/Wabi-sabi.
- **Art-historical technique:** Tenebrism (chiaroscuro spotlight), Pointillism,
  Surrealism, Mixed-media collage, Conceptual sketch.
- **Themed worlds:** Steampunk, Kitsch, Anthropomorphic (objects with faces), Rebus
  (visual puns), Luxury foil typography.

The move that pays off most: take a subject the category renders cold (robotics,
finance, machining, therapy) and run it in a warm, saturated, or handcrafted register
from this well. The aesthetic carries the repositioning more than the copy does.

---

## Current currents (2026)

Treat these as live vocabulary, not a mandate; pull only what serves the concept.

- **Nostalgia as comfort.** Against fast AI-driven change, familiar patterns and
  retro registers (Y2K, 90s, analog) read as reassuring and human. Familiarity is a
  feature, used on purpose.
- **Glassmorphism / liquid glass return.** Now cheap to render and aimed at spatial,
  layered, depth-aware UI (Apple's Liquid Glass). Good for overlays and chrome over
  rich backgrounds; keep text on an opaque plate so contrast survives the blur.
- **Emotionally-aware and time-of-day modes.** Interfaces that shift tone, pacing,
  and palette by context (morning vs midnight, focused vs browsing). A low-cost way
  to feel authored and alive, if the shift is real, not decorative.
- **Multimodal and intent-led.** Voice, gesture, and vision alongside the screen, and
  flows that respond to what the user is trying to do rather than a fixed path.
- **Machine experience (MX).** Semantic, well-structured markup so AI agents can read
  and represent the page; increasingly part of being found at all.
- **The regression to watch.** AI-extracted or templated design systems built without
  a concept regress straight to slop. Speed without a strong idea is the new generic.
  The concept-first discipline in this skill is the guard against it.

---

## Choosing and committing

- Read the brief for its most extreme honest interpretation, then pick the direction
  that serves that reading.
- Let the direction set the motion budget: a luxury site barely moves; a maximalist
  one layers motion; an immersive one is motion.
- Treat current trends (big type, bento grids, fluid glass, dither, experimental nav)
  as vocabulary, not a mandate. Pull only what serves the chosen concept.
- Once committed, push the direction to its edge. The middle is where generic lives.
