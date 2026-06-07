# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and this project adheres to
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed
- Studied a batch of web-design inspiration and creativity sources (AddSearch,
  Awwwards, Webflow, Format, Eleken, Kota, MuffinGroup, CSS-Tricks, plus several
  listicles). Most repeated craft the skill already carries; the additive yield was
  narrow and specific. Added to `references/tech-stack.md` a "Recent native CSS worth
  reaching for" section (corner-shape, gap decorations, anchor positioning,
  shape-outside with shape()/path(), CSS-only conic-gradient charts, native text
  reveals via letter-spacing and ::first-line/::first-letter, image-rendering:
  crisp-edges), since these reduce JS and rarely show up in generated output. Added
  two principles to foundations' "moves worth stealing": make the interaction embody
  the product (the marketing site behaves like the thing it sells) and demonstrate
  the one benefit in the hero rather than describing it.
- Studied a set of web-animation and 3D-graphics guides (Fireart, SVGator, an
  Authory 3D-examples roundup, a Three.js beginner guide, Evermade, a Spline
  tutorial, and Airbnb's Lottie). Most overlapped craft the motion and 3D
  references already carry (Rive vs Lottie, DrawSVG/MorphSVG, scroll-sync, baked
  lighting, kinetic type), so the additions were targeted gap-fills in
  `references/webgl-3d-and-generative.md`: a corollary that 3D should spike a few
  chosen moments (combined with parallax and scrollytelling) rather than run as a
  whole-site VR layer, Womp and A-Frame added to the toolchain, and a new "Asset
  and delivery pipeline" section (ship compressed glTF/glb via gltf-transform or
  gltfpack with Draco/meshopt geometry and KTX2/Basis textures, clamp pixel ratio,
  lazy-load and gate the canvas, and source models from Sketchfab/Poly Haven/
  Quaternius/CGTrader/TurboSquid).
- Widened the aesthetic-directions reference from a study of design catalogs
  (designprompts.dev's 30 web-native presets, a 50-style cultural survey, and 2026
  trend reporting). Kept the eight in-depth families and added: a "wider bench" table
  of 23 named web aesthetics (monochrome editorial, newsprint, Bauhaus, Art Deco,
  flat, Material, neumorphism, claymorphism, glassmorphism, neo-brutalism, bold-type
  poster, kinetic, academia, cyberpunk, vaporwave, web3, botanical, sketch, playful
  geometric, retro 90s, cinematic dark SaaS, electric tech, industrial skeuomorphism)
  each with its signature, mode/type, and fit; a "cultural well" of historical and
  subcultural styles to mine for repositioning; and a "current currents (2026)" note
  (nostalgia-as-comfort, glassmorphism/liquid-glass return, emotionally-aware and
  time-of-day modes, multimodal/intent-led, machine experience, and the
  AI-templating-regresses-to-slop caution). SKILL.md step 1 now tells the model to
  scan the wider bench instead of defaulting to the same handful.
- Second round on the Umbrella Burger test (independent re-review: wow 5.5 to 7, craft
  8 to 8.5). Added the lever to compose ONE lit scene rather than a product cutout
  politely beside the type (bleed off-frame, overlap the headline, give light a
  direction, ground with a contact shadow, so a vertical crop anywhere still reads as
  one image), the caution that a hero subject must read as one irresistible thing before
  any clever split/compare/exploded treatment registers as a diagram, and the mobile
  rule that a stacked hero's lead image must not push the headline and brand line below
  the fold.
- Hardened from a real-brand redesign test (Umbrella Burger). Added: when the imagery
  IS the desire (food, product, skin, fabric) it must dominate the hero, large, warm,
  and high-contrast, never shrunk onto a small pale plate beside the headline or drained
  of warmth by a cool brand palette. A fixed or overlapping header must adapt to what
  scrolls behind it (a light bar parked on a dark section reads as a stray stripe and
  can drop the logo/link contrast); give it a section-aware theme swap or a treatment
  that works over both, with a light and dark logo variant as needed. Mobile navigation
  must stay reachable: never hide the nav links below a breakpoint with no replacement;
  provide a real menu affordance. And "make now feel live" only if it is actually live;
  hard-coded fake live data reads as set dressing and spends credibility.
