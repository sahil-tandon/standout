# Tech stack: the library-to-effect decision guide

A practical map from "the effect I want" to "the library that produces it," the
frameworks behind great sites, and the one sync gotcha that causes most
scroll-driven jank.

## Contents

- [The library-to-effect map](#the-library-to-effect-map)
- [Notes on the key choices](#notes-on-the-key-choices)
- [GSAP is now fully free](#gsap-is-now-fully-free)
- [Recent native CSS worth reaching for](#recent-native-css-worth-reaching-for)
- [Frameworks behind great sites](#frameworks-behind-great-sites)
- [The Lenis + GSAP single-rAF sync](#the-lenis--gsap-single-raf-sync)

---

## The library-to-effect map

| Need | Reach for | Free? |
|---|---|---|
| Animation engine (tweens, timelines, transforms, SVG, anything) | **GSAP** core | Yes, incl. commercial |
| Scroll-bound animation, pinning, scrub, horizontal scroll | **GSAP ScrollTrigger** | Yes |
| Smooth-feel scroll + parallax (`data-speed`) | **GSAP ScrollSmoother** | Yes (was Club-only) |
| Shared-element / FLIP layout transitions | **GSAP Flip** or **View Transitions API** | Yes / native |
| Kinetic type, split-text reveals | **GSAP SplitText** (or **Splitting.js**) | Yes (was Club-only) |
| Unified wheel/touch/pointer gestures, scrollbar-less decks | **GSAP Observer** | Yes |
| Morph SVG path, draw stroke, move along path | **GSAP MorphSVG / DrawSVG / MotionPath** | Yes (were Club-only) |
| Smooth/inertial scroll + the sync hub | **Lenis** | Yes |
| Declarative React animation, gestures, springs, layout | **Motion** (ex Framer Motion) | Yes |
| Page/route transitions, shared-element morph | **View Transitions API** (Barba.js/Swup for legacy MPA) | Native / yes |
| The WebGL/3D itself | **Three.js / R3F + drei / OGL** | Yes |
| No-code 3D authoring | **Spline** (export to R3F) | Freemium |
| Interactive vector mascots/UI | **Rive** (over Lottie) | Runtime free |
| Bloom, chromatic aberration, AO | **pmndrs postprocessing** | Yes |
| 2D physics (falling letters, draggable/colliding UI) | **Matter.js** | Yes |
| Cinematic keyframed camera/scene choreography | **Theatre.js** | Yes |
| Simple reveal/parallax/progress with no JS | **CSS `animation-timeline`** | Native |
| Carousels/sliders | **Embla** (minimal, a11y) / **Swiper** / **Splide** | Yes |

---

## Notes on the key choices

**GSAP vs Motion.** GSAP is the framework-agnostic backbone of most award motion
(precise timelines, the richest plugin set). Motion is the React-native
alternative: it runs on the Web Animations API + ScrollTimeline natively
(off-main-thread, up to 120fps) and falls back to JS only for spring physics,
interruptible keyframes, or gesture tracking. Pick by stack. For shared-element
transitions: **GSAP Flip `data-flip-id`** (framework-agnostic) vs **Motion
`layoutId`** (React).

**Lenis vs Locomotive.** Lenis is the de-facto smooth-scroll of the current era:
one rAF loop, preserves Cmd+F and keyboard nav, drives WebGL scroll scenes and
ScrollTrigger off a single loop. Locomotive v5 now sits on Lenis; Lenis has
largely displaced it.

**View Transitions API vs Barba/Swup.** The native API does same-document (SPA)
and cross-document (MPA) transitions including shared-element morphs with far less
code, and is steadily replacing Barba.js/Swup. Same-document is broadly supported;
cross-document is newer. Progressive-enhance: native where supported, library
fallback elsewhere. Astro wires it in via `<ClientRouter>`.

**Three.js vs R3F vs OGL.** Three.js is the workhorse engine. R3F + drei is
dominant in React/Next (drei gives `<MeshTransmissionMaterial>`, `<Environment>`,
`<Instances>`, `useFBO`, and more). OGL is ~10x smaller, the pick for
image-distortion / shader-plane work where Three.js is overkill, and better for
Core Web Vitals. See `webgl-3d-and-generative.md`.

**Spline vs hand-built.** Spline is designer-friendly no-code 3D, good for small
hero objects; perf degrades on complex scenes. Export to R3F to regain shader
control.

**Rive vs Lottie.** Rive renders via Canvas/WebGL through a WASM runtime, bypasses
the browser layout engine (~60fps), files are often 10-15x smaller than equivalent
Lottie, and it has a built-in **state machine** for true interactivity. The modern
pick for interactive characters/mascots/UI motion. Lottie is fine for non-interactive
icon/illustration playback but plays slower, ships large JSON, and needs hand-coded
interactivity.

**CSS animation-timeline.** `animation-timeline: scroll()` / `view()` runs
scroll-bound animation off the main thread with zero JS (Chromium 115+, Safari 18,
Firefox behind a flag). For many reveal/parallax effects this now replaces
ScrollTrigger and is inherently smoother. Progressive-enhance with a JS fallback.

**Matter.js / Theatre.js.** Matter.js for 2D rigid-body physics (falling-letter
heroes, draggable colliding UI). Theatre.js for choreographed, keyframed camera or
scene sequences (a studio UI to author cinematic timelines) rather than simple
lerps.

---

## GSAP is now fully free

**GSAP is 100% free for everyone, including commercial use, since April 30 2025**,
following Webflow's acquisition of GreenSock. All formerly paid Club GSAP plugins
are now free: **SplitText, MorphSVG, DrawSVG, ScrollSmoother** (ScrollTrigger was
always free), **Inertia, GSDevTools, MotionPath, ScrambleText, Physics2D**. This
removes the single biggest historic cost barrier to award-tier motion, and removes
the old reason to hand-roll split-text or FLIP.

SplitText was rewritten in 2025 (~7kb, 14 new features). The ones that delete
boilerplate: `mask: "lines"` (auto-wraps each unit in `overflow:clip` for
reveal-from-mask), `autoSplit: true` (re-splits on `document.fonts` load and on
resize via ResizeObserver, fixing the "split before the webfont loaded" bug),
`onSplit(self)` (your reveal survives responsive re-splitting), and built-in a11y
(`aria-label` on the container, `aria-hidden` on generated spans).

---

## Recent native CSS worth reaching for

Several effects that used to need JS or extra DOM are now native CSS. Lean on these
first (less code, off-main-thread, fewer dependencies), then progressive-enhance for
browsers that lack them. They are also distinctive: most generated output never uses
them, so they read as authored.

- **`corner-shape`** (with `border-radius`): non-round corners natively, `bevel`,
  `scoop`, `notch`, and superellipse `squircle`. Ticket-stub cards, angled tabs,
  Apple-style squircles without an SVG mask. Newer Chromium; enhance over plain
  radius.
- **Gap decorations** (`column-rule` / `row-rule` extended to flex and grid gaps,
  the CSS Gaps module, Chrome 149+): draw divider rules inside grid/flex gutters with
  no extra elements. Editorial column rules and bento dividers for free.
- **Anchor positioning** (`anchor-name`, `position-anchor`, `position-area`,
  `@position-try`): tether tooltips, menus, and popovers to an anchor in pure CSS,
  no JS positioning library, and it flips automatically when it would overflow.
  Pairs with the top-layer `popover` attribute. Shipped in Chromium; enhancing.
- **`shape-outside` with `shape()` / `path()` / `xywh()` / `rect()`**: wrap text
  around real curves and arbitrary shapes, the fastest way to make a layout stop
  looking like stacked boxes. Pair with `clip-path` for matching cut images.
- **CSS-only charts**: `conic-gradient` plus `@property`-typed custom properties give
  animatable, semantic pie/donut/gauge visuals with zero JS. Right for small data
  flourishes; reach for a lib only at real complexity.
- **Native text reveals**: animate `letter-spacing` or `clip-path` for headline
  reveals, and style `::first-line` / `::first-letter` (and the proposed
  `::first-word`) for editorial drop-caps and lead-ins without wrapping every word in
  a span.
- **`image-rendering: crisp-edges`** (now broadly baseline): keep pixel art, QR
  codes, and tiny icons sharp when scaled instead of letting the browser blur them.

---

## Frameworks behind great sites

- **Next.js** - dominant for React/R3F sites. SSR/SSG the above-the-fold content
  for LCP; dynamic-import the WebGL bundle so it never blocks first paint.
- **Nuxt** - the Vue equivalent; common in European agency work.
- **Astro** - content-heavy, islands architecture: ship near-zero JS, then hydrate
  only interactive islands. Built-in View Transitions wiring (`<ClientRouter>`).
  Great for keeping Core Web Vitals green while adding spot effects.
- **SvelteKit** - lean output, growing share among indie/award devs.
- **Plain Vite** - for fully bespoke, framework-light experiences (a single canvas
  app).
- **Webflow + headless CMS** - the agency production reality: Webflow for
  structure/CMS plus custom GSAP/WebGL embeds. The Webflow-GSAP acquisition makes
  this combo first-class.

---

## The Lenis + GSAP single-rAF sync

The most common cause of janky scroll-driven animation is **two rAF loops**:
Lenis updating scroll on its loop while ScrollTrigger reads the old value on
GSAP's tick (a 1-2 frame lag, so HTML and WebGL drift apart). The fix every pro
repo uses is to run everything on **one loop**:

```js
const lenis = new Lenis({ autoRaf: false });    // 1. don't let Lenis run its own loop

lenis.on('scroll', ScrollTrigger.update);        // 2. update ScrollTrigger on scroll

gsap.ticker.add((time) => lenis.raf(time * 1000)); // 3. GSAP ticks in seconds, Lenis raf wants ms

gsap.ticker.lagSmoothing(0);                      // 4. no lag smoothing
```

Now Lenis, ScrollTrigger, and any WebGL scroll scene advance on the **same
frame**. Drive WebGL plane positions from the same interpolated Lenis value you
give the DOM (the `uProgress` contract) or canvas and HTML still drift even with
the loops synced.
