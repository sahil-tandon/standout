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

**The bar is an immediate, visceral WOW.** The real target is the involuntary reaction
a visitor has in the first second: "that's a great-looking site," followed by a lasting
impression they remember later. That is the success criterion above all others. It is
not about being clever, ownable, or anti-cliche for its own sake; a page can be
conceptually smart and still leave you cold. Aim every build at that gut-level wow, in
whatever genre fits the brief, a bold maximal poster, a hushed luxury page, a kinetic
festival, an editorial spread. Restraint is allowed, but restraint must still be
STRIKING; "tasteful and competent but quiet" is a miss. If a stranger would not stop
and go "wow" on sight, it is not done yet. Wow first, then make it ownable and correct.

**How to actually manufacture the wow (do not skip; "be amazing" is not enough).** The
default failure is a pleasant, safe hero: big serif headline on the left, a smallish
illustration or image on the right, and a large empty quadrant. That whispers. Use
these concrete levers to make it shout:
- **Scale.** Make the focal subject huge: fill or break the viewport with it. A small
  graphic in a corner whispers; one that dominates the screen seizes the eye. Oversize
  the hero subject and/or the type.
- **Immersion over the safe split.** Avoid the text-left / image-right / dead-space-
  right layout; it is the safe default and rarely wows. Go full-bleed and immersive:
  let the subject bleed off edges, sit center stage, or wrap the type. Kill empty
  quadrants. The hero should feel like a scene or a poster, not a slide.
- **Compose ONE lit scene, not a product cutout politely beside the type.** Even a
  large, well-masked subject floating in a soft radial glow next to the headline still
  reads as "type zone + product zone coexisting," which is louder but not jolting. To
  make it one charged image: bleed the subject off the frame edge, overlap it onto the
  headline (let them occupy the same space), give the light a DIRECTION (a hot side and
  a falloff, not an even centered halo), and ground the subject with a contact shadow or
  steam/reflection so it inhabits the scene instead of hovering in a vignette. The test:
  could you crop a strip from anywhere across the hero and still have one image, or does
  it fall into two tidy halves?
- **Color and light intensity.** Push saturation and contrast; add a real light source
  (a glow, a spotlight, a deep gradient with dimension) so the page feels like a place,
  not a flat tint. Atmosphere with depth.
- **One dramatic moment on entry.** Something felt instantly: a bold load reveal that
  resolves into the page, parallax/depth, a living element, a 3D-ish tilt. Not scattered
  micro-animations, one big orchestrated beat.
- **A single unmissable focal point with REAL presence.** The eye must be seized by one
  thing at once. Crucially, that focal element has to carry genuine visual weight: a
  real photograph, a strong light source, a high-contrast object, a bold mass. A faint,
  ghosted, low-contrast shape on an empty field is NOT a focal point; it reads as dead
  space, and beautiful typography alone cannot carry an otherwise empty hero.
- **Restraint must strike, even on calm and luxury briefs.** "Dramatically spare" means
  extreme negative space around one object that has real presence (a gorgeous photo, a
  single high-contrast form, a genuine light-flooded scene), not a beige void with a
  whisper of a shape. If you go minimal, the one element you keep must hit hard. Quiet
  and competent is the most common way to miss the wow.
- **Intensity matched to the brief, undiluted.** Food should look abundant and
  mouth-watering; a festival loud; luxury dramatically spare around one striking object;
  never a timid middle.
- **When the imagery IS the desire (food, product, skin, fabric), let it dominate and
  stay warm.** The appetite subject must be the biggest, warmest, highest-contrast thing
  in the hero, bleeding large and lit to look crave-worthy. Do not shrink the real photo
  onto a small pale plate floated beside the headline, and do not let a cool or muted
  brand palette drain the warmth out of the one element that creates hunger or want. A
  beautifully art-directed page where the food is small and washed out has buried its
  own strongest asset. And make the hero subject read as one irresistible thing FIRST:
  a clever split/compare/exploded treatment with labels can register as a diagram ("two
  products") before it registers as delicious, which dampens craving. Lead with desire,
  let the cleverness be the second read (or move it past the hero).
Self-check: would this stop a scroll? If it is merely pleasant, scale the focal element
up, give it real contrast and presence (or a real photo), go more immersive, push the
color and light, and add the one dramatic entry moment.

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
  organic, luxury, playful, industrial, ...). Those are the common eight; the
  reference also carries a wider bench of named web aesthetics (neo-brutalism,
  claymorphism, glassmorphism, kinetic, vaporwave, academia, electric tech, ...) and
  a cultural well (Bauhaus, Art Deco, Y2K, Memphis, wabi-sabi, ...) to escape the
  default few. Scan it; do not keep reaching for the same handful. See
  `references/aesthetic-directions.md`.
