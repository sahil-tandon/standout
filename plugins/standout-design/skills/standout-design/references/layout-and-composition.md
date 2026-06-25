# Layout and composition: structure with intent

Generated layouts default to a centered column or an even card grid. Award-tier layout
reads as composed: an editorial grid with named zones, deliberate asymmetry and overlap,
modular bento tiles, and a scroll architecture that paces the page. Every technique here
maps to a concrete CSS or GSAP API.

## Contents

1. [Editorial grid with named lines](#editorial-grid-with-named-lines)
2. [Subgrid for cross-component alignment](#subgrid-for-cross-component-alignment)
3. [Broken grid, asymmetry, overlap, diagonal flow](#broken-grid-asymmetry-overlap-diagonal-flow)
4. [Bento grids](#bento-grids)
5. [Fluid sizing: aspect-ratio and clamp](#fluid-sizing-aspect-ratio-and-clamp)
6. [clip-path layouts](#clip-path-layouts)
7. [Scroll architecture: sticky and stacking cards](#scroll-architecture-sticky-and-stacking-cards)
8. [Pinned sections and horizontal scroll](#pinned-sections-and-horizontal-scroll)
9. [Section snapping](#section-snapping)
10. [Scrollytelling structure](#scrollytelling-structure)

---

## Architecture from the artifact (read this first)

Before reaching for any grid primitive, decide the page's whole structure from the
thing you are designing, not from a default skeleton. The fastest way to look
generated is to ship every brief as the same page: top nav, a mono eyebrow strip, one
giant headline with a single accent-colored word, supporting copy, paired CTAs. That
skeleton is fine once; across briefs it is a template tell.

Instead, ask what physical or interface object this brand is, and let that set the
layout logic:

- A magazine or journal reads as a **printed object**: a masthead, a folio line, a
  real contents list, multi-column justified spreads, pull quotes, captions.
- A festival or event reads as a **poster or flyer**: a dominant bill, stacked
  names, ticket tiers as a price list, a schedule grid.
- An app or tool reads as **its own UI**: the product surface IS the hero, real
  panels, keyboard hints, state.
- A restaurant reads as a **menu**; a film as **titles and stills**; an archive as
  an **index**.

Two different briefs must not resolve to the same layout in different colors. Vary the
grid, the entry point, the reading order, and the section rhythm per artifact.

**Follow through past the fold.** The recurring failure mode is a strong hero followed
by a weak or broken second screen. Every section must hold the hero's craft. When you
have no real image asset, never drop a flat gradient rectangle (it reads as "image
failed to load"); build a crafted placeholder instead: line art, a duotone or halftone
pattern, a generative texture (see `webgl-3d-and-generative.md`), or a type-driven
composition that interacts with the surrounding layout.

---

## Editorial grid with named lines

The single most reusable layout primitive on editorial sites is a grid whose **lines are
named with `-start` / `-end` suffixes**. Grid auto-creates a same-named *area* you can
place into, which gives you content-width, breakout, and full-bleed zones in one
declaration, with no wrapper divs and no negative-margin hacks.

```css
.layout {
  display: grid;
  grid-template-columns:
    [full-start] minmax(1rem, 1fr)
    [content-start] minmax(0, 70ch)
    [content-end] minmax(1rem, 1fr)
    [full-end];
}
.layout > * { grid-column: content; } /* default: text column */
.breakout    { grid-column: full;    } /* edge-to-edge image/section */
```

`grid-column: content` is shorthand for `content / content`. This is the modern
replacement for the old `width:100vw; margin-left:calc(50% - 50vw)` full-bleed hack.

---

## Subgrid for cross-component alignment

`grid-template-columns: subgrid` makes a child grid inherit the parent's track sizing
**and line names**, so a deeply nested card can still snap to the page's `content` column
without recomputing line numbers at each level. Baseline since 2023. This is what makes
fluid bento layouts and magazine spreads align cleanly.

```css
.card {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: content;     /* uses the parent's named lines */
}
```

Editorial use: let pull-quotes, inline media, and captions span specific named tracks
for print-style spreads that previously needed absolute positioning.

---

## Broken grid, asymmetry, overlap, diagonal flow

The broken-grid look (overlap, intentional misalignment, diagonal energy) is mostly
achieved by **letting grid items share cells**, not by absolute positioning.

- **Overlap:** place two items on the same `grid-row` / `grid-column` and offset one with
  `transform: translate()` or `margin`. Control stacking with `z-index`.
- **Diagonal flow:** rotate a full-bleed band with `transform: rotate(-4deg)` then
  counter-rotate the inner content, or cut a slanted section edge with
  `clip-path: polygon(...)`.
- **Grid-breaking element:** an image with `grid-column: full` interrupting a
  `content`-width text flow is the cleanest breakout.
- **Asymmetry:** avoid `1fr 1fr`. Use `grid-template-columns: 2fr 3fr` or `minmax()` so
  columns carry different visual weight.

---

## Bento grids

A 2025-2026 staple: modular tiles of varied span, each holding one idea. Stack: **CSS
Grid + `aspect-ratio` + `grid-template-areas` (or auto-placement) + container queries**.

```css
.bento {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-auto-rows: 1fr;            /* square-ish base cells */
  gap: 1rem;
}
.bento > * { container-type: inline-size; }   /* cell-responsive content */
.tile--wide { grid-column: span 2; }
.tile--tall { grid-row: span 2; }
.tile { aspect-ratio: 1; }        /* reserve space, prevent layout jump */
```

Critical details:

- Set `aspect-ratio` on every cell so the browser reserves space before images load (no
  jumpy CLS).
- Add `contain: layout` per tile for cheaper repaints.
- Container queries (`@container`) let each tile restyle its own contents based on the
  cell's width, not the viewport. This is what makes bento truly responsive rather than
  just reflowing.

---

## Fluid sizing: aspect-ratio and clamp

- `aspect-ratio: 16/9` on media wrappers gives zero CLS with no padding-hack.
- `clamp(min, preferred-vw, max)` for fluid type and gaps so layouts breathe at every
  width without breakpoints. The `vw` term in the middle is what creates the truly fluid
  feel; the `min`/`max` keep it from collapsing or blowing out.
- `minmax(0, 800px)` inside grid tracks prevents blowout from long content (the `0`
  minimum lets the track shrink below content size).

```css
:root {
  --step-hero: clamp(2rem, 1rem + 6vw, 8rem);
  --gap-section: clamp(2rem, 5vw, 6rem);
}
```

---

## clip-path layouts

`clip-path: polygon()` cuts non-rectangular section shapes (slants, chevrons, torn
edges). It is animatable, so it doubles as a reveal: animate `clip-path: inset(0 100% 0
0)` to `inset(0)` to wipe a section or image in. Pair with `shape-outside` for text that
wraps a non-rectangular figure in editorial layouts.

```css
@keyframes wipe {
  from { clip-path: inset(0 100% 0 0); }
  to   { clip-path: inset(0); }
}
```

---

## Scroll architecture: sticky and stacking cards

`position: sticky` is the native, JS-free workhorse. A sticky element behaves relative
until it hits its `top`/`bottom` threshold, then pins until its container scrolls past.

**Sticky section** (pin a panel while a sibling scrolls past):

```css
.panel { position: sticky; top: 0; height: 100vh; }
```

**Stacking cards** (cards pile up as you scroll). Each card sticks at the same `top`;
later cards cover earlier ones. Offsetting each card's `top` per index creates the
visible staircase stagger:

```css
.card { position: sticky; top: 2rem; }
/* per-card: top: calc(2rem + var(--i) * 1.5rem)  -> staircase stack */
```

For scale or blur as cards stack, layer in `animation-timeline: view()` (CSS-only) or
IntersectionObserver-driven transforms.

---

## Pinned sections and horizontal scroll

For scrubbed, controllable pinning, GSAP ScrollTrigger is the award-site default. Its
`pin: true` holds the element while the trigger range scrolls.

**Vertical-scroll to horizontal-move gallery** (the cinematic side-scroll):

```js
const track = gsap.utils.toArray(".panel");
gsap.to(track, {
  xPercent: -100 * (track.length - 1),
  ease: "none",
  scrollTrigger: {
    trigger: ".horizontal-wrap",
    pin: true,
    scrub: 1,                 // tie progress to scrollbar (1 = slight smoothing)
    end: () => "+=" + document.querySelector(".horizontal-wrap").offsetWidth,
  },
});
```

Gotchas:

- The moving tween must use `ease: "none"`, or the horizontal motion will not track the
  scrollbar linearly.
- To trigger child animations off a horizontally-moving container, pass
  `containerAnimation: yourTween` to their ScrollTriggers.
- **Pinning and snapping are not available on `containerAnimation`-based triggers.**

---

## Section snapping

- **CSS-only:** `scroll-snap-type: y mandatory` on the scroller plus `scroll-snap-align:
  start` on sections. Cheap and accessible full-page snapping.
- **GSAP:** ScrollTrigger `snap: 1 / (sections - 1)` for snapping that respects scrubbed
  timelines.

---

## Scrollytelling structure

Two implementation families:

- **Scrubbed / pinned** (GSAP ScrollTrigger, optionally ScrollSmoother): the scene is
  pinned and animation progress is welded to scrollbar position via `scrub`. Best for
  cinematic, frame-by-frame product reveals.
- **Step-based** (Scrollama.js on top of IntersectionObserver): fires discrete "enter
  step N" events. Lighter, ideal for narrative journalism. Uses a pooled
  IntersectionObserver for very low overhead.

Common patterns: pinned scene plus progressive reveal plus parallax, or a hybrid. See
`narrative-and-detail.md` for the story-first discipline that should drive any
scrollytelling build.

Always gate motion behind `@media (prefers-reduced-motion: no-preference)`, set
`aspect-ratio` to kill CLS, and keep one easing token as the site's motion accent.
