---
name: standout-design
description: >-
  Build standout frontends for websites and apps with real craft: bold art
  direction, distinctive typography, high-impact motion, and accessibility, none
  of the generic AI look. Use this whenever the user asks to build, design, style,
  redesign, or improve any web component, page, landing site, marketing site,
  portfolio, dashboard, or app UI, even if they don't say "design", and ESPECIALLY
  when output risks looking generic (default fonts, purple gradients, evenly-spaced
  card grids). Reach for it for hero sections, animations, theming, layout, and any
  "make this look better / more unique / more premium" request.
---

# standout-design

Generate frontends that make a visitor stop, feel something, and remember the page,
while staying fast and accessible. The enemy is the generic AI look: Inter on white,
purple gradients, three evenly-spaced rounded cards, predictable layouts, timid
motion. This skill replaces that default with committed art direction and real craft.

Produce working code (HTML/CSS/JS, React, Vue, whatever fits). Aesthetics and
function both matter: a beautiful page that is slow, broken, or inaccessible is not
standout, it is a liability.

## The method (follow in order)

Awe comes from one committed idea executed with precision, not from stacking effects.
Work through these steps; pull depth from `references/` only as each step needs it.

### 1. Commit to a concept and a direction (do this before any code)
Decide the ONE thing a visitor will remember, then pick a single bold aesthetic
direction and execute it with intention. Refined minimalism and maximal expression
both win; timid middle-ground does not. Do not default to a look, choose one.
- Ask (or infer): what problem does this solve, who is it for, what is the one
  memorable idea, what tone fits.
- Pick a direction (brutalist, editorial/Swiss, cinematic 3D, retro-technical,
  organic, luxury, playful, industrial, ...). See `references/aesthetic-directions.md`.
- Vary across projects. Never converge on the same fonts, palette, or layout every
  time. Alternate light/dark, serif/grotesque, calm/loud.
- **Derive the page's ARCHITECTURE from the artifact, not from a default skeleton.**
  The single biggest tell of generated design is that every brief comes out as the
  same page: top nav, a mono eyebrow strip, one giant headline with a single
  accent-colored word, supporting copy, paired CTAs. Refuse that. A magazine should
  feel like a folded printed object; a festival like a poster or flyer; an app like
  the app's own UI; a restaurant like a menu. Let the artifact dictate the grid, the
  entry point, the reading order, and the section logic. Two different briefs must not
  produce the same layout in different colors.
- **Avoid the CATEGORY default, not just the generic default.** Each category has a
  cliche look: dev tools default to near-black + neon-green + a clean grotesque;
  synthwave to a striped sun + scanlines + pink/cyan; SaaS to a purple gradient; AI
  products to violet-on-white. Escaping Inter-on-white is not enough if you land on
  the category's own stock skin. Name the category's default out loud, then make at
  least one unexpected, ownable choice (palette, typeface, or structural conceit) that
  the category does not already overuse.

### 2. Build the visual system
Type, color, and layout carry most of the impression.
- **Typography** is the #1 tell of generic AI output. Never ship Inter / Roboto /
  Arial / system-ui as the display face. Pair a distinctive display face with a
  refined body and (often) a mono accent; push weight and size to extremes. Details
  and named faces: `references/typography.md`.
- **Color**: commit to a dominant tone plus one sharp accent, never an even palette.
  Build it in OKLCH. Add atmosphere (grain, gradient, glow), never flat `#000`/`#fff`.
  See `references/color-and-atmosphere.md`.
- **Layout**: use an intentional grid with at least one breakout or asymmetry, not a
  stack of equal centered cards. See `references/layout-and-composition.md`.

### 3. Add motion and interaction
Motion is where standout sites separate from competent ones, but it must be
purposeful. One orchestrated load reveal beats scattered micro-animations. Reuse a
single easing token site-wide as the motion accent. Animate only `transform` and
`opacity`. Keep micro-interactions sub-200ms. See `references/motion-and-interaction.md`.

### 4. Reach for advanced visuals only when they serve the concept
WebGL/3D, shaders, and generative backgrounds are powerful but optional. The "wow" is
a reactive shader or a baked, art-directed scene, not heavy geometry. Awe does not
require WebGL (big type + whitespace + cursor craft is often enough). See
`references/webgl-3d-and-generative.md`.

### 5. For apps and product UI, switch modes
Dashboards, SaaS, and tools need density and usability plus polish, not marketing-site
spectacle. Different motion budget, the "Linear look" as a system, dark-mode tokens,
command palettes, real empty states. See `references/app-and-product-ui.md`.

### 6. Gate on performance and accessibility (this is the differentiator)
Most flashy sites fail here, which is exactly why doing it well makes work stand out.
- Performance: lazy/code-split heavy 3D, animate compositor-friendly props only,
  reserve space to avoid layout shift, compress assets. Targets: LCP < 2.5s,
  INP < 200ms, CLS < 0.1.
- Accessibility as craft: honor `prefers-reduced-motion` (reduce, do not just remove),
  keep a real semantic DOM layer (especially behind any canvas), beautiful and visible
  focus states, sufficient contrast, `rem` not `px`, non-hover paths. Full playbook:
  `references/accessibility.md`.

### 7. Run the anti-slop checklist before calling it done
Verify the work escaped the generic look and hit the craft bar:
`references/anti-slop-checklist.md`.

## Non-negotiables (the short version)

Even without reading the references, hold these:
- **No default display fonts.** Not Inter/Roboto/Arial/system. Pick a real,
  characterful typeface and use it decisively.