- Vary across projects. Never converge on the same fonts, palette, or layout every
  time. Alternate light/dark, serif/grotesque, calm/loud.
- **Derive the page's ARCHITECTURE from the artifact, not from a default skeleton.**
  The single biggest tell of generated design is that every brief comes out as the
  same page: top nav, a mono eyebrow strip, one giant headline with a single
  accent-colored word, supporting copy, paired CTAs. Refuse that. A magazine should
  feel like a folded printed object; a festival like a poster or flyer; an app like
  the app's own UI; a restaurant like a menu. Let the artifact dictate the grid, the
  entry point, the reading order, and the section logic. Two different briefs must not
  produce the same layout in different colors. The strongest version of this is **one
  committed metaphor as the page's spine**: a single object (a form whose parts are your
  services, a product that disassembles) that is the hero, the nav, and the
  scrollytelling thread at once. See `references/signature-builds.md`.
- **Beat the LAZY default, not the genre itself.** Each category has a cliche look:
  dev tools default to near-black + neon-green + a clean grotesque; synthwave to a
  striped sun + scanlines + pink/cyan; SaaS to a purple gradient; AI to violet-on-white.
  The enemy is reaching for that stock skin on autopilot, not the aesthetic itself. A
  bold genre look that an audience genuinely loves is a win: a synthwave poster, a
  brutalist site, a vaporwave gradient can all be exactly right. The disqualifier is
  laziness and broken execution, never familiarity. So: name the category's default
  out loud, then EITHER make an unexpected, ownable choice, OR commit to the genre look
  with enough craft, one fresh twist, and flawless legibility that it transcends the
  stock version. Delight beats novelty. Never sand off the mood that makes the thing
  appealing (see "keep the subject's emotional register" below) just to look different;
  fix the real flaws (legibility, contrast, hierarchy) instead of fleeing the look.

### 2. Show, don't name: let the user pick a direction they can SEE
Users cannot be expected to know what japandi, art deco, or neo-brutalism
mean. When the direction is not already fixed, never ask in words; show
options in the browser and let them pick:
- Curate 4-6 styles from `references/design-styles-catalog.md` that genuinely
  fit the brief, spanning families (one calm, one loud, one dark, one
  unexpected; never near-neighbors, no filler).
- Build a self-contained tasting-menu HTML where every tile is a mini-hero of
  the USER'S ACTUAL project (their name, their headline, their subject) in
  that style, numbered, captioned with a layperson essence. Open it in the
  browser; take the pick in chat.
- Round two: 3-4 palette variants of the chosen style, differing on real mood
  axes (darker/lighter, warmer/cooler, louder/quieter), typography and layout
  held identical so color is the only variable. Mini pages, never swatches.
- Record the choice as a comment header in the build (style + palette) so
  later sessions pick up the thread.
- Skip when the user named a direction, is iterating on an existing design,
  or delegates the choice. Full workflow: `references/style-picker.md`.

### 3. Build the visual system
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
- **Imagery**: match the technique to the subject. Where the subject's beauty or
  texture IS the appeal (food, products, fashion, people, nature), use real
  photography or photoreal 3D / AI imagery, never a flat hand-coded vector drawing,
  which caps the wow no matter how clever. Reserve hand-coded SVG/CSS illustration for
  deliberately stylized looks (line art, geometric, retro, diagrammatic, brand marks).
  When you do illustrate, make it high-fidelity with SVG filters (texture, lighting,
  sheen) and layered light, not flat fills. Full guide:
  `references/imagery-and-illustration.md`.

### 4. Add motion and interaction
Motion is where standout sites separate from competent ones, but it must be
purposeful. One orchestrated load reveal beats scattered micro-animations. Reuse a
single easing token site-wide as the motion accent. Animate only `transform` and
`opacity`. Keep micro-interactions sub-200ms. See `references/motion-and-interaction.md`;
for parallax and scroll-driven storytelling (when scroll maps to a nameable axis),
see `references/scrollytelling-and-parallax.md`.

