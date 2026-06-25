# Narrative and detail: the lasting impression

Spectacle without restraint reads as noise. The sites that win do expressive things on
top of a disciplined system, and they always hand control back to the user (skippable
intros, mute toggles, honest progress). Awe is engineered, not sprinkled. This guide
covers how to open a page (preloaders, the first-3-seconds hook), how to tell a story
(scrollytelling, sound), the micro-details that make a site feel made, and the discipline
underneath that keeps it all coherent.

## Contents

1. [Preloaders as art (drive with real progress)](#preloaders-as-art-drive-with-real-progress)
2. [The first-3-seconds hook](#the-first-3-seconds-hook)
3. [Scrollytelling: write the story first](#scrollytelling-write-the-story-first)
4. [Sound design (user control is non-negotiable)](#sound-design-user-control-is-non-negotiable)
5. [Detail craft](#detail-craft)
6. [The discipline underneath: spacing, type, motion tokens](#the-discipline-underneath-spacing-type-motion-tokens)

---

## Preloaders as art (drive with real progress)

A preloader is not a spinner. It is the brand's opening statement: the first thing the
visitor sees, and the moment that buys you the time WebGL, fonts, and heavy media need to
load. The craft move is to make the wait *feel like part of the show* rather than an
obstacle in front of it. Animated typography, countdowns, and simplified vector marks are
the common vocabulary.

**The honesty rule (this is where most loaders go wrong):**

- **Drive the number with real progress.** A real `progress` value (an asset loader, a
  GSAP timeline, a preload manager) should drive the count. Never use a fake progress bar
  driven by a timer. If users see it loop, stall, or jump, trust is broken. Bars that
  stall (especially near 90%) feel *slower*; bars that move at a steady or accelerating
  pace feel faster and more trustworthy.
- **If you cannot measure it, ease toward ~90% and snap to 100 only on the real ready
  event.** Never loop.
- **Feedback genuinely helps.** Waits *with* truthful feedback feel roughly 11 to 15%
  faster even when actual time is unchanged. The loader earns its place only when the
  feedback is honest.

**Resolve the loader into the hero, not into a cut.** The recurring award pattern is
"pre-loader plus reveal animation" as one continuous gesture: a counter hits 100, a mask
wipes, and the hero is already in motion underneath. The loader hands off; it does not
cut.

**Respect the user's time.** Cap perceived wait. If everything is already cached, do not
hold a 3-second intro hostage; let fast loads through. Make the loader skippable or at
least non-blocking for return visits, and reserve the most expensive version for first
visit.

---

## The first-3-seconds hook

The hero is where the first impression forms, and the working rule is that you have about
**3 seconds to hook** the visitor. High-signal intro techniques:

- **Mask reveals.** A shape (a circle, a logo, a word) used as a mask that grows or wipes
  to expose the hero behind it. A grid-of-circles mask growing to reveal a hidden SVG is
  a signature version.
- **Staggered headline assembly.** Character-by-character or line-by-line reveals
  (SplitText-style), staggered so the headline *assembles* rather than appears. Split the
  headline into lines or words and stagger them up from behind a clipping mask:

  ```js
  const split = SplitText.create(".headline", { type: "lines,words", mask: "lines" });
  gsap.from(split.words, {
    yPercent: 120, opacity: 0, duration: 0.9,
    ease: "expo.out", stagger: 0.04,
  });
  ```

  `mask: "lines"` (GSAP SplitText) auto-wraps each line in an `overflow:hidden` clip so
  words rise out of nothing, keeps the text accessible to screen readers, and re-splits
  responsively.
- **Scroll-triggered, geometric, particle, or WebGL entrances** for a dynamic,
  one-of-a-kind opening.

Craft notes:

- **Orchestrate the whole load reveal on one timeline.** Logo, nav, hero, and CTA on a
  single GSAP timeline with offset start times, so it reads as one choreographed moment,
  not parallel fades.
- **The intro resolves into the usable page**, it never blocks it.
- **Tie the intro's easing and duration to the same motion tokens** as the rest of the
  site (below), so the opening feels of-a-piece with everything that follows.
- **Respect `prefers-reduced-motion`:** ship a calm fallback (fade or instant) for that
  cohort.

---

## Scrollytelling: write the story first

Scrollytelling turns the scrollbar into a story controller. Like a comic or film, the
page is broken into scenes; the user's scroll triggers animations, text transitions, and
media. A script (GSAP ScrollTrigger or a native IntersectionObserver) tracks scroll
progress and scrubs through a timeline.

**The single biggest lesson: write the story before you design.** Define the narrative in
plain prose with zero visual thinking first. Identify the 3 to 4 steps of the journey,
where the tension sits, and what the reveal is. Only then choreograph it.

Pacing and chaptering techniques:

- **Scroll-scrubbing** ties animation progress to scroll position (not time), so the user
  controls the tempo. User-driven pacing creates emotional investment: people who control
  progression become participants, not observers.
- **Sticky text plus controlled scene shifts** deliberately slow the pace. Pin a panel,
  advance the visual underneath it, then release into the next chapter. Layered motion
  reveals a complex idea in a clear order without overwhelming.
- **Chaptering** gives the long page rhythm: distinct scenes with their own beat, with
  transitions (cross-fades, wipes, camera moves) marking the cuts.

**The persistent-object spine (the strongest version).** The most memorable
scrollytelling is not a sequence of separate scenes; it is *one object that carries the
whole story*. Pick a single form that embodies the idea (a wireframe shape whose
vertices are your services, a product that disassembles, a map that zooms) and make it
the hero, the navigation metaphor, and the section divider at once. As the user scrolls,
that one object rotates, morphs, and *gains structure*, stepping through the taxonomy one
node at a time while a matching legend highlights and a per-node detail panel swaps in.
Because the architecture is born from the artifact, the page cannot collapse into the
generic skeleton. Drive the rotation, the morph, and the panel swaps from one
interpolated scroll value so nothing drifts. The rotating "3D" object is often cheapest
as a pre-rendered vector loop scrubbed on scroll (see `motion-and-interaction.md`), not
WebGL. Worked end-to-end in `signature-builds.md`.

**Reference stack:** GSAP plus ScrollTrigger for the timeline, **Lenis** for
smooth/inertial scroll, optionally Three.js for 3D scenes, Framer Motion / Motion for
React-side scroll ties.

**Escape hatches and pitfalls.** Avoid scroll-jacking that fights the user's scroll
speed. Always give an escape hatch on long pieces. Do not let pinned scenes trap mobile
users. Provide a reduced-motion path and ensure all content is reachable without the
animation.

---

## Sound design (user control is non-negotiable)

Sound is the most polarizing layer of web craft. Done well it deepens immersion (ambient
beds, tactile hover/click ticks, a satisfying thunk on a CTA). Done wrong it is the
fastest way to get a tab muted or closed.

**The non-negotiable rule:** if a site has sound, the user must control it. Without
play/stop and volume/mute, audio becomes annoying. Provide a mute toggle, make sound
audible by choice (or at least obviously controllable), and **never autoplay loud**.

**Tooling:** **Howler.js** is the de-facto library. It defaults to the Web Audio API and
falls back to HTML5 Audio for reliability across platforms, exposes a global mute/unmute,
and surfaces the master GainNode for advanced control (ducking, crossfades).

Implementation craft:

- **Single source of truth for mute state** (a boolean), with the toggle's visible state
  (icon or label) reflecting it. **Persist the choice in `localStorage`** so the user does
  not have to re-mute every visit.
- **iOS caveats:** mute behavior differs between HTML5 Audio and Web Audio on iOS, and
  audio requires a user gesture to start. Test on real iOS; the silent-switch and gesture
  rules bite.
- **When sound elevates:** sparse, intentional, reactive (responds to interaction), and
  off-by-default-but-invited. **When it annoys:** autoplaying, looping with no control,
  loud, or on a utility/content site where the visitor came to read, not to be performed
  at.

---

## Detail craft

These are the touches that make a visitor feel a site was *made*, not assembled.

- **Magnetic buttons.** The button (or its label) is attracted toward the cursor as it
  approaches, then springs back on leave. Map the cursor offset from the element center
  to a translate, eased back to 0 on mouseleave. Keep displacement small (a few px up to
  ~0.3x the distance) and the spring snappy.
- **Sticky / animated nav.** Should change state on scroll (shrink, gain a background,
  hide-on-scroll-down / show-on-scroll-up) with a tokenized transition. A background
  "pill" or highlight can glide between items using each item's bounding box on hover.
- **Directional link underlines.** The underline draws in from the side the cursor
  *enters* (directional reveal), not a flat on/off toggle. Built with a pseudo-element
  scaled on `transform: scaleX` with `transform-origin` flipped per enter direction, or a
  clip/mask wipe. The directionality is the detail that reads as crafted.
- **Surprising hover states.** Image swaps, color inversions, content peeks, text
  scrambles, cursor-context labels (the cursor becomes "VIEW" / "DRAG" / "PLAY" over an
  element). The surprise is the point: hover should reward exploration.
- **Cursor-following media preview (the index/list pattern).** On a text list or ruled
  index (projects, articles, case studies), summon the row's image *next to the cursor*
  on hover and let it follow the pointer, instead of showing every thumbnail at once.
  Lerp a single floating preview element toward the cursor for weight, swap its image on
  row hover, and for extra polish fan two or three layers with small `rotate`/`translate`
  offsets into a shallow perspective stack. This is what lets an editorial mono ledger
  outclass a card grid: the list stays calm and textual; imagery appears on demand. Keep
  the preview decorative-only so the list works without a pointer and via keyboard.
- **Scroll progress indicators.** A top bar or radial that reflects real read/scroll
  progress. Tie it to actual document progress, not a timer.
- **Animated counters.** Numbers count up when scrolled into view (stats, awards, years).
  Trigger on IntersectionObserver entry, ease the value (not linear), and respect
  reduced-motion by showing the final number instantly.
- **Marquee tickers.** Infinite horizontal or vertical scrolling strips of text or logos,
  drivable by time, drag, *or scroll velocity* (the marquee speeds up or reverses with
  scroll, a signature award-site move). Use a duplicated track and a CSS keyframe, or
  GSAP for a seamless loop, and avoid the deprecated `<marquee>` element.
- **Custom form interactions.** Floating labels, inline validation with character-level
  feedback, animated focus states, multi-step forms with progress, and satisfying
  success/error transitions. Make a chore feel responsive and alive.
- **Designed 404s and empty states.** Treat the 404 as its own designed page with an
  alternative layout, on-brand voice, and a clear way back. Treat the first-run / no-data
  empty state as a chance to onboard and charm: an illustration, a one-line guide, and a
  primary action, never a blank.
- **Easter eggs.** Custom cursors as discoverable surprises, section-level cursor changes,
  Konami-code hidden states, a parallax 404 that reacts to the cursor.
- **Selection, cursor, favicon styling.** Set a brand-colored `::selection` highlight (a
  tiny touch that signals intentionality). Make the custom cursor part of the UI language
  (context labels, a magnetic dot plus ring). Verify the favicon path (a wrong path shows
  as a 404 in the network tab); consider a theme-aware or animated favicon.
- **Dark/light toggle.** The craft is in the *transition*: animate the swap (for example a
  circular reveal expanding from the toggle), persist the choice, respect
  `prefers-color-scheme`, and make both themes equally considered (not one as an
  afterthought).
- **Loading skeletons.** Skeletons should mirror the real layout's shape and shimmer
  subtly so the user anticipates the content. For content (not whole-experience) loads,
  skeletons usually beat spinners and fake bars.
- **Toasts and feedback.** Enter and exit with a spring, auto-dismiss with a visible
  timer, stack gracefully, and give success and error their own motion personality.

---

## The discipline underneath: spacing, type, motion tokens

Even maximalist award sites feel intentional because they run on systems. The
"expressive but intentional" feel is not luck; tokenizing motion (and spacing and type)
is what lets a site be wild on the surface and coherent underneath.

- **Spacing scale.** A fixed ratio scale (for example a 4 or 8px base) so vertical and
  horizontal rhythm is consistent across the whole page.
- **Type scale.** A modular scale, not arbitrary per-element sizes.
- **Motion tokens.** Standardized, reusable values for **duration, easing, delay, and
  scale** so animations share one feel. Instead of guessing per-animation, tokens give a
  shared language.

**The two-easing pattern.** Define a **productive** easing for quick functional moves
(opening a menu, a focus glow) and an **expressive** easing for delightful,
emotion-driven moments (a hero reveal, a celebratory transition). Scale duration with the
size of the change: a bigger distance or scale change gets a longer duration.

```css
:root {
  /* expressive: fast start, long luxurious settle (scripted reveals) */
  --ease-expressive: cubic-bezier(0.16, 1, 0.3, 1);
  /* productive: quick, functional (micro-interactions) */
  --ease-productive: cubic-bezier(0.22, 1, 0.36, 1);

  --dur-fast: 180ms;
  --dur-base: 320ms;
  --dur-slow: 640ms;
}
```

Reuse one easing token site-wide as the motion accent so the whole UI shares a single
motion personality. Keep micro-interactions sub-200ms and eased-out. The takeaway: awe is
engineered, not sprinkled.