- Hardened the skill from first-round design reviews. Content is now visible by
  default (scroll reveals gated behind `@supports` and a JS class, so unsupported
  browsers and no-JS loads still show everything). Added guidance to derive page
  architecture from the artifact rather than reusing one skeleton, to avoid the
  category default (not just the generic one), to keep load-bearing text the most
  legible element, and to hold the hero's craft past the fold with crafted
  placeholders instead of flat gradient blocks. Noted that some "safe" faces
  (Space Grotesk, Geist) have become category defaults.
- Second review round (iteration 3). Added rules that the concept must extend into
  every section (not evaporate below the fold, and prove itself on the product/second
  screen), that the palette must escape the category default too (a fresh concept on a
  stock palette still reads stock), that decorative motifs must be structural (no lines
  that connect nothing, no dead space), that ALL text (not just the headline) must
  clear its background, and that the designer's own tics (mono eyebrow + spec block,
  the two-tone accent word) must not become a repeated formula.
- Third review round (iteration 4). Required the concept to be SEEN on every screen
  (not just labeled in copy), to subvert the category cliche while keeping the
  subject's emotional register, to give the body face the same voice as the display
  (no generic sans under a characterful display), and to fill interiors with real
  content: anchored negative space, and figures that hold a portrait or legible data
  rather than thin decorative line-art.
- Made the WOW the primary success bar (immediate visceral "great-looking site" on
  sight, any genre), added concrete levers to manufacture it (dramatic scale,
  immersion over the safe split, color/light intensity, one dramatic entry moment),
  and corrected the over-correction toward anti-cliche novelty (beat the lazy default,
  not the genre; keep the subject's emotional register).
- Made browser verification a mandatory completion gate (method step 7 and a
  non-negotiable): always open the built page in a real browser (Chrome, via the
  browser tools) and visually inspect at desktop and mobile widths before marking
  work done, and say so plainly if no browser is available rather than implying a
  check that did not happen. The page must be looked at, not just authored: a
  correct-looking declaration can still render wrong when the cascade or a more
  specific parent selector overrides it. Confirm CTA and control contrast as computed
  (a button under a `nav a` rule can have its text color out-specified and flipped to
  the link color, painting a light label on a light fill, in default and hover state),
  confirm the first content clears a fixed header, confirm the type hierarchy gap
  (big display type wows via the gap to secondary text, not by making everything big;
  keep the lede and meta calm), and confirm layout fit (oversized type in a narrow
  column wraps word-by-word and balloons the hero past the viewport, pushing hero
  imagery off-screen; size type to the space it has, and keep the hero to roughly one
  viewport with nothing important running off the edge).
- Added an imagery and illustration guide (`references/imagery-and-illustration.md`)
  and the rule to match imagery technique to subject: use photography, photoreal 3D, or
  AI imagery where the subject's texture is the appeal (food, products, fashion), and
  reserve hand-coded SVG/CSS for stylized looks, made high-fidelity with SVG filters
  and layered light rather than flat fills.

## [v0.1.0] (2026-06-06): Initial standout-design skill

### Added
- `standout-design` skill (`skills/standout-design/SKILL.md`): the workflow for
  building distinctive, accessible frontends for websites and apps that escape the
  generic AI look.
- Twelve on-demand craft references (`skills/standout-design/references/`):
  foundations, aesthetic-directions, typography, color-and-atmosphere,
  layout-and-composition, motion-and-interaction, webgl-3d-and-generative,
  app-and-product-ui, narrative-and-detail, accessibility, tech-stack, and the
  anti-slop-checklist.
- A starter snippet library (`skills/standout-design/assets/snippets/`): OKLCH theme,
  fluid type, grain, editorial and bento grids, scroll reveals, magnetic cursor,
  SplitText reveal, Lenis + GSAP sync, velocity marquee, 2.5D tilt card, mesh
  gradient, R3F fluid glass, flow-field and fBm generative backgrounds, a
  reduced-motion hook, and motion tokens. Every motion snippet honors
  `prefers-reduced-motion`.
- Plugin and self-hostable marketplace manifests (`.claude-plugin/`), so the skill is
  installable via `/plugin marketplace add` the moment the repository is published.
