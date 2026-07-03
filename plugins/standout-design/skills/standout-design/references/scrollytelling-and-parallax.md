# Scrollytelling and parallax: scroll as a storytelling axis

Scroll effects separate standout sites from competent ones, and they are also
where most sites tip into gimmick. This guide is the craft line between the
two. It extends `motion-and-interaction.md`; read that first for easing
tokens, reveal choreography, and the general motion budget.

## The two honest jobs (decide which one you are doing)

Scroll effects have exactly two legitimate modes. Everything between them is
where gimmick lives.

**Mode A: ambient depth.** Small parallax offsets on hero imagery, decorative
shapes, section backgrounds. Purpose: material richness. Rules: subtle
multipliers, no parallax on body text, no pinning, degrades to static with
zero content loss.

**Mode B: the scroll IS the story's timeline.** Justified only when scroll
maps to a NAMEABLE axis:
- **time** (a day unfolding, a timeline, a history),
- **space** (a camera traveling a world, a map expanding, a descent),
- **scale** (zooming from city to machine to cell),
- **process** (a thing assembling step by step),
- **transformation** (before to after).
The test: say out loud "as you scroll, you are moving through ___". If you
cannot fill the blank, use Mode A or nothing. The scroll mechanic should
RHYME with the content: the map grows as the scope grows, the page descends
as the story goes underwater, the day clock advances as the price curve
moves.

## The technique taxonomy

1. **Multi-layer depth parallax:** 2-4 layers translating at different
   fractions of scroll. Snippet: `assets/snippets/parallax-layers.css`.
2. **Pointer/gyro parallax:** depth responds to cursor or device tilt, not
   scroll (the classic parallax.js move). For heroes and playful scenes;
   invites play, carries no narrative.
3. **Scroll-scrubbed image sequence:** pre-extracted frames drawn to canvas,
   scroll maps to frame index, section pinned while the sequence plays (the
   Apple product-page move). Pre-decode frames to bitmaps; do not scrub
   `<video>.currentTime` (keyframe seeking stutters). Cap sequences around
   100-150 frames.
4. **Pinned section with internal timeline:** the section holds while scroll
   progress drives an internal animation (GSAP ScrollTrigger `pin` +
   `scrub`). The workhorse of product scrollytelling.
5. **Horizontal scroll section:** a pinned container whose track translates
   on x as the user scrolls vertically (ScrollTrigger `containerAnimation`
   for children). CSS-only alternative: real horizontal overflow with
   `scroll-snap-type: x` (better accessibility, it is real scrolling).
6. **Scroll-linked 3D camera:** Three.js/R3F camera along a path (drei
   `ScrollControls`, Theatre.js). Highest ceiling, highest cost; centerpiece
   experiences only.
7. **Sticky stacking cards:** each card `position: sticky`; the next covers
   the last. The best wow-per-byte pattern and mobile-safe. Snippet:
   `assets/snippets/sticky-stack.css`.
8. **Reveal choreography:** enter-viewport fades/slides (see
   `motion-and-interaction.md` and `scroll-reveal.css`).
