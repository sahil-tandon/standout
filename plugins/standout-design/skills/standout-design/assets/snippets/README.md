# Snippets

Starter, copy-pasteable building blocks for the techniques in `../DOSSIER.md`. Every
motion/visual snippet honors `prefers-reduced-motion` (the default state is the calm
one; motion is the enhancement). Treat these as cohesive starting points, not a
framework: paste, then tune to the concept.

## Vanilla CSS

| File | What it gives you | Dossier link |
|------|-------------------|--------------|
| `oklch-theme.css` | OKLCH token system (bg/surface/text/accent) with relative-color ramps, color-mix borders/glass, light+dark via `[data-theme]` | Part 4 |
| `fluid-type.css` | `clamp()` fluid type + space scale, line-height/tracking tokens | Part 3 |
| `grain-overlay.css` | feTurbulence grain as a fixed `::before` data-URL overlay (dropped under `reduced-data`) | Part 4 |
| `editorial-grid.css` | Named grid lines (full/content/breakout) + subgrid card example | Part 5 |
| `bento-grid.css` | Container-query bento with `aspect-ratio` tiles + wide/tall spans | Part 5 |
| `scroll-reveal.css` | Reveal-on-enter via `animation-timeline: view()` + a scroll progress bar | Part 6 |
| `directional-underline.css` | Link underline that draws from the cursor's entry side | Part 9 |
| `parallax-layers.css` | Three-layer depth parallax via `animation-timeline: view()` (back/mid/front ratios, content at 1x), touch and reduced-motion gated | Part 6 |
| `sticky-stack.css` | Sticky stacking cards with gated scale/dim cover effect; the mobile-safe wow-per-byte pattern | Part 6 |

## Vanilla JS (ESM; GSAP where noted)

| File | What it gives you | Deps |
|------|-------------------|------|
| `lenis-gsap-sync.js` | The canonical single-rAF Lenis + ScrollTrigger sync | gsap >=3.12 + ScrollTrigger, lenis >=1.1 |
| `split-text-reveal.js` | GSAP SplitText `mask:"lines"` staggered hero reveal | gsap >=3.13 + SplitText |
| `magnetic-button.js` | `quickTo` magnetic button (offset * strength, elastic return) | gsap >=3.11 |
| `custom-cursor.js` | Dot + lagging follower, hover-context labels, touch/a11y aware | gsap >=3.11 |
| `velocity-marquee.js` | Seamless marquee whose speed/skew reacts to scroll velocity | gsap >=3.11 |

## React (React 19 + TS)

| File | What it gives you | Deps |
|------|-------------------|------|
| `react/useReducedMotion.ts` | SSR-safe live reduced-motion hook (+ imperative helper) | react |
| `react/motion-tokens.ts` | Typed motion tokens (durations, eases, springs) + CSS-var helper | react (Motion optional) |
| `react/TiltCard.tsx` | 2.5D depth card: layered `translateZ`, tilt, tracked highlight/shadow | react |
| `react/MeshGradient.tsx` | Dependency-free raw-WebGL aurora/mesh gradient (Stripe MiniGL style) | react |
| `react/FluidGlass.tsx` | R3F liquid-glass lens (drei `MeshTransmissionMaterial`) + CSS fallback | three, @react-three/fiber, @react-three/drei |

## Generative

| File | What it gives you | Deps |
|------|-------------------|------|
| `generative/flow-field.js` | Canvas flow-field (seeded simplex + trailing particles) | none (inlined PRNG/noise) |
| `generative/fbm-background.glsl` | fBm + domain-warp fragment shader + mount boilerplate | WebGL |
| `generative/cosine-palette.js` | Inigo Quilez cosine palette helper + 5 presets | none |

## Notes
- Browser-support and version caveats are in each file's header comment.
- The R3F `FluidGlass` refracts the 3D `Environment`, not arbitrary DOM behind it;
  refracting live page content needs an HTML-to-texture pass (documented in the file).
- GSAP is fully free (including SplitText) as of April 2025.