### 5. Reach for advanced visuals only when they serve the concept
WebGL/3D, shaders, and generative backgrounds are powerful but optional. The "wow" is
a reactive shader or a baked, art-directed scene, not heavy geometry. Awe does not
require WebGL (big type + whitespace + cursor craft is often enough). **Wow is
choreography, not engine:** many award-tier sites ship on constrained or no-code stacks
with no bespoke WebGL, faking an immersive 3D hero by scrubbing a pre-rendered vector
loop on scroll. Reach for a stronger concept and tighter motion timing before reaching
for a 3D engine. See `references/webgl-3d-and-generative.md` and
`references/signature-builds.md`.

### 6. For apps and product UI, switch modes
Dashboards, SaaS, and tools need density and usability plus polish, not marketing-site
spectacle. Different motion budget, the "Linear look" as a system, dark-mode tokens,
command palettes, real empty states. See `references/app-and-product-ui.md`.

### 7. Gate on performance and accessibility (this is the differentiator)
Most flashy sites fail here, which is exactly why doing it well makes work stand out.
- Performance: lazy/code-split heavy 3D, animate compositor-friendly props only,
  reserve space to avoid layout shift, compress assets. Targets: LCP < 2.5s,
  INP < 200ms, CLS < 0.1.
- Accessibility as craft: honor `prefers-reduced-motion` (reduce, do not just remove),
  keep a real semantic DOM layer (especially behind any canvas), beautiful and visible
  focus states, sufficient contrast, `rem` not `px`, non-hover paths. Full playbook:
  `references/accessibility.md`.

### 8. Open it in a real browser and inspect before calling it done (mandatory)
Never mark the work done from the code alone. Always load the built page in a real
browser (Chrome, via the browser tools when available) and look at it before claiming
it is finished. If you cannot open a browser, say so explicitly rather than implying it
was checked. Do not ship on authored intent: a declaration that reads correctly in the
CSS (`color: var(--ink)` on a button) can still render wrong because the cascade, a
more specific parent selector, or inheritance silently overrode it. Render at a real
desktop width and at a mobile width, and apply the fixes you find before finishing,
paying special attention to:
- **CTA and control contrast as computed, not as written.** A button nested under a
  `nav a` (or any element rule) can have its text color out-specified and flipped to
  the link color, painting a light label on a light fill. Confirm the real text-vs-fill
  contrast on every interactive element, in its default AND hover state.
- **Edge and header clearance.** The first content must not glue itself under a fixed
  header; give the hero top padding that clears the bar. Check nothing important kisses
  a viewport edge or another element.
- **A fixed or overlapping header must adapt to what scrolls behind it.** A header with
  one fixed background (say a light/cream bar with dark text and a dark logo) looks like
  a stray bar parked on top once a dark section scrolls under it, and the logo or links
  can lose contrast. Scroll the whole page and confirm the header reads correctly over
  EVERY section: give it a scroll/section-aware theme swap (light-glass over light,
  dark-glass over dark) or a treatment that genuinely works over both. Same for any
  logo, which may need a light and a dark variant.
- **Mobile navigation must stay reachable.** Do not collapse the nav by simply hiding
  the links below a breakpoint with no replacement; that strands Menu, About, and the
  rest on phones. If the links do not fit, provide a real menu affordance (a working
  hamburger/disclosure) so every destination is reachable on mobile.
- **The type hierarchy gap.** The wow from big display type comes from the GAP between
  it and everything else, not from making everything big. If the lede, meta, and body
  all ride up near the display size, the hierarchy flattens and it reads "everything is
  loud" instead of "one dramatic headline." Keep secondary text calm so the headline
  owns the scale.
- **Layout fit: type fits its column and the hero fits the viewport.** Oversized
  display type set in a narrow column will wrap one word per line and balloon the hero
  to several screens tall, pushing the hero imagery off-screen. Confirm the headline
  fits its actual column so the authored line breaks hold (no accidental word-by-word
  stacking), the hero sits in roughly one viewport, and nothing important (a key image,
  a CTA) runs off the bottom or the side. Size type to the space it actually has; widen
  the column or shrink the companion element rather than letting the headline overrun.
  On mobile specifically: when the hero stacks, a lead image must not eat the whole
  first screen and push the headline and brand line below the fold. Shrink the image, or
  overlap the headline onto it, so the core message is visible without scrolling.

