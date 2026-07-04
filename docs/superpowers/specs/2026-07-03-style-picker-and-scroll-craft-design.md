# standout-design v0.3.0: visualize-and-pick flow + scroll craft + new teardowns

Date: 2026-07-03
Status: approved (design), pending implementation
Plugin: `plugins/standout-design/` (0.2.0 -> 0.3.0)

## Problem

Users of the skill cannot be expected to know what "japandi", "art deco", or
"neo-brutalism" mean. Asking them to choose a direction by name produces
mismatched expectations and frustration. The skill also lacks a structured
catalog of named design styles, a systematic palette-variant method, and a
dedicated craft guide for parallax / scroll-driven storytelling. Three
award-tier sites were studied live (ON.energy grid-volatility, Resn's I Spy,
Niccolo Miranda's Paper Portfolio) and their lessons are not yet captured.

## Feature 1: the visualize-and-pick flow ("Show, don't name")

A new step in SKILL.md's method (inserted after today's Step 1; later steps
renumber). When the user has NOT already fixed a direction:

1. **Curate 4-6 styles** from `references/design-styles-catalog.md` that fit
   the brief. Curation rules:
   - Span families deliberately: at least one calm, one loud, one dark, one
     unexpected pick. Never offer near-neighbors (japandi vs scandinavian).
   - Every option must be genuinely defensible for the brief; no filler.