- **One dominant color + one sharp accent.** Not an even rainbow. Built in OKLCH. The
  palette itself must escape the category default: a fresh concept on a stock palette
  still reads stock. Neon/green-on-black for anything "tech" or "electronic", violet
  for AI, is a default even with a clever idea on top. Pick a palette the category does
  not already own.
- **Atmosphere, not flat fills.** Grain, gradient mesh, glow, or texture, tuned to the
  direction.
- **An intentional layout.** Breakout, asymmetry, or a strong structural device, not
  equal centered cards.
- **Architecture from the artifact, not a reused skeleton.** Do not ship the same
  nav + eyebrow + accent-word headline + CTA structure for every brief. And do not
  lean on the same one signature device every single time. The mono-eyebrow plus a
  hyper-specific spec block, and the two-tone accent-color word, are good moves that
  become a personal formula when they appear on every page. Vary how you handle
  metadata and emphasis per brief; do not let your own tics become the new template.
- **All text is legible against what is actually behind it, not just the headline.**
  Contrast-check every line, body copy included. Keep decorative motifs (traces, grid
  lines, textures) OUT of any text's bounding box; a wire running through a descender
  or low-contrast copy on a busy grid fails. The most important words (brand, hero
  line) must be the most legible thing on the page; if type crosses imagery, knock it
  out, plate it, or move it.
- **The concept extends into every section and is SEEN, not just labeled.** The
  metaphor that makes the hero sing must escalate, not evaporate, below the fold. The
  second screen, usually the product, the spread, or the proof, is where you prove the
  idea is real; carry the same motif AND the same type system through it. Labeling a
  product board's columns "movements" is not enough if the staff lines that sold the
  hero are visually absent: the motif must be present in pixels on every screen. A
  brilliant hero bolted to a generic second screen is the most common way good work
  stops short of an award.
- **Subvert the category cliche, but keep the subject's emotional register.** Escaping
  the default must not sand off what the thing actually feels like. A night electronic
  festival can avoid neon-on-black and still feel nocturnal and electric; a deep-sea
  film can avoid ocean-blue and still feel vast and high-pressure. If your anti-cliche
  palette makes a festival feel like a craft fair, you overshot. Hold the mood while
  changing the surface.
- **Every frame holds the hero's craft, and every mark earns its place.** No section
  may drop into a flat gradient placeholder or an empty block; when you have no real
  image asset, build a crafted placeholder that carries real content, not thin
  decorative line-art in a frame pretending to be a figure. A story about people needs
  human presence (a portrait, a still); a data figure must contain legible data.
  Decorative ornament must be structural: a systemic motif (a grid, circuit traces, a
  diagram, staff lines) must map to real content, not wander as atmosphere. Negative
  space must be anchored and intentional, not an empty quadrant that reads as
  unfinished; cut dead space and lines that connect nothing.
- **One orchestrated motion moment** with a single reused easing token; only
  `transform`/`opacity` animated.
- **`prefers-reduced-motion` honored** with a designed calm fallback, every time.
- **Content visible by default.** Never hide content behind a reveal you cannot
  guarantee. Gate the hidden start state behind `@supports (animation-timeline: view())`
  (or a JS-added class), so unsupported browsers and no-JS loads still show everything.
- **One memorable thing.** If nothing about the page is describable to a friend,
  it is not done.

## Starter snippets

`assets/snippets/` has working, copy-pasteable building blocks (every motion snippet
honors `prefers-reduced-motion`). Paste and adapt, do not treat as a fixed framework:
- Visual: `oklch-theme.css`, `fluid-type.css`, `grain-overlay.css`,
  `editorial-grid.css`, `bento-grid.css`.
- Motion: `scroll-reveal.css`, `split-text-reveal.js`, `magnetic-button.js`,
  `custom-cursor.js`, `lenis-gsap-sync.js`, `velocity-marquee.js`,
  `directional-underline.css`.
- React: `react/useReducedMotion.ts`, `react/motion-tokens.ts`, `react/TiltCard.tsx`,
  `react/MeshGradient.tsx`, `react/FluidGlass.tsx`.
- Generative: `generative/flow-field.js`, `generative/fbm-background.glsl`,
  `generative/cosine-palette.js`.
See `assets/snippets/README.md` for the index.

## References (load on demand)

Read the file relevant to the step you are on; do not load all of them upfront.

| File | Read when |
|------|-----------|
| `references/foundations.md` | Always worth a glance: the principles of awe + the canon craft rules (hierarchy, systems, whitespace, type, motion). |
| `references/aesthetic-directions.md` | Step 1, choosing the art direction. |
| `references/typography.md` | Step 2, picking and setting type; named faces and foundries. |
| `references/color-and-atmosphere.md` | Step 2, palette, OKLCH theming, grain/gradient/glass. |
| `references/layout-and-composition.md` | Step 2, grids, breakout, bento, scroll architecture. |
| `references/motion-and-interaction.md` | Step 3, scroll, transitions, cursors, easing, kinetic type, Rive vs Lottie. |
| `references/webgl-3d-and-generative.md` | Step 4, when 3D/shaders/generative earn their place. |
| `references/app-and-product-ui.md` | Step 5, app/dashboard/product UI work. |
| `references/narrative-and-detail.md` | Loaders, intros, sound, and the micro-details that leave a lasting impression. |
| `references/accessibility.md` | Step 6, the stunning-and-accessible playbook. |
| `references/tech-stack.md` | Choosing libraries: the library-to-effect map and framework notes. |
| `references/anti-slop-checklist.md` | Step 7, the final pre-ship pass. |

## Posture

Match implementation complexity to the vision: maximalist directions need elaborate
code and orchestration; minimal directions need restraint and precision. Elegance
comes from executing one clear vision well. Don't hold back on committing to a bold
point of view, and don't sacrifice usability or accessibility to get there.