Then verify the work escaped the generic look and hit the craft bar:
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
- **Show styles, don't name them.** When the direction is not already fixed,
  render 4-6 curated style options in the browser (the user's own content in
  every tile) and let the user pick what they can SEE, then do the same for
  palettes. Users cannot be expected to know style names; a pick they saw is
  a result they expect. See `references/style-picker.md`.
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
  out, plate it, or move it. **Pay special attention to CTAs and key interactive
  elements:** a primary button must have strong contrast and fully-contained text,
  never accent-on-accent (e.g. amber text on an amber fill) or label text clipped at
  the pill edge. One low-contrast or clipped CTA punctures an otherwise premium page.
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
- **Browser-verified before done.** Always open the built page in a real browser
  (Chrome, via the browser tools) and visually inspect it at desktop and mobile widths
  before marking the work complete. Catch the defects that only show when rendered
  (out-specified CTA contrast, content kissing a fixed header, a flattened type
  hierarchy) and fix them first. If no browser is available, say so plainly; never
  imply a visual check that did not happen.
- **The wow test (the highest bar).** Picture a stranger landing on this for the first
  time. Do they involuntarily go "wow, that's a great-looking site" within a second,
  and remember it afterward? If the honest answer is "it's clean and competent" or
  "it's a clever idea but visually quiet," it is not done. Push the focal moment,
  the scale, the color, the motion, the one striking element, until the first
  impression lands as awe, not approval. This applies to every genre, restraint
  included: a minimal page must be arrestingly minimal, not merely tidy.

## Starter snippets

`assets/snippets/` has working, copy-pasteable building blocks (every motion snippet
honors `prefers-reduced-motion`). Paste and adapt, do not treat as a fixed framework:
- Visual: `oklch-theme.css`, `fluid-type.css`, `grain-overlay.css`,
  `editorial-grid.css`, `bento-grid.css`.
- Motion: `scroll-reveal.css`, `parallax-layers.css`, `sticky-stack.css`,
  `split-text-reveal.js`, `magnetic-button.js`, `custom-cursor.js`,
  `lenis-gsap-sync.js`, `velocity-marquee.js`, `directional-underline.css`.
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
| `references/design-styles-catalog.md` | Step 2, the named styles the picker curates from: essences, signatures, tile recipes. |
| `references/style-picker.md` | Step 2, the show-dont-name workflow: tasting menus, palette variants, skip rules. |
| `references/typography.md` | Step 3, picking and setting type; named faces and foundries. |
| `references/color-and-atmosphere.md` | Step 3, palette, OKLCH theming, color derivation, dark mode, grain/gradient/glass. |
| `references/layout-and-composition.md` | Step 3, grids, breakout, bento, scroll architecture. |
| `references/imagery-and-illustration.md` | Step 3, choosing imagery (photo vs 3D vs AI vs SVG) and making illustration high-fidelity. |
| `references/motion-and-interaction.md` | Step 4, scroll, transitions, cursors, easing, kinetic type, Rive vs Lottie. |
| `references/scrollytelling-and-parallax.md` | Step 4, parallax and scroll-driven storytelling: the two honest jobs, craft numbers, tool choice. |
| `references/webgl-3d-and-generative.md` | Step 5, when 3D/shaders/generative earn their place. |
| `references/app-and-product-ui.md` | Step 6, app/dashboard/product UI work. |
| `references/narrative-and-detail.md` | Loaders, intros, sound, and the micro-details that leave a lasting impression. |
| `references/signature-builds.md` | Worked teardowns of standout archetypes (the single-metaphor site, the editorial work index) and the reusable moves behind them. |
| `references/accessibility.md` | Step 7, the stunning-and-accessible playbook. |
| `references/tech-stack.md` | Choosing libraries: the library-to-effect map and framework notes. |
| `references/anti-slop-checklist.md` | Step 8, the final pre-ship pass. |

## Posture

Match implementation complexity to the vision: maximalist directions need elaborate
code and orchestration; minimal directions need restraint and precision. Elegance
comes from executing one clear vision well. Don't hold back on committing to a bold
point of view, and don't sacrifice usability or accessibility to get there.
