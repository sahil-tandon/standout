# Motion and Interaction

Motion is where a competent site becomes a memorable one. The difference is almost
never "more animation." It is one orchestrated moment executed with the right curve,
synced to a single clock, and gated behind reduced-motion. Reach for native CSS
first, add a JS engine only where native cannot reach, and reuse one easing token so
the whole interface shares a personality.

## Contents

- [The motion contract](#the-motion-contract)
- [Native scroll-driven animation (the baseline)](#native-scroll-driven-animation-the-baseline)
- [Smooth scroll: Lenis on one rAF loop](#smooth-scroll-lenis-on-one-raf-loop)
- [Page and view transitions](#page-and-view-transitions)
- [The signature load reveal](#the-signature-load-reveal)
- [Easing language: one reused token](#easing-language-one-reused-token)
- [CSS linear() springs](#css-linear-springs)
- [Cursor, followers, magnetic elements](#cursor-followers-magnetic-elements)
- [Image reveals](#image-reveals)
- [2.5D depth and parallax](#25d-depth-and-parallax)
- [Velocity-aware motion](#velocity-aware-motion)
- [Cinematic scroll-scrub image sequences](#cinematic-scroll-scrub-image-sequences)
- [Rive vs Lottie: the interactive-vector layer](#rive-vs-lottie-the-interactive-vector-layer)
- [SVG craft: draw, morph, motion path](#svg-craft-draw-morph-motion-path)
- [Kinetic type: scramble and variable-axis](#kinetic-type-scramble-and-variable-axis)
- [Shared-element and layout transitions](#shared-element-and-layout-transitions)
- [Decision cheatsheet](#decision-cheatsheet)

---

## The motion contract

Three rules hold for everything below.

1. **Animate only `transform` and `opacity`.** They skip layout and paint and run on
   the compositor (GPU). Animating `top`, `left`, `width`, or `height` thrashes
   layout and janks. Use `will-change: transform` to promote a layer, but sparingly:
   over-use wastes GPU memory.
2. **One clock.** Every animation system (smooth scroll, ScrollTrigger, a WebGL
   scene) must advance on the same `requestAnimationFrame` tick. Two rAF loops is the
   single most common cause of janky scroll motion (see the Lenis sync below).
3. **Gate motion behind reduced-motion.** Wrap decorative motion in
   `@media (prefers-reduced-motion: no-preference)` and check `matchMedia` in JS. On
   reduce: kill parallax and auto-motion, swap big transitions for instant or short
   cross-fades, freeze a WebGL scene on one static frame, show counters at their final
   value. Most decorative effects can simply be removed for this cohort.

---

## Native scroll-driven animation (the baseline)

CSS scroll-driven animations run **off the main thread with zero JS**, so they stay
smooth even under heavy load. Reach for these first; they replace ScrollTrigger for
most reveal, progress, and simple-parallax work. Support is ~85% (Chromium 115+,
Safari 18+), Firefox behind a flag, with a JS polyfill for the rest (the polyfill does
not support linked timelines).

Two timeline types:

- **`scroll()`** ties an animation to a scroll container's scroll position. Use for
  progress bars and scroll-linked transforms.
- **`view()`** ties an animation to an element's position within the viewport. Use for
  reveal-on-scroll, parallax, enter/exit.

**Scroll progress / reading indicator:**

```css
@keyframes grow { from { transform: scaleX(0); } }
.progress {
  position: fixed; inset: 0 0 auto 0; height: 4px; transform-origin: left;
  animation: grow linear;
  animation-timeline: scroll(root block);  /* scroller, axis */
}
```

**Reveal-on-scroll as an element enters the viewport.** Critical rule: **never hide
content you cannot guarantee you can reveal.** Put the hidden start state ONLY inside an
`@supports (animation-timeline: view())` block, so a browser without scroll-driven
animation support (Firefox today, older Safari and Chromium) shows the content normally
instead of leaving it stuck at `opacity: 0`. The same applies to JS reveals: hide via a
class that JS adds (`.js .reveal`), so a no-JS load or a failed script stays visible.

```css
/* Default: fully visible. This is what unsupported browsers and no-JS users get. */
.item { opacity: 1; }

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    @keyframes reveal { from { opacity: 0; transform: translateY(40px); } }
    .item {
      animation: reveal linear both;      /* `both` so start styles apply in range */
      animation-timeline: view();
      animation-range: entry 0% cover 40%;
    }
  }
}
```

Range keywords: `cover` (default, full journey through the viewport), `contain` (only
while fully visible), `entry`, `exit`, `entry-crossing`, `exit-crossing`. Format is
`<range-name> <offset%>`. This double guard (supports + reduced-motion) is the standard
pattern: visible by default, animated only where the technique is both supported and
wanted. A page whose content is invisible without a feature or without JS is broken, not
standout.

**Animate one element off another's position** (the "track X, animate Y" trick) needs
`timeline-scope` on a shared ancestor:

```css
main      { timeline-scope: --hero; }
.hero     { view-timeline: --hero; }
.indicator{
  animation: fadeIn both, fadeOut both;
  animation-timeline: --hero, --hero;
  animation-range: entry, exit;
}
```

Gotchas: always set `animation-fill-mode` (`both` / `backwards` / `forwards`) or start
styles will not apply before the range begins. Omit the duration (or use `auto`). The
timeline drives progress, not a clock.

---

## Smooth scroll: Lenis on one rAF loop

Lenis is the default smooth-scroll engine on agency-tier sites. Crucially it is built
on `scrollTo`, **not transforms**, so native scroll APIs, anchor links, find-in-page,
and accessibility stay intact (the key advantage over old transform-based smooth
scroll).

```js
import Lenis from 'lenis';
const lenis = new Lenis({
  lerp: 0.1,        // interpolation 0..1 (lower = smoother/slower)
  duration: 1.2,    // scroll animation seconds
  smoothWheel: true,
});
```

**The sync detail everyone gets wrong.** If Lenis updates scroll on its own loop while
ScrollTrigger reads the old value on GSAP's tick, you get a 1-2 frame lag and visible
jank. Drive everything from one loop instead:

```js
// Do NOT let Lenis run its own rAF; give it GSAP's clock.
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000)); // GSAP ticks in seconds; Lenis wants ms
gsap.ticker.lagSmoothing(0);
```

Now Lenis, ScrollTrigger, and any WebGL scroll scene advance on the **same frame**. Any
WebGL plane positions must be driven from the same interpolated scroll value you give
the DOM, or canvas and HTML drift apart.

---

## Page and view transitions

Prefer the native **View Transitions API** (~85% support; same-document is baseline in
Chrome/Edge/Safari and Firefox 144+, cross-document in Chrome/Edge 126+ and Safari
18.2+). It is the native replacement for FLIP cross-fades and shared-element morphs,
with far less code.

Same-document: wrap the DOM change and the browser snapshots old and new into
`::view-transition-old/new` pseudo-elements and cross-fades:

```js
document.startViewTransition(() => updateDOM());
```

For a **shared-element / morph** transition, give the element the same
`view-transition-name` before and after; the browser morphs its position and size.
Cross-document (MPA) transitions enable with `@view-transition { navigation: auto; }`.

```css
::view-transition-old(root),
::view-transition-new(root) { animation-duration: 0.4s; }
.hero-img { view-transition-name: hero; } /* morphs across navigation */
```

Use **Barba.js** only where you need full control over enter/leave hooks, custom
curtain transitions, or persistent elements across MPA navigations without native VT
support. A **curtain / cover** transition is trivial either way: an overlay panel
animates in (`clip-path` or `transform: scaleY`) to cover the screen, the route swaps
behind it, the panel animates out.

---

## The signature load reveal

The hero entrance that defines high-end feel: split the headline into lines/words/
chars and stagger them up from behind a mask, orchestrated on one timeline.

```js
const split = SplitText.create(".headline", { type: "lines,words", mask: "lines" });
gsap.from(split.words, {
  yPercent: 120, opacity: 0, duration: 0.9,
  ease: "expo.out", stagger: 0.04,
});
```

`mask: "lines"` (GSAP SplitText, free since GSAP 3.13) auto-wraps each line in an
`overflow:clip` clip so words rise out of nothing, with no manual nesting. Set
`autoSplit: true` to re-split on `document.fonts` loading and on resize (fixes the
classic "split happened before the webfont loaded" bug), and `onSplit` to recreate the
reveal on each re-split. SplitText adds `aria-label` to the container and `aria-hidden`
to generated spans, so screen readers still read the original string.

**Orchestrate the whole load reveal on one timeline** (logo, nav, hero, CTA) with
offset start times via position parameters, so it reads as a single choreographed
moment, not parallel fades:

```js
const tl = gsap.timeline();
tl.from(logo, { autoAlpha: 0, y: 20 })
  .from(split.words, { yPercent: 120, opacity: 0, stagger: 0.04 }, '<') // start WITH previous
  .from(cta, { autoAlpha: 0, y: 12 }, '-=0.3')                          // overlap 0.3s
  .from(nav, { autoAlpha: 0 }, '+=0.2');                                 // gap 0.2s
```

Position-param grammar: `<` / `>` (start/end of previous), `-=` / `+=` (relative
overlap/gap), labels, and nested timelines are how you compose multi-scene
choreography without manual delay math.

**Tie the load reveal into a preloader as one continuous gesture:** a counter hits 100,
a mask wipes, and the hero is already in motion underneath. See
`references/narrative-and-detail.md` for honest-progress preloaders.

---

## Easing language: one reused token

The difference between generic and award-tier motion is usually the curve. Author one
expressive ease and reuse it site-wide as the motion accent.

- **GSAP**: `expo.out` and `power4.out` give the fast-start, long-luxurious-settle that
  defines high-end feel. `elastic.out(1, 0.3)` for magnetic snap, `back.out` for a
  small overshoot.
- **CSS cubic-bezier**: the canonical "expo out" is
  `cubic-bezier(0.16, 1, 0.3, 1)`; a strong "power" ease-out is
  `cubic-bezier(0.22, 1, 0.36, 1)`. Author once, reuse via a custom property:

```css
:root { --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1); }
.btn { transition: transform 0.4s var(--ease-out-expo); }
```

Scale duration with the size of the change: a bigger distance or scale gets a longer
duration. Keep micro-interactions sub-200ms and ease-out.

**Spring physics** (Motion / Framer) feel alive and gesture-driven: lower `damping` =
more bounce, higher `mass` = heavier and slower. Use springs for interactive,
gesture-driven motion; use expo/power beziers for scripted scroll reveals. Spring-
derived `linear()` timing applied to *scroll*-driven animation feels wrong (the motion
oscillates with scroll position), so keep scroll eases simple.

The personality of expressive motion is the 12-principles trio applied digitally: a
small **anticipation** (pull back before moving), an **overshoot** past the target,
then a **settle**. `back.out` / `elastic.out` and spring physics encode this for free.
Restraint is the craft signal: sequence the beats so they read as intentional, not busy.

---

## CSS linear() springs

`linear()` interpolates straight lines between sampled points, so you can bake a real
spring equation into pure CSS (values above 1 are the overshoot). Baseline across major
browsers since Dec 2023, ~88% support.

```css
.block {
  /* spring approximation; overshoot at 1.02 */
  transition: transform 500ms linear(0, .25, .5, .88, 1.02, .98, 1);
}
:root {
  --spring: cubic-bezier(.2, 0, 0, 1);                         /* fallback */
  @supports (animation-timing-function: linear(0, 1)) {
    --spring: linear(0, .25, .5, .88, 1.02, .98, 1);
  }
}
```

Generate the string with jakearchibald's linear-easing-generator (feed stiffness/
damping/mass; three springs gzip to ~1.3 KB). Three tradeoffs vs JS springs, so this is
not a full replacement: (1) CSS demands an explicit **fixed duration** a real spring
does not have; (2) **bad interruption**: on interrupt CSS applies a reversing-shortening
speed-up that destroys the spring feel; (3) it is **not velocity-aware**, so it cannot
carry incoming gesture velocity into the curve. JS springs (Motion `useSpring`) stay
velocity-aware and inertial through interrupts.

---

## Cursor, followers, magnetic elements

**Custom cursor + lagging follower.** GSAP `quickTo` gives near-zero per-frame
overhead, ideal for `mousemove`. The duration difference is what makes the follower
trail the cursor:

```js
const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" });
const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" });
const fxTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" }); // lags
const fyTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });
addEventListener("mousemove", e => { xTo(e.x); yTo(e.y); fxTo(e.x); fyTo(e.y); });
```

**Magnetic button.** Pull the element toward the cursor when hovering near it. The math
is `offset = cursor - element center`, scaled by a strength factor:

```js
const xTo = gsap.quickTo(el, "x", { duration: 1, ease: "elastic.out(1,0.3)" });
const yTo = gsap.quickTo(el, "y", { duration: 1, ease: "elastic.out(1,0.3)" });
el.addEventListener("mousemove", e => {
  const r = el.getBoundingClientRect();
  xTo((e.clientX - (r.left + r.width / 2)) * 0.4);  // 0.4 = strength
  yTo((e.clientY - (r.top  + r.height / 2)) * 0.4);
});
el.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
```

Keep displacement small (a few px to ~0.3-0.4x distance) and the spring snappy. In
React, the declarative equivalent is a Motion spring on state:
`transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}`.

Cursor as part of the UI language: turn the cursor into a context label ("VIEW",
"DRAG", "PLAY") over interactive elements, or a magnetic dot + ring. Always provide a
non-hover path: hover-only reveals fail on touch and keyboard.

---

## Image reveals

**Clip-path / mask wipe** (CSS or GSAP). Animate `clip-path: inset(0 100% 0 0)` to
`inset(0)` to wipe an image in; scrub it on scroll with GSAP for a scroll-linked
reveal. The "line emerges from nothing" text reveal is the same idea: a clipping
wrapper with `overflow:hidden` and the inner line translating up from `100%`.

```css
@keyframes wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0); } }
```

**WebGL distortion / pixelation / melt** is the "expensive" tier: a fragment shader
samples the image and warps UVs, lerping a `uProgress` uniform 0 to 1. Pixelate UVs
(floor to a grid) and `step()` them against noise so the image resolves block-by-block
rather than a linear wipe, optionally with chromatic aberration. Drive `uProgress` from
the same smooth-scroll value as the DOM. Full shader patterns live in
`references/webgl-3d-and-generative.md`.

---

## 2.5D depth and parallax

Depth without a full 3D engine comes from layering planes and moving them at different
rates.

- **CSS-only**: `animation-timeline: view()` driving `translateY` at a fraction of
  scroll, or `transform: translateZ()` + `perspective` on a scroll container.
  Compositor-friendly.
- **GSAP**: `gsap.to(layer, { yPercent: -30, ease: "none", scrollTrigger: { scrub: true } })`
  per depth layer; or ScrollSmoother's `data-speed` attribute per element.
- **Atmospheric depth**: layer planes at different z with parallax plus a depth-of-field
  blur on the far layers so the foreground stays crisp. This is the cheapest route to a
  "dimensional" hero.

Keep the parallax subtle. Large parallax offsets read as gimmick and break on small
screens; a few percent of travel is usually enough.

---

## Velocity-aware motion

Sampling scroll velocity and feeding it into a transform gives the "liquid" lag feel
that signals craft. Read `self.getVelocity()` from ScrollTrigger (or drag velocity from
Observer), clamp it, and apply it as a skew or scale:

```js
let proxy = { skew: 0 };
const clamp = gsap.utils.clamp(-20, 20);
ScrollTrigger.create({
  onUpdate: self => {
    const v = clamp(self.getVelocity() / -300);   // velocity -> degrees
    if (Math.abs(v) > Math.abs(proxy.skew)) {
      proxy.skew = v;
      gsap.to('.media', { skewY: v, ease: 'power3', duration: 0.8,
        onUpdate: () => gsap.set('.media', { skewY: proxy.skew }) });
    }
  },
});
```

The same idea drives **velocity-reactive marquees**: an Observer + a looping timeline
whose `timeScale` tracks scroll velocity, so the strip speeds up while scrolling and
eases back when it stops. For flick / throw / glide-to-stop on draggable elements, use
GSAP InertiaPlugin (`inertia: { x: { velocity: 'auto', end: [0,100,200] } }`), calling
`InertiaPlugin.track(el, 'x,y')` ~0.5s before the throw so it has velocity to honor.

---

## Cinematic scroll-scrub image sequences

The "Apple product page" effect: pre-rendered frames drawn to a `<canvas>`, with scroll
progress mapped to a frame index. Use an **image sequence on canvas** for guaranteed
cross-device smoothness and exact frame control; avoid scrubbing a `<video>` via
`currentTime` (it stutters on mobile, has autoplay/seek limits, and snaps to keyframes).

The production recipe:

- Extract frames with **FFmpeg** at 30fps; convert **PNG to WebP at quality 80** to
  shrink payload. Use per-breakpoint frame counts (e.g. desktop ~1180, mobile ~880).
- **Stage the preload**: load the first ~10 frames and render frame 0 immediately, then
  background-load the rest via a parallel queue, **directionally prefetching** ~5 frames
  ahead in the scroll direction.
- Draw to canvas (instant paint, no reflow), handling DPR and object-fit math:

```js
const dpr = window.devicePixelRatio || 1;
const adjusted = Math.min(1, currentScroll / (totalHeight - offsetEnd));
const frame = Math.round(adjusted * totalFrames);
ctx.drawImage(images[frame], offsetX, offsetY, drawWidth / dpr, drawHeight / dpr);
```

Drive the index with GSAP ScrollTrigger, ending the range before the pin releases. On a
slow connection, serve a single fallback still and upgrade to the full sequence only
when bandwidth allows. If frames need shader effects layered on top, do it in WebGL
instead of flat canvas playback.

**Scrub a vector loop for a cheap "3D" object.** When the hero is a clean form (a
rotating wireframe, an exploding diagram, a turntable of a product), you often do not
need WebGL or a heavy image sequence: pre-render the rotation once (After Effects, or a
Blender turntable) and export it to **Lottie**, then drive the player's frame from scroll
progress instead of letting it autoplay. A `lottie-web`/`bodymovin` instance with
`anim.goToAndStop(progress * anim.totalFrames, true)` wired to a ScrollTrigger `scrub`
gives a buttery, resolution-independent "3D" object for a fraction of the payload and
zero shader code. This is how many no-code/award agency sites fake an immersive 3D hero.
Force the Canvas renderer for large loops, and ship `.lottie` not raw `.json`.

---

## Rive vs Lottie: the interactive-vector layer

The key distinction: **Lottie plays a timeline; Rive runs a state machine.** Lottie is
a movie file. Rive is closer to a micro-application of logic and motion in one file,
behaving more like a game engine. Reach for Rive when a vector element must *react*
(mascots, cursors, toggles, loaders that know their state); reach for Lottie when
something just needs to *play* (a hero loop, a success checkmark).

| Need | Use | Why |
|------|-----|-----|
| Play-only loop, icon, illustration; After Effects pipeline exists | **dotLottie** | Designer authors in AE, widest reach, no logic to wire |
| Element reacts to hover/click/drag/cursor/app state | **Rive** | State machines + listeners + inputs; no per-state code |
| Property bound to live data (number/string/bool/color) | **Rive** | Data Binding view models update the visual reactively |
| Many animated elements at once (dashboard microinteractions) | **Rive** | ~60fps vs Lottie's ~17fps in many-icon benchmarks; lighter runtime |

A `.riv` binary is typically 10-15x smaller than the equivalent Lottie JSON. Ship
**dotLottie** (`.lottie`), not raw `.json`, for an ~80% size cut, and force the Canvas
renderer when several Lotties are visible at once (the default `lottie-web` SVG renderer
janks under load).

**Rive in React, cursor-reactive mascot** (state-machine numeric inputs map cursor
position into the blend):

```typescript
const { rive, setCanvasRef, setContainerRef } = useRive({
  src: 'hero.riv', autoplay: true,
  layout: new Layout({ fit: Fit.Cover, alignment: Alignment.Center }),
});
const numX = useStateMachineInput(rive, 'State Machine 1', 'Axis_X', 0);
const numY = useStateMachineInput(rive, 'State Machine 1', 'Axis_Y', 0);

useEffect(() => {
  if (!numX || !numY) return;
  const onMove = (e) => {
    numX.value = (e.clientX / innerWidth) * 100;
    numY.value = 100 - (e.clientY / innerHeight) * 100;
  };
  addEventListener('mousemove', onMove);
  return () => removeEventListener('mousemove', onMove); // avoid leak
}, [numX, numY]);
```

For value-driven UI, prefer **Data Binding** (View Models) over raw inputs: typed
property hooks with forward-slash nested paths
(`useViewModelInstanceNumber('apple/stockChange', vmi)`,
`useViewModelInstanceColor('rootColor', vmi)`), which lets one `.riv` act as a live,
data-driven widget. Perf: preload the WASM with
`<link rel="preload" href={riveWASMResource} as="fetch" crossorigin>`, call
`rive?.cleanup()` on unmount, and prefer the `@rive-app/react-webgl2` runtime when
stacking many artboards.

---

## SVG craft: draw, morph, motion path

- **Self-drawing line** (logos, illustrations): `stroke-dasharray` + `stroke-dashoffset`
  animated from full path length to 0. GSAP **DrawSVGPlugin** abstracts it and adds a
  two-value position syntax: animating from `"50% 50%"` to `"0% 100%"` draws *outward
  from the middle*. Use `stroke-linecap="round"` for clean reveals.
- **Shape morph** between paths with different point counts (impossible in plain CSS):
  GSAP **MorphSVG** resamples and interpolates. Do not run MorphSVG and DrawSVG on the
  same element (they fight over `stroke-dasharray`); animate on separate elements or
  sequence them.
- **Object along a path**: GSAP **MotionPath** with `align` + `alignOrigin` to snap the
  element onto the path and `autoRotate: true` to face the direction of travel (the key
  for arrows, planes, comets).

```js
gsap.to('#rocket', { duration: 5, ease: 'power1.inOut',
  motionPath: { path: '#flightPath', align: '#flightPath',
                alignOrigin: [0.5, 0.5], autoRotate: true } });
```

An animated logo in practice = DrawSVG to "write" the mark + MorphSVG to transform it +
animated gradient/filter stops for sheen, sequenced on one GSAP timeline. All GSAP
plugins are free as of April 2025.

---

## Kinetic type: scramble and variable-axis

**Text scramble / decode.** Each character position is queued with `{ from, to, start,
end }` frame numbers; during its window it flashes random charset glyphs, then locks to
the final glyph. Randomize per-character start/end so the decode looks organic rather
than uniform, driven by `requestAnimationFrame`. GSAP **ScrambleTextPlugin** is the
off-the-shelf version: `scrambleText: { text, chars, speed }`.

**Variable-font axis animation.** `font-variation-settings` is fully animatable; tween
`wght`, `wdth`, `slnt`, or `opsz` on hover, keyframes, or a scroll-driven timeline.
Weight transitions run on the compositor at 60fps:

```css
.headline { font-variation-settings: 'wght' 200, 'wdth' 75; transition: font-variation-settings .4s; }
.headline:hover { font-variation-settings: 'wght' 900, 'wdth' 125; }

@supports (animation-timeline: scroll()) {
  .headline { animation: weigh linear both; animation-timeline: scroll(); }
  @keyframes weigh { to { font-variation-settings: 'wght' 900; } }
}
```

Pair with Splitting.js to give each character a custom property for distance-based axis
waves, or map pointer distance / audio amplitude to `wght`/`opsz` for type that breathes
with input.

---

## Shared-element and layout transitions

Two engines, pick by stack:

- **GSAP Flip** (framework-agnostic). FLIP = First, Last, Invert, Play: capture the
  start rect, mutate the DOM to the end state, then animate the inverted delta to zero.
  Survives DOM moves between containers, which is the basis of shared-element morphs and
  list reorders.

```js
const state = Flip.getState('.card');   // First: capture rect(s)
container.appendChild(card);            // mutate DOM to the Last state
Flip.from(state, {
  duration: 0.6, ease: 'power2.inOut',
  absolute: true,   // take items out of flow so reflow doesn't fight the move
  scale: true,      // animate scale (GPU) instead of width/height (layout)
});
```

`data-flip-id` correlates elements across states for route-level shared-element
transitions; `Flip.batch()` coordinates many simultaneous FLIPs (a filterable grid) in
one pass; `Flip.fit(a, b, { scale: true })` snaps one element onto another's box (expand
thumbnail to hero).

- **Motion `layout` / `layoutId`** (React). `layout` animates any size/position change
  with one prop and corrects scale distortion so children do not stretch.
  `layoutId="hero"` matches two elements across components for a shared-element morph
  (tab underline, hero to detail); the engine snapshots the outgoing element and
  crossfades it against the live incoming one. `<AnimatePresence>` unlocks exit
  animations on unmount.

```jsx
{items.map(i => <motion.li key={i.id} layout />)}    // auto-animate reorder
{isOpen
  ? <motion.div layoutId="hero" />
  : <motion.img  layoutId="hero" />}                  // these two crossfade + morph
```

---

## Decision cheatsheet

| Goal | Reach for |
|------|-----------|
| Reveal-on-scroll, progress bar, simple parallax | CSS `animation-timeline: view()/scroll()` |
| Scrubbed pinned scenes, horizontal scroll, snap | GSAP ScrollTrigger |
| Smooth-scroll feel + sync everything on one loop | Lenis (drive ScrollTrigger off it) |
| Page/route transitions, shared-element morph | View Transitions API (Barba for legacy MPA) |
| Magnetic / custom cursor | GSAP `quickTo` (imperative) or Motion spring (declarative) |
| Hero load reveal, text stagger | GSAP SplitText (`mask:"lines"`) on one timeline |
| Interactive mascot / reactive vector UI | Rive state machine + inputs / data binding |
| Play-only icon or illustration loop | dotLottie (`.lottie`, Canvas renderer) |
| Cinematic scroll scrub | Canvas image sequence + ScrollTrigger, staged preload |
| Self-drawing line / shape morph / path follow | GSAP DrawSVG / MorphSVG / MotionPath |
| CSS spring/bounce without JS | `linear()` + generator |
| Velocity skew/scale, flick/throw | ScrollTrigger `getVelocity()` / InertiaPlugin |
| Shared-element / list reorder | Motion `layout`/`layoutId` or GSAP Flip |
| Decode/scramble text, variable-axis motion | ScrambleText / `font-variation-settings` |
| Luxurious scripted easing token | `expo.out` / `cubic-bezier(0.16,1,0.3,1)` |

Always: gate motion behind `prefers-reduced-motion`, animate `transform`/`opacity`
only, run everything on one rAF loop, and keep one easing token as the site's motion
accent.