9. **CSS scroll-driven animations:** `animation-timeline: scroll()` (scroll
   progress) and `view()` (element's journey through the viewport) plus
   `animation-range`. Zero JS, runs on the compositor, immune to main-thread
   jank.
10. **Lenis smooth scroll:** lerp-based smoothing for the expensive inertial
    feel. Keep lerp subtle (~0.1), keep native touch scrolling, and run its
    raf on GSAP's ticker so ScrollTrigger never disagrees about position
    (see `lenis-gsap-sync.js`).
11. **Snap scrolling:** CSS scroll-snap for sectioned presentations; prefer
    `proximity` over `mandatory` when section heights vary.

## Craft numbers (the difference between depth and nausea)

- **Three layers** is the standard convincing setup: background 0.2-0.4x of
  scroll, midground 0.6-0.8x, content 1x, optional foreground accent
  slightly above 1x used sparingly. More than 4 layers adds cost, not depth.
- **Text always moves at 1x or not at all.** Differential movement between
  text and its background kills legibility; parallax is for imagery and
  decoration.
- **One set piece per page.** A single excellent pinned sequence beats five
  mediocre ones; wall-to-wall effects exhaust readers. Alternate set pieces
  with plain scrolling prose.
- The best parallax is felt, not noticed: if a first-time visitor's
  attention goes to the effect instead of the content, the delta is too big.

## Scroll-jacking limits (hard rules)

- Never alter scroll speed or direction for primary content; users read it
  as broken.
- If pinning, keep sequences short and purposeful, put them below the fold,
  and interleave with normal scrolling.
- No text the user must READ inside a jacked sequence.
- Provide scroll cues so snap/full-screen sections do not fake completeness.
- Avoid pinned/jacked sequences on mobile entirely.

## Mobile and touch

The mobile-safe subset: sticky stacks, snap scrolling, `view()`-timeline
fades. Disable or radically simplify multi-layer parallax and pinned
sequences under a touch/width media query. Never `background-attachment:
fixed` (broken on iOS). Gyro parallax needs a permission prompt on iOS;
treat it as an enhancement only.

## Performance

- Animate `transform` and `opacity` only; never top/left/height/box-shadow
  on scroll.
- Never do work in raw scroll listeners: read once per rAF, mark listeners
  `{ passive: true }`.
- Gate scroll-linked work with IntersectionObserver; disconnect offscreen.
- `will-change: transform` on parallax layers, sparingly, removed after use.
- Prefer compositor-path CSS scroll-driven animations wherever the effect
  allows; they keep running when the main thread stalls.

## Reduced motion (non-negotiable)

Scroll-linked translation, scale, and pinning trigger vestibular disorders.
Under `prefers-reduced-motion: reduce`: zero out translations/scales/pinning,
keep opacity-only fades if desired, and show all content statically. Every
scroll snippet in this skill ships that fallback; keep it when adapting.

## Tool choice (2026)

| Tool | Choose when |
|---|---|
| CSS scroll-driven animations | Reveals, progress bars, simple parallax, stacking-card effects. Chrome/Edge since 2023-24, Safari 26 shipped it; still write as progressive enhancement (page fine with the animation absent). Declare `animation-timeline` AFTER the `animation` shorthand or it resets. |
| GSAP ScrollTrigger (+ Lenis) | Pinning, scrubbed timelines, horizontal sections, image sequences, callback orchestration. Fully free. `scrub: 1` for smoothed catch-up. |
| Motion for React `useScroll` + `useTransform` (+ `useSpring`) | React apps where scroll logic lives in components. MotionValues avoid re-renders; small ranges = deep layers. Less suited to multi-section pinned choreography than ScrollTrigger. |
| IntersectionObserver + class toggles | Simple enter-viewport reveals with the broadest support. The boring, correct default. |
| R3F ScrollControls / Theatre.js | Scroll-driven 3D camera narratives. Reserve for the centerpiece. |

Heuristic: start at the simplest tier that expresses the idea; graduate only
when you need scrubbing, pinning, or callbacks.

## Worked pattern: the scrollytelling world

The strongest Mode B pages build ONE persistent scene and drive a camera
through it, rather than stacking disconnected sections (full teardown:
`signature-builds.md`, "the scrollytelling world"). The reusable skeleton:

1. A persistent illustrated/3D scene fills the viewport; the page's scroll
   height (20-30 viewports) is the story's runtime.
2. Scroll drives BOTH the camera (through space or scale levels) and a
   domain variable (time of day, price, progress) shown in a fixed HUD
   widget: the scroll scrubs the axis you named.
3. Narrative beats arrive as alternating cards in a fixed slot (problem
   card, solution card), while the scene reconfigures behind them.
4. State changes are shown in a color legend that IS the product story
   (charging yellow vs discharging red), not decoration.
5. Chapters swap the full background color to reset attention, then the
   finale exits the scene into a plain, high-contrast stats section: the
   contrast between world and plainness is itself the landing.
