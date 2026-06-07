# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and this project adheres to
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Changed
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