2. **Generate a bespoke tasting-menu HTML** (single self-contained file, no
   external requests) where each tile is a mini-hero of the USER'S ACTUAL
   PROJECT: their brand name, their real headline, their subject, executed in
   that style using the catalog's tile recipes. Tiles are numbered and
   captioned with a one-line layperson essence ("Gatsby glamour", "spa
   quiet"). Identical content across tiles so only the style varies.
3. **Open it in the browser** (Chrome tools when available, else `open`),
   then ask for the pick in chat: AskUserQuestion when available, plain chat
   otherwise. Tiles are NOT clickable-to-choose; the choice happens in chat
   (dependency-free, works everywhere).
4. **Round two, palettes:** for the chosen style, generate 3-4 palette
   variants that differ on real mood axes: value (darker/lighter),
   temperature (warmer/cooler), volume (louder/quieter). Variant 1 = the
   style's canonical palette done well; the others each move one axis hard.
   Typography and layout held identical; color is the only variable. Rendered
   as mini pages, never swatch strips. Same open-and-pick mechanics.
5. **Record the choice** in the eventual build as a comment header (style +
   palette variant name) so later sessions can pick up the thread.

Skip conditions (the picker must not add friction where it has no value):
user already named a direction; iterating on an existing design; user
explicitly delegates the choice ("you pick"). Tasting-menu files are scratch
artifacts (session scratchpad or a gitignored temp dir), never committed.

## Feature 2: new reference `references/design-styles-catalog.md`

The picker's source of truth. Contents:

- **The 16-style picker set** (each: name, one-line layperson essence, visual
  signature covering type/color/layout/texture, when it fits, compact CSS
  tile recipe): Minimal/Swiss, Editorial, Quiet Luxury, Art Deco, Dark
  Academia, Cinematic Noir (tenebrism), Organic Calm (japandi/wabi-sabi
  fold), Cottagecore, Mid-Century Retro, Memphis Pop, Playful Clay
  (claymorphism/kawaii fold), Neo-Brutalism, Brutalist Raw, Glass & Aurora
  (flagged: current AI-generic default, execute with restraint), Synthwave/
  Y2K Chrome (era sub-toggle), Cyberpunk Terminal.
- **Bench styles** (offered when the brief calls for them): Bauhaus, Frutiger
  Aero, Pixel Art, Scrapbook/Collage, Mystical Southwest, Maximalist
  Eclectic, Surrealist Wildcard, Art Nouveau, Victorian, Gothic, Baroque/
  Neoclassical heritage set.
- **Family cluster map** (10 families) + near-duplicate folds so curation
  never offers two of the same family unless the brief demands it.
- **Do-not-offer list:** Corporate Memphis (generic-2019), lone raw aurora
  gradients (the #1 AI-look cliche), lone neumorphism (accessibility trap,
  weak at page scale).
- **Cross-cutting notes:** bento is a layout, not an aesthetic (composes with
  any surface style); dark/light polarity support per style (cottagecore and
  frutiger aero are light-locked; cyberpunk and synthwave dark-locked).

## Feature 3: new reference `references/style-picker.md`

The workflow doc for Feature 1: curation rules, tasting-menu tile anatomy
(mini-hero structure, numbering, caption format, self-containment and
no-external-font constraints with graceful font fallbacks), the palette-
variant axes method with a worked example (e.g. LUXURY: Midnight Gold /
Gallery Cream / Midnight Champagne / Noir Emerald), skip conditions, and the
record-the-choice convention.

## Feature 4: extend `references/color-and-atmosphere.md`

- **Kennedy variation framework:** darker variant = lower Brightness + HIGHER
  Saturation; lighter = inverse. Hue-shift refinement: darker nudges toward
  0/120/240 (red/green/blue luminosity minima), lighter toward 60/180/300.
  Workable defaults (labeled as extrapolations): hover S+8..12 B-8..12,
  pressed S+15..20 B-15..20, tinted bg S 4..8 B 95..98.
- **Never flat pure grays:** tint every neutral with the brand hue (OKLCH
  same-hue ramp, C 0.01-0.02, L 97 down to 12); more saturation at the dark
  end. Cool-tinted = tech/clean, warm-tinted = organic/editorial.
- **OKLCH constant-L trick:** keep L/C fixed and rotate only H to derive
  semantic colors with identical perceived weight AND identical contrast
  ratios (programmatic AA guarantee).
- **Dark mode derivation, not inversion:** base L 10-15 tinted, elevation =
  lighter surfaces (3-4 L points per layer), per-hue desaturation (blues
  -20..30%, reds -10..15%, greens shift 3-5deg toward teal, yellows redesign
  toward amber), off-white body text.
- **Award-tier color findings:** commit to a dominant color MASS (white
  becomes the secondary); vibrant complementary tension surrounded by muted
  fields; atmospheric gradients as environment with grain; duotone as
  identity; unexpected category palettes (keep one category cue, break the
  color expectation).
- **Style-to-palette pairing table** for the 16 catalog styles.

## Feature 5: new reference `references/scrollytelling-and-parallax.md`

Kept separate from motion-and-interaction.md (609 lines already). Contents:

- **Two honest jobs rule:** ambient depth (subtle, everywhere-safe) or
  narrative timeline (scroll maps to a NAMEABLE axis: time, depth, geography,
  process, transformation). If you cannot name the axis, cut the effect.
  "The scroll mechanic should rhyme with the content."
- **Technique taxonomy (11):** multi-layer depth parallax; pointer/gyro
  parallax; scroll-scrubbed image sequence (canvas, pre-decoded bitmaps);
  pinned sections with internal timelines; horizontal scroll sections; scroll-
  linked 3D camera; sticky stacking cards; reveal choreography; CSS scroll-
  driven animations (scroll()/view() + animation-range); Lenis smooth scroll
  (lerp ~0.1, keep native touch); snap scrolling (proximity over mandatory).
- **Craft numbers:** 3 layers standard (bg 0.2-0.4x, mid 0.6-0.8x, content
  1x, foreground accent slightly >1x, sparingly); TEXT ALWAYS 1x; one set
  piece per page; interleave set pieces with normal scrolling.
- **Scroll-jacking limits (NN/g):** never alter speed/direction for primary
  content; short purposeful pinned sequences below the fold; no text to read
  inside jacked sequences; avoid on mobile.
- **Mobile-safe subset:** sticky stacks, snap, view()-timeline fades; disable
  or simplify multi-layer and pinned parallax on touch; never
  background-attachment: fixed.
- **Performance:** transform/opacity only, passive listeners + rAF batching,
  IntersectionObserver gating, will-change sparingly; CSS scroll-driven
  animations run on the compositor (their killer feature).
- **Tool table (2026):** CSS scroll-driven (reveals/progress/simple parallax;
  progressive enhancement, Safari 26 shipped) vs GSAP ScrollTrigger + Lenis
  (pinning, scrubbing, horizontal, image sequences; run Lenis raf on GSAP
  ticker) vs Motion useScroll/useTransform/useSpring (React-internal scroll
  logic) vs R3F ScrollControls/Theatre.js (3D camera narratives, centerpiece
  only). Start at the simplest tier; graduate on need.
- **Reduced motion:** zero out translation/scale/pinning, opacity-only fades
  acceptable, all content visible statically.

## Feature 6: extend `references/signature-builds.md` (3 teardowns)

1. **The scrollytelling world (ON.energy, grid-volatility):** one continuous
   isometric illustrated world as the page's stage; scroll drives a camera
   through SCALE LEVELS (city -> battery farm -> inside one container,
   x-rayed); scroll scrubs TIME (day clock + price ticker) with state shown
   in color (yellow = charging/cheap, red = discharging/scarcity) synced to a
   demand curve; narrative rhythm of alternating Challenge (black) / Solution
   (brand yellow) cards; persistent data widgets that animate with scroll;
   chapter transitions via full-viewport background color swaps (near-black
   -> brand yellow -> white world -> black stats finale with real photos and
   big numbers). Reusable moves: scroll-scrub a meaningful axis (time), color
   legend as product story, camera-through-scales, card rhythm.
2. **The total artifact metaphor (Paper Portfolio, niccolomiranda.com):** the
   portfolio IS a newspaper: blackletter masthead, dateline, fat-face Didone
   headlines (Canopee; Editorial New; Domaine Display), drop caps, hairline
   column rules, testimonials as press clippings (dashed clip borders,
   portrait medallions), postage stamp with name/date, TIP! annotations as
   service journalism, EMAIL ME as a ticker ribbon, paper sheet floating on a
   warm near-black desk (rgb(29,29,27), never #000). Stack: Webflow + GSAP +
   Locomotive smooth scroll -> "wow is choreography, not engine" proven.
   Reusable moves: pick the artifact, then let EVERY device on the page be a
   device of that artifact; texture everywhere (paper grain); metadata as
   in-world ephemera (stamp, dateline, clippings).
3. **The one-gesture story world (I Spy, Resn for HEIHEI):** a
   wimmelbilderbuch (teeming-picture-book) hidden-object game; six
   illustrated NZ environments (artist T Wei); postcard-themed UI; kiwi
   road-trip nostalgia (cream field, terracotta frame, vintage slab serif +
   script pairing, hand-drawn drifting characters); interactions limited to
   touch/click/drag a child already knows; two modes (freeplay / challenge).
   Reusable moves: one nostalgic artifact metaphor (postcard) carrying the
   whole UI; radical interaction simplicity as a design feature; density of
   hand-crafted detail as the wow.

## Feature 7: two new snippets

- `assets/snippets/parallax-layers.css`: 3-layer CSS scroll-driven parallax
  (view()/scroll() timelines), @supports-gated, content visible by default,
  prefers-reduced-motion fallback, touch simplification note.
- `assets/snippets/sticky-stack.css`: sticky stacking cards (best wow-per-
  byte, mobile-safe), with optional scroll-driven scale/dim enhancement,
  reduced-motion safe.

Both follow the existing snippet header conventions in assets/snippets/.

## SKILL.md edits

- Insert the new step ("Show, don't name") into the method; renumber later
  steps; keep total under ~370 lines by pushing all depth into the two new
  reference files.
- Add the two new references + catalog to the references table with "read
  when" guidance; add the two snippets to the snippet index.
- Non-negotiables: add one line: "When the direction is not already fixed,
  show styles in the browser before naming them; users pick what they can
  see."

## Out of scope

- Clickable tile selection (would need a server or extension dependency).
- Pre-built generic style gallery assets (bespoke-per-project was chosen).
- Changes to standout-notifications or the statusline repo.

## Versioning / process

- SemVer MINOR: 0.2.0 -> 0.3.0 in `plugins/standout-design/.claude-plugin/
  plugin.json` AND `.claude-plugin/marketplace.json` (kept in sync).
- CHANGELOG.md entry following the repo format, e.g.
  `## [standout-design v0.3.0] (2026-07-03): Style picker, scroll craft`,
  with an `### Added` section covering the picker flow, catalog, color
  upgrades, scroll reference, teardowns, snippets. Use the actual release
  date at release time.
- Granular conventional commits on `develop`; docs commits separate from any
  code-adjacent commits per the global convention.

## Testing / verification

- Render a sample tasting menu (fictional brief) and open it in Chrome at
  desktop and mobile widths; verify tiles are visually distinct, legible,
  self-contained (no network requests), and captions read layperson-clear.
- Verify both snippets in a scratch page: effect present in Chrome, content
  fully visible with JS/animation-timeline unsupported, calm under
  prefers-reduced-motion.
- `/plugin marketplace add ./standout` + reinstall locally; confirm the skill
  loads and the new references resolve.
