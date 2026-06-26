# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and this project adheres to
[Semantic Versioning](https://semver.org/).

## [v0.2.1] (2026-06-26): Fix the tab-emoji setup instruction

Per-plugin versions in this release: standout-design 0.2.0, standout-notifications 0.1.1.

### Fixed
- `standout-notifications` (0.1.1): corrected the one-time iTerm2 setup for the tab-status
  emoji in both the plugin README and the `iterm-tab-status.sh` header comment. Current
  iTerm2 builds make the **Title** dropdown preset-only, so it no longer accepts an
  interpolated string. The `\(user.claudeStatus)` value now goes in the **Subtitle** field,
  and the docs note that the tab color alone is enough (the emoji is optional).

## [v0.2.0] (2026-06-25): Multi-plugin marketplace; add standout-notifications

Per-plugin versions in this release: standout-design 0.2.0, standout-notifications 0.1.0.

### Added
- `standout-notifications` plugin (0.1.0): iTerm2 tab colors that track working / waiting /
  idle state via lifecycle hooks, a random R2-D2 sound on the `Notification` event,
  and a `/sound` toggle. Hooks are plugin-relative via `${CLAUDE_PLUGIN_ROOT}`; the
  mute flag lives at `~/.claude/standout-notifications.muted` so it survives updates.

### Changed
- Restructured the repo from a single root-level plugin into a proper multi-plugin
  marketplace: each plugin now lives under `plugins/<name>/`, and
  `.claude-plugin/marketplace.json` lists them with `source: ./plugins/<name>`. The
  `standout-design` skill moved from the repo root to `plugins/standout-design/`
  (history preserved via `git mv`); install commands are unchanged for users.
- Repo renamed `standout-design` to `standout` to reflect the family. The root
  `README.md` is now the marketplace front door; design-specific docs moved to
  `plugins/standout-design/README.md`.

### Added (design references)
- A new `references/signature-builds.md`: worked teardowns of two standout archetypes,
  the single-metaphor site (one persistent object as hero + nav + scrollytelling spine,
  scrubbed-vector "3D", glyph wayfinding, annotation-over-grid, instrument-dial CTA) and
  the editorial work index (mono ledger + cursor-following preview stack + filter pills +
  award badges), plus the harvested detail patterns and cohesion mechanics behind them.
  Registered in SKILL.md's reference table. The unifying principle, "wow is choreography
  and one committed metaphor, not a heavy 3D engine", is also folded into SKILL.md
  (step 1 architecture and step 4 advanced visuals).
- Wove the supporting techniques into the existing references: the persistent-object
  scrollytelling spine and the cursor-following media-preview index pattern into
  `references/narrative-and-detail.md`; organic-annotation-over-a-rigid-grid and the
  primitive glyph wayfinding system (Swiss/brutalist) plus instrument/gauge-dial motifs
  (retro-technical/HUD) into `references/aesthetic-directions.md`; scrubbing a
  pre-rendered Lottie vector loop for a cheap "3D" hero into
  `references/motion-and-interaction.md`; and perspective-tilted screen-mockup clusters
  (with a new decision-table row) into `references/imagery-and-illustration.md`.
- A "Photoreal plates: render in Blender, composite into live UI" section to
  `references/webgl-3d-and-generative.md`, consolidating the hands-on 3D production
  pipeline learned this session (previously only scattered as high-level principles):
  render the whole scene not a flat element in a CSS void; pick the camera by need
  (top-down orthographic framed to the object for a 1:1 alignable playable surface, vs
  angled perspective + DoF for a hero still); the compositing technique (rendered plate
  as the surface, SVG turned into a transparent interaction/hit/glow overlay, real 3D
  pieces on top); bake the 2D artwork in as the albedo so it catches real light; the
  lighting/look recipe (warm key + cool fill + dark world + source bloom, real
  thickness + contact shadow, exposure for falloff); the tested "use Standard not
  AgX/Filmic view transform when the surface carries brand colors" gotcha; the
  BlenderMCP / Poly Haven / Sketchfab / Hyper3D tooling path; and the decisive
  subject-dependent caveat (3D is right for hard-surface + texture, wrong for organic
  food, which renders plastic and must use real photography). Cross-linked from the
  imagery reference.

### Changed
- Pushed the same Scotland Yard board UI further (eight versions, eight rounds of
  independent visual critique, wow 6.5 to ~8.5, craft 7 to ~8.5) to find the ceiling.
  Added a "Light the scene" subsection to the material-pastiche guidance: once a
  surface reads as the right material, LIGHT is the bigger wow lever than more texture,
  put a directional light with real falloff on the hero surface itself (not just the
  frame), compose the whole frame as chiaroscuro (one lit hero, chrome sunk into WARM
  TEXTURED shadow with a visible light source, not a flat dark wash that reads as
  "dimmed UI"), and know the ceiling: pure CSS/SVG plateaus short of photoreal material
  realism, so the last mile to a stop-and-stare result wants a baked photoreal/3D hero
  plate behind a live CSS overlay, and a dramatic hero shot hits that bar more easily
  than a fully-usable UI (deep chiaroscuro fights interface legibility).
- Hardened from a real build test (an online Scotland Yard board-game UI in a
  "retro board-game craft" direction, four rounds of independent visual critique:
  wow 6.5 to 7.5, craft 7 to 8). Added a "material pastiche" section to
  `references/imagery-and-illustration.md` for briefs that imitate a physical object
  (cardboard, print, paper, wood, ceramic, leather): put the material on the largest
  hero surface (not just edges and props, texture only on the rim is the "themed web
  app" tell), make the texture bold enough to survive at 1x (coarse fibre plus
  large-scale aging mottle, not a timid 6 to 8 percent overlay), give printed/handmade
  looks slight ink unevenness and mis-registration since crisp vector lines read as
  digital, keep physical pieces matte and top-lit with a die-cut bevel (a glossy
  radial dome reads as a UI dot), and treat wear (directional fold-crease shadow, edge
  darkening, an on-surface printed legend) as art direction. Same recurring trap in a
  new costume: craft pooling in the safe chrome while the hero surface stays flat.
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
