# Accessibility as craft: the stunning-AND-inclusive playbook

This is the skill's differentiator. Most WebGL and award-tier sites treat
accessibility as invisible or impossible, so a site that delivers spectacle AND
inclusion stands alone. Treat the reduced/accessible path as a **design
deliverable, not a fallback**: design the cross-fade as carefully as the
parallax, the lite scene as carefully as the WebGL one, the focus ring as
carefully as the hover state.

## Contents

- [Reduce, do not remove (motion)](#reduce-do-not-remove-motion)
- [The full preference set](#the-full-preference-set)
- [WebGL / canvas: the parallel semantic layer](#webgl--canvas-the-parallel-semantic-layer)
- [Beautiful conformant focus rings](#beautiful-conformant-focus-rings)
- [Modals, focus order, skip links](#modals-focus-order-skip-links)
- [Smooth scroll affordances](#smooth-scroll-affordances)
- [Custom cursors and hover](#custom-cursors-and-hover)
- [Color and contrast](#color-and-contrast)
- [Typography a11y](#typography-a11y)
- [Structure, forms, media](#structure-forms-media)
- [Testing layers](#testing-layers)
- [Checklist](#checklist)

---

## Reduce, do not remove (motion)

The enemy is not movement, it is **large-field, foreground/background-decoupled,
or unexpected motion** the inner ear cannot reconcile with the eyes: large
parallax, zoom/dolly, spin, auto-scroll, long slide-ins. These cause dizziness,
nausea, and headaches for people with vestibular disorders.

Generally safe to keep even under reduced motion: opacity fades under ~200ms,
subtle color changes, focus-ring transitions, progress indicators.

The lazy implementation nukes everything (`* { animation: none !important; }`).
The craft implementation provides a **designed reduced alternative**:

| Full experience | Reduced alternative |
|---|---|
| Parallax layers | Static composition, or one cross-fade on enter |
| Zoom/dolly hero | Cut, or opacity fade between states |
| Auto-playing WebGL scene | Freeze to one well-composed frame |
| Long slide-in reveal | Fade-in in place (no translation) |
| Scrubbed scroll timeline | Jump to end state, content fully present |

### Pattern: opt-in CSS (safer than opt-out)

Author the static version as the default; layer motion only inside
`no-preference`. No flash of animated content, degrades safely when unsupported:

```css
/* Default = the reduced, stable experience */
.reveal { opacity: 0; transition: opacity 200ms ease; }
.reveal.in-view { opacity: 1; }

/* Motion is the enhancement, gated behind explicit no-preference */
@media (prefers-reduced-motion: no-preference) {
  .reveal { transform: translateY(40px); transition: opacity 600ms, transform 600ms; }
  .reveal.in-view { transform: none; }
}
```

### Pattern: gsap.matchMedia() with a real reduced branch

`gsap.matchMedia()` registers separate handlers per media condition and auto
reverts (kills tweens, restores inline styles) when the condition stops matching.
Give reduced motion its own timeline, not a no-op:

```js
const mm = gsap.matchMedia();
mm.add({
  motionOK: "(prefers-reduced-motion: no-preference)",
  reduced:  "(prefers-reduced-motion: reduce)",
}, (ctx) => {
  const { motionOK } = ctx.conditions;
  if (motionOK) {
    gsap.timeline({ scrollTrigger: { trigger: ".hero", scrub: true, pin: true } })
        .to(".bg", { yPercent: -30 }, 0)
        .to(".fg", { yPercent: -10 }, 0);
  } else {
    // Reduced: no pin, no scrub, no parallax - a tasteful cross-fade on enter
    gsap.from(".hero *", {
      opacity: 0, duration: 0.4, stagger: 0.05,
      scrollTrigger: { trigger: ".hero", start: "top 80%" },
    });
  }
});
```

Call `gsap.matchMediaRefresh()` if you expose an in-page reduced-motion toggle.

### Freeze a WebGL scene to one frame

For an ambient/auto-animating canvas, render once then stop the loop (cheaper for
the user's battery too):

```js
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
function tick(t) {
  update(t); renderer.render(scene, camera);
  if (!reduce) frame = requestAnimationFrame(tick);
}
requestAnimationFrame(tick); // reduce -> renders exactly one frame and halts
```

In R3F, `@react-three/a11y`'s `A11yUserPreferences` exposes reduced-motion to
descendants, so you can set `frameloop="demand"` and stop invalidating.

---

## The full preference set

Most teams ship only `prefers-reduced-motion`. Honoring the rest is a cheap
differentiator:

```css
@media (prefers-reduced-transparency: reduce) {
  .glass { backdrop-filter: none; background: var(--surface-solid); }
}
@media (prefers-contrast: more) {
  :root { --text: #000; --muted: #1a1a1a; }
  .card { border-width: 2px; }
}
@media (prefers-reduced-data: reduce) {
  .hero-video { display: none; }
  .hero { background-image: url("hero-sm.avif"); }
}
```

- **`prefers-reduced-transparency: reduce`** - drop frosted-glass `backdrop-filter`
  blurs and translucent overlays to solid fills for readability.
- **`prefers-contrast: more`** - thicken borders, darken text, drop low-contrast
  moody greys (`less` and `custom` also exist).
- **`prefers-reduced-data: reduce`** - skip heavy background video, decorative
  WebGL, and large hero imagery; serve smaller assets and system fonts.

---

## WebGL / canvas: the parallel semantic layer

A `<canvas>` (2D or WebGL) renders pixels with **no DOM, no semantics**: screen
readers see nothing, find-in-page finds nothing, crawlers see nothing. The fix is
always the same shape: **maintain a parallel semantic layer that mirrors the
meaningful content.**

### Floor: fallback content + a name

Put real HTML between the tags (read by AT, ignored visually when the canvas
paints) and give the canvas an accessible name:

```html
<canvas role="img" aria-label="Animated globe showing our 40 office locations">
  <ul><li>London</li><li>Tokyo</li><li>...</li></ul>
</canvas>
```

For data viz, mirror the chart as a visually-hidden `<table>` so blind users get
the numbers, not a description of pixels.

### Interactive 3D: focusable meshes with @react-three/a11y

Meshes are not in the DOM, so they cannot receive Tab focus or expose ARIA.
`@react-three/a11y` builds an invisible HTML layer over the canvas: each wrapped
object gets a real focusable element, ARIA role, screen-reader description, and an
`A11yAnnouncer` for live announcements.

```jsx
import { Canvas } from "@react-three/fiber";
import { A11y, A11yAnnouncer } from "@react-three/a11y";

<Canvas>
  <A11y role="button"
        description="Rotate to the product's back"
        activationMsg="Showing the back of the product"
        actionCall={() => rotateModel()}>
    <mesh>{/* ... */}</mesh>
  </A11y>
</Canvas>
<A11yAnnouncer /> {/* sibling of Canvas - manages SR announcements */}
```

Roles: `content`, `button`, `togglebutton` (emits `aria-pressed`), `link` (needs
`href`). Gives keyboard focus, Enter/Space activation, focus indication, and
descriptions without hand-writing parallel markup.

### Real HTML text over canvas

Text painted into a canvas or extruded as 3D geometry is unselectable and
invisible to crawlers. Keep headlines and body copy as **real HTML overlaid on
the canvas** (absolutely positioned, `pointer-events: none` where needed) rather
than rendered into WebGL. You get crisp text, selection, zoom, and indexing for
free.

### When to offer a "lite" non-WebGL mode

Offer an explicit lite mode (and auto-select it) when any of these are true:

- `prefers-reduced-data` or `prefers-reduced-motion: reduce` is set
- Low-power device, `(update: slow)`, no WebGL context, or low
  `navigator.deviceMemory`
- The 3D is **load-bearing content**, not decoration (then the lite mode must
  convey the same information: a static gallery + copy instead of an explorable
  scene)

The lite mode is a designed artifact: a strong static composition, real headings,
selectable text, working anchor links. Treat it as the canonical accessible/SEO
surface and let WebGL be the progressive enhancement.

---

## Beautiful conformant focus rings

Never remove the outline; redirect it. `:focus { outline: none; }` breaks
keyboard users. Use `:focus-visible` so indicators show for keyboard/AT users but
not on mouse click, then style something beautiful.

The bar (WCAG 2.2): **SC 2.4.13 Focus Appearance** wants an indicator covering at
least a 2px-thick perimeter with **3:1 contrast** between focused and unfocused
states; **SC 1.4.11 Non-Text Contrast** wants 3:1 against adjacent colors.

The brand-safe technique is a **two-layer "Oreo" ring** (outline + offset
box-shadow) that survives light, dark, and image backgrounds:

```css
:focus-visible {
  outline: 2px solid var(--brand-accent);
  outline-offset: 3px;                  /* breathing room, doesn't hug content */
  box-shadow: 0 0 0 5px var(--surface); /* halo separates ring from busy bg */
  border-radius: inherit;
}
```

For maximum robustness on unknown backgrounds, the black/white double ring
guarantees contrast either way:

```css
:focus-visible { outline: 3px solid #000; box-shadow: 0 0 0 6px #fff; }
```

Use `outline-offset` (not `dashed`) so you do not lose perimeter area through the
gaps.

---

## Modals, focus order, skip links

### Use native <dialog>, stop hand-rolling traps

`<dialog>` opened with `.showModal()` traps focus, handles Escape, applies
`role="dialog" aria-modal="true"`, renders `::backdrop`, and makes the rest of the
page inert automatically:

```js
dialog.showModal();          // focus trapped, Escape closes, backdrop inert
dialog.addEventListener("close", () => triggerButton.focus()); // return focus
```

If you must build a custom dialog, mark background content `inert` (removes it
from Tab order and AT) rather than juggling `aria-hidden` + tabindex by hand.

### Focus order and skip links

- **Order (SC 2.4.3):** DOM order = visual order. CSS reordering (`order`,
  `flex-direction: row-reverse`, grid placement) silently breaks Tab order; verify
  after layout.
- **On-brand skip link** visible on focus, not a hidden afterthought:

```css
.skip-link { position: absolute; left: 0; top: 0; transform: translateY(-110%);
  padding: .6rem 1rem; background: var(--brand); color: #fff;
  border-radius: 0 0 .5rem 0; transition: transform 150ms; }
.skip-link:focus-visible { transform: translateY(0); }
```

- **Focus Not Obscured (SC 2.4.11):** sticky headers and cookie bars must not
  cover the focused element. Add `scroll-padding-top` equal to the sticky header
  height.
- **Composite widgets** (toolbars, menus, tab lists, custom carousels): one Tab
  stop, arrows inside. Implement with roving tabindex (active item `tabindex="0"`,
  siblings `tabindex="-1"`, update on arrow key + move focus).

---

## Smooth scroll affordances

Inertial smoothing of native scroll (Lenis) is mostly fine; **hijacking** that
remaps a scroll gesture to a non-scroll action (one wheel notch = one full-screen
slide) breaks the mental model and raises cognitive load for AT and
motor-impaired users.

A smooth-scroll layer must preserve native affordances (verify by hand, do not
assume):

- **Tab / Shift+Tab** scrolls the focused element into view
- **PageUp/PageDown, Space, Home/End, arrows** move the page
- **Find-in-page (Cmd/Ctrl+F)** jumps to matches
- **Anchor links** (`#section`) scroll correctly
- **Scrollbar drag** works and reflects real position

Honor reduced motion and provide an escape hatch:

```js
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const lenis = new Lenis({
  smoothWheel: !reduce,        // reduced users get native, instant scroll
  duration: reduce ? 0 : 1.1,
});
function raf(t){ lenis.raf(t); requestAnimationFrame(raf); }
if (!reduce) requestAnimationFrame(raf);
```

For scroll-jacked narratives, always provide nav links that jump to sections, and
ensure each scene is reachable and readable **without performing the gesture**.
Never trap the user in a sequence they can only exit by scroll-fighting.

---

## Custom cursors and hover

### Never hide the real cursor entirely

`cursor: none` on `body` strips the OS cursor that motor-impaired and low-vision
users rely on, and the custom follower will not track magnifiers or alternative
pointers. Gate the custom cursor to fine pointers only:

```css
@media (any-hover: hover) and (pointer: fine) {
  .has-custom-cursor { cursor: none; } /* only where a real mouse exists */
}
.custom-cursor { pointer-events: none; }
```

`any-hover/pointer` prevents the custom cursor from clobbering touch and keyboard.

### Never gate content behind hover (SC 1.4.13)

Content revealed on hover must be reachable another way and must be **Dismissible,
Hoverable, Persistent**:

- Reveal on **focus** too, not only hover (keyboard parity)
- **Dismissible** with Escape without moving the pointer
- **Hoverable** - moving onto the revealed content does not dismiss it
- **Persistent** - stays until hover/focus leaves or it is dismissed

Pair every cursor/hover affordance with real semantics (`aria-label`, `role`,
`aria-pressed`) so non-hover users get the same signal.

---

## Color and contrast

**WCAG 2.2 (the legal bar).** AA: **4.5:1** body text, **3:1** large text (>=24px,
or >=18.66px bold) and UI components/focus indicators. AAA: 7:1 / 4.5:1.

**APCA (the better model for moody dark UI).** WCAG 2.x overstates contrast for
dark colors: 4.5:1 can be functionally unreadable near black, exactly the failure
mode of moody dark sites. APCA (the WCAG 3 candidate) is perceptually uniform and
polarity/size-aware, scoring lightness contrast as `Lc` on a roughly +-106 scale:

- **Lc 60** ~ exceeds 3:1 (use >=24px in light mode)
- **Lc 75** ~ exceeds 4.5:1 (use >=18px in light mode)
- Positive Lc = dark text on light; negative = light text on dark

Craft move: **design and verify against APCA** to find dark palettes that are
moody and genuinely readable, then confirm you also clear **WCAG 2.2 AA** for
legal conformance (EN 301 549 / EAA still reference WCAG 2.x).

**Never color-alone.** State conveyed by color must also carry a non-color signal:
icon, underline, label, shape, pattern. Error red gets an icon + message; a
selected chip gets a checkmark or border; chart series get direct labels.

---

## Typography a11y

- **Use `rem`, not `px`,** for font sizes so the browser/OS font-size setting and
  zoom scale text. Pixel sizes ignore the user's root preference.
- **Never disable zoom** - no `user-scalable=no` / `maximum-scale=1` in the
  viewport meta. Text must reflow at 200% zoom without loss or overlap.
- **Survive the Text Spacing rules (SC 1.4.12):** content must not clip or overlap
  when users force `line-height: 1.5`, `letter-spacing: 0.12em`,
  `word-spacing: 0.16em`, paragraph spacing `2em`. So **do not set fixed heights
  on text containers**; let them grow.
- **Comfortable defaults:** body ~16-18px (1rem+), line-height ~1.5, measure
  **~45-75 characters** (`max-width: ~70ch`), generous paragraph spacing.
- **Dyslexia-friendly:** ample spacing, avoid pure justified text, avoid all-caps
  for long runs, keep a clean readable body face even if a display face carries
  the brand.

---

## Structure, forms, media

- **Landmarks:** one `<main>`, plus `<header>`/`<nav>`/`<footer>`/`<aside>`. A
  canvas-heavy hero still lives inside real landmarks.
- **Headings:** exactly one logical `<h1>`, no skipped levels. Headings are the
  screen reader's table of contents, not styling hooks.
- **Alt text as craft:** decorative images `alt=""`; meaningful images get
  concise, purposeful alt describing function/meaning, not pixels; complex visuals
  get a real text/data equivalent.
- **Forms:** every input has a programmatic `<label>` (not placeholder-as-label);
  errors announced (`aria-describedby` / live region), not color-only; group with
  `<fieldset>`/`<legend>`. WCAG 2.2 adds 3.3.7 Redundant Entry and 3.3.8
  Accessible Authentication (no memory/transcription puzzles to log in).
- **Media:** no autoplaying audio; video gets captions and ideally a transcript;
  pause decorative/looping video under reduced motion; visible sound controls.
- **WCAG 2.2 also:** 2.5.7 Dragging (single-pointer alternative for any drag),
  2.5.8 Target Size (interactive targets >=24x24 CSS px), 3.2.6 Consistent Help.

---

## Testing layers

Run cheap to expensive; automation alone is insufficient (it misses focus order,
meaningful alt, and the WebGL semantic layer):

1. **axe** (axe DevTools / `@axe-core/playwright`) in CI - catches ~30-50% of
   issues, fast, zero false positives.
2. **Lighthouse** accessibility audit - quick scoring, good for trendlines.
3. **Keyboard-only pass** by hand - unplug the mouse: Tab through everything,
   confirm visible focus, logical order, no traps, all hover content reachable,
   modals behave.
4. **Screen reader pass** - VoiceOver (macOS/iOS + Safari) and NVDA (Windows +
   Firefox/Chrome). Verify landmarks, headings, alt/labels, the canvas parallel
   layer, live announcements.
5. **Contrast** - APCA tools for perceptual checks on dark/moody palettes, plus a
   WCAG 2.2 checker for legal conformance.
6. **Preference matrix** - toggle OS reduced-motion, reduced-transparency,
   increased-contrast and verify each branch.

---

## Checklist

**Motion**
- [ ] Static/reduced version is the default; motion gated behind `(prefers-reduced-motion: no-preference)`
- [ ] Reduced path is a designed alternative (cross-fade / frozen frame), not `animation: none`
- [ ] `gsap.matchMedia()` has a real `reduce` branch; `matchMediaRefresh()` wired to any toggle
- [ ] Ambient WebGL freezes to one frame under reduced motion (`frameloop="demand"`)
- [ ] `prefers-reduced-transparency`, `prefers-contrast`, `prefers-reduced-data` honored

**WebGL / Canvas**
- [ ] Canvas has `role="img"` + accessible name, or real fallback content between tags
- [ ] Data viz mirrored as a visually-hidden `<table>`
- [ ] Interactive 3D wrapped in `@react-three/a11y` (focusable, roles, descriptions, `A11yAnnouncer`)
- [ ] Headlines/body are real overlaid HTML (selectable, indexable), not painted into canvas
- [ ] Lite non-WebGL mode exists and auto-selects for reduced-data / no-WebGL / load-bearing content

**Keyboard & Focus**
- [ ] No `outline: none` without a conformant replacement; `:focus-visible` used
- [ ] Focus ring: 2px perimeter, 3:1 contrast, two-layer/offset, visible on any bg
- [ ] DOM order = visual order, verified after CSS layout
- [ ] On-brand skip link visible on focus; `scroll-padding-top` clears sticky headers
- [ ] Modals use native `<dialog>` (or `inert` background); focus returns to trigger on close
- [ ] Composite widgets use roving tabindex (one Tab stop, arrows inside)

**Scroll**
- [ ] Tab, PageUp/Down, Space, Home/End, arrows, Cmd+F, anchor links, scrollbar all work
- [ ] Smooth scroll disabled under reduced motion (native scroll)
- [ ] Scroll-jacked sequences have a nav escape hatch; every scene reachable without the gesture

**Cursor & Hover**
- [ ] Real cursor never fully hidden; custom cursor gated to `(any-hover: hover) and (pointer: fine)`
- [ ] No content gated behind hover only; hover content also on focus + Dismissible/Hoverable/Persistent

**Color & Type**
- [ ] WCAG 2.2 AA contrast met (4.5:1 body, 3:1 large/UI); verified with APCA for dark palettes
- [ ] No information by color alone
- [ ] Font sizes in `rem`; zoom not disabled; reflows at 200%
- [ ] Survives Text Spacing rules (no fixed-height text containers); measure ~45-75ch

**Structure / Forms / Media**
- [ ] Landmarks + single logical `<h1>`, no skipped heading levels
- [ ] Alt text purposeful; decorative = `alt=""`
- [ ] Labeled inputs, announced errors, no autoplay audio, captions + transcript, sound controls
- [ ] Targets >=24px; drag has pointer alternative; consistent help placement

**Testing**
- [ ] axe + Lighthouse in CI; manual keyboard pass; VoiceOver + NVDA pass; preference-matrix pass
- [ ] Meets WCAG 2.2 AA
