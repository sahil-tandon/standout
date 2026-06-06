# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/), and this project adheres to
[Semantic Versioning](https://semver.org/).

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
