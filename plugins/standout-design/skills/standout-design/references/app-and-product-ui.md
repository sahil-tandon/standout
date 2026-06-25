# App and Product UI Craft

Make dashboards, SaaS tools, and consumer apps feel premium WITHOUT sacrificing
usability. Award galleries skew to experiential marketing sites; real apps need
density, speed, and keyboard ergonomics as much as polish. The craft here is a system
of defaults: a motion recipe you apply by reflex, a tokenized color and spacing layer,
a proven component stack, and a handful of patterns (command palette, dashboard
density, empty states) that recur across every best-in-class product.

## Contents

- [The default interface-motion recipe](#the-default-interface-motion-recipe)
- [Spend delight by frequency](#spend-delight-by-frequency)
- [The proven React UI stack](#the-proven-react-ui-stack)
- [The "Linear look" as a system](#the-linear-look-as-a-system)
- [Dark-mode tokens](#dark-mode-tokens)
- [Spacing, type, and density tokens](#spacing-type-and-density-tokens)
- [Dashboard density patterns](#dashboard-density-patterns)
- [Command palettes](#command-palettes)
- [Empty states are four jobs](#empty-states-are-four-jobs)

---

## The default interface-motion recipe

This is the recipe to apply by reflex on every dropdown, popover, toast, dialog, and
state change. It is what separates "good" interface motion from "great." When in doubt,
follow it exactly.

### Duration: keep it under ~300ms

- Keep UI animations under ~300ms. A 180ms dropdown feels more responsive than a 400ms
  one. Anything longer reads as sluggish.
- Never animate longer than ~1s total. If an animation takes longer than that, it is
  not an animation, it is a loading screen.
- Elegance exception: a slightly slower duration paired with `ease` (not `ease-out`)
  can feel more sophisticated (this is what Sonner toasts do), but that is the
  deliberate exception, not the default.

### Easing: default to `ease-out`

- Default to `ease-out` for enter and exit. It starts fast and decelerates, giving an
  immediate sense of responsiveness.
- `ease-in` makes the UI feel sluggish because it delays the initial movement. An
  `ease-in` dropdown at 300ms feels slower than `ease-out` at the same 300ms. Reserve
  `ease-in` only for things leaving the screen entirely.
- `ease-in-out` for objects already visible moving across the screen (mimics a car
  accelerating then decelerating). Good for on-screen repositioning.
- `ease` (the CSS default) only for trivial hover effects like a background-color
  change. For anything meaningful, use a custom curve.
- Never use `linear` for UI. Linear is only for progress bars and looping/ambient
  background animation.
- Built-in CSS curves are usually too weak. Use custom cubic-beziers:
  - Strong ease-out for UI interactions: `cubic-bezier(0.23, 1, 0.32, 1)`
  - Strong ease-in-out for on-screen movement: `cubic-bezier(0.77, 0, 0.175, 1)`
  - Curve-finding tools: easing.dev, easings.co

### Transform-origin: the most-skipped detail

- The animation must originate from where the element conceptually comes from. A
  dropdown opening from a button at the bottom of the screen should use
  `transform-origin: bottom center`, not the CSS default `center`. Getting origin wrong
  is the single most common reason a scale/reveal animation feels "off."
- Radix exposes this automatically via CSS vars like
  `--radix-popover-content-transform-origin`; shadcn/ui wires it up by default. Use it.

### Animate only `transform` and `opacity`

- These only trigger the composite step of the render pipeline. Animating
  padding/margin/width/height triggers layout + paint + composite and drops frames.
- 60fps is the floor. Below it, everything else becomes useless.
- Use `clip-path` for reveal/mask effects: hardware-accelerated, no layout shift (the
  element holds its space throughout), no extra DOM.

### Spring vs ease

- **Spring** for natural/organic motion and anything driven by a gesture or pointer the
  user might interrupt mid-flight. Springs maintain velocity when interrupted; CSS
  keyframes restart from zero. Use Motion's `useSpring`.
- Apple-style spring config is easier to reason about than stiffness/damping:
  `{ type: "spring", duration: 0.5, bounce: 0.2 }`. Keep `bounce` subtle (0.1 to 0.3).
- **Ease** for simple state transitions (open/close, fade) where there is no gesture.
- **Do not spring functional data.** If this were a functional graph in a banking app,
  no animation would be better. Decorative pointer-following gets a spring; precise
  financial data gets no animation.

### Interruptibility: CSS transitions beat keyframes for UI

- Animations must be interruptible and retargetable mid-flight while staying smooth.
- Sonner was rebuilt from CSS keyframes to CSS transitions specifically because
  keyframes are not interruptible. Transitions can be re-targeted even before the first
  transition finishes. This is the core reason toasts and drawers feel fluid when you
  grab them. Use CSS transitions for anything the user can grab.

### When NOT to animate

- **Never animate keyboard-initiated actions.** Power users repeat them hundreds of
  times a day; animation just adds latency. (Directly relevant to Linear/Raycast
  keyboard-first UX.)
- **No hover effects on disabled elements.** Disabled means disabled, do not tease
  users.
- **Do not over-animate.** Overuse overwhelms users and every animation loses its
  impact.
- **Respect `@media (prefers-reduced-motion: reduce)`** and ship a reduced alternative
  for users with vestibular conditions.

---

## Spend delight by frequency

Delight scales inversely with frequency. High-use actions get subtle, near-invisible
feedback; rare and memorable actions get the big moments. Spend your animation budget
where it will not get tiring.

- High-frequency actions (typing, selecting, navigating): instant or sub-200ms feedback,
  nothing showy. These run hundreds of times a session, so any flourish becomes
  irritating fast.
- Rare, memorable actions (creating an account, completing a backup, finishing
  onboarding): this is where the confetti, the reveal, the sound, the celebratory
  moment belongs. Family's app spends big here (a sequin QR reveal, tokens tumbling into
  a skeuomorphic trash can with sound) precisely because these happen once.

Supporting techniques from premium micro-interaction work (Family, iOS):

- **Dynamic tray** that grows/shrinks in height to signal progression, overlaying rather
  than replacing the screen (preserves context).
- **Directional transitions:** tapping a left tab moves content left, right moves right,
  so motion communicates spatial location.
- **Text morphing using shared letters:** "Continue" to "Confirm" animates through the
  common characters for continuity.
- **Persisted elements:** a card keeps its position moving between screens instead of
  re-animating, avoiding redundant motion.

---

## The proven React UI stack

Build on these. Do not hand-roll a dialog, menu, popover, or toast.

- **Radix Primitives:** unstyled, accessible behavior (focus management, ARIA, keyboard
  nav, dismiss logic). The correct foundation.
- **shadcn/ui:** copy-in components styled with Tailwind over Radix. **Caveat: verify
  a11y yourself.** A 2026 audit found ~34/48 components pass WCAG 2.2 AA out of the box,
  9 need minor fixes, and 5 have real gaps, often because the styling layer removes
  Radix's focus indicators or fails contrast. Verify focus rings and contrast; do not
  assume the wrapper preserved Radix's a11y.
- **Sonner** (the default toast). The breakout feature was stacking with animation.
  Swipe-to-dismiss by default, direction adapting to the toast's screen position. Built
  on interruptible CSS transitions. shadcn deprecated its own toast in favor of Sonner.
- **cmdk** (the command-palette primitive by Paco Coursey). The same library behind
  Linear and Raycast web surfaces; shadcn's `Command` wraps it.
- **Vaul** (the React drawer with iOS-style spring + gesture physics).

For the motion recipes themselves in React (Motion / Framer Motion): the canonical
reproducible patterns are the **multistep wizard** (direction-aware step transitions)
and **animating an unmounting component** via `AnimatePresence`.

---

## The "Linear look" as a system

The "Linear look" is a system, not a vibe. It is reproducible:

- **LCH color, not HSL.** Linear's theme engine uses LCH because it is perceptually
  uniform (a red and a yellow at the same lightness read as equally bright). Each theme
  is generated from just **3 variables**: base color, accent color, contrast (down from
  98 hand-tuned values). OKLCH is the equivalent modern choice in CSS.
- **Contrast as a programmable token.** A single `contrast` variable (tested 30 to 100)
  ships high-contrast accessible themes from the same system. Text/icons get darker in
  light mode, lighter in dark mode.
- **Reduce chrome color.** Deliberately limit how much primary accent bleeds into
  surface calculations to get a neutral, timeless feel with less visual noise.
- **Three elevation levels** (background, foreground, panels/dialogs/modals), all
  generated via LCH rather than hand-tuned.
- **Two-tier type:** a display cut for headings (more expressive), a regular cut for
  body. (Linear uses Inter Display over Inter; choose your own pair, but keep the
  display/body split.)
- **Obsessive alignment.** Vertical and horizontal alignment of labels, icons, and
  buttons across sidebar and tabs. Users feel it after a few minutes even if they cannot
  name it.
- **Keyboard-first with discoverability.** Hovering an element surfaces a banner
  teaching the faster keyboard path. Shortcuts are the primary interface; the mouse is
  the fallback.

Vercel/Geist is the adjacent neutral-developer-tool variant of the same discipline:
dark mode as the canonical surface (light is the alternate), a pure-neutral gray ramp
(no warm or cool tint), color only when it carries meaning (status, links, errors),
semantic tokens (`foreground`/`background`, not `black`/`white`), and type tokens that
preset size/line-height/letter-spacing/weight together so you cannot mismatch them.

---

## Dark-mode tokens

Dark mode done right is a token system, not a color inversion.

- **Never pure black (#000).** Use a dark gray base (Material's `#121212`, or a warmer
  value). Pure black against bright content creates harsh contrast and eye strain.
- **Elevation = lighter surface.** Higher in the stack (closer to the implied light
  source) means lighter. This is how you communicate depth without shadows on dark.
  Standardize it with elevation tokens so cards/modals/tooltips feel physically
  consistent.
- **Desaturate accents/brand colors by ~20 points** vs light mode. Saturated colors
  vibrate against dark surfaces.
- **Semantic tokens make dark mode nearly free.** `foreground`/`background` plus a theme
  switch beats maintaining two hard-coded palettes. Generate both modes from the same
  small set of variables (LCH like Linear, or Geist-style semantics).

---

## Spacing, type, and density tokens

The discipline under the expression. Never put raw px in a component.

### Spacing scale

- **4px or 8px base grid.** 4px gives granularity for dense UI; 8px gives bolder, simpler
  rhythm. Both divide cleanly into common screen sizes.
- **8 to 12 spacing tokens cover ~95% of needs:** e.g. xs 4 / sm 8 / md 16 / lg 24 /
  xl 32 / 2xl 48 / 3xl 64 / 4xl 96. Name them semantically (`space-4`), never raw px.

### Type scale

- Ship the type scale as **bundled tokens** (size + line-height + letter-spacing +
  weight together), the Geist approach, so you cannot accidentally mismatch them.

### Density modes

- Power-user product UI should support a **density toggle** (compact to comfortable),
  driven by swapping spacing tokens, not rewriting layouts. Dashboard users are power
  users: density over whitespace.

---

## Dashboard density patterns

The composition that scales from 5 features to 50 without restructuring:

> **Sidebar (240 to 280px) + KPI metric strip (4 to 6 cards) + flexible CSS-grid
> content.**

- **KPI card anatomy:** big number + trend indicator (arrow + %) + sparkline. Repeat 4x.
- **Dashboard users are power users: density over whitespace.** Quality comes down to
  navigation predictability, information density, and load-state handling.
- **Mature data-table vocabulary to reach for:** display-density toggle, table summary
  row, hover actions, inline editing, expandable rows, quick-view, row-to-detail,
  sortable columns, filter/search, add-column, multi-modal stacks.
- **Ship documented pattern compositions, not just loose components**, so teams reach for
  proven arrangements instead of reinventing.

Recurring navigation: persistent sidebar for SaaS (it scales), bottom tab bar for mobile
consumer, command palette as the keyboard-first overlay on top of either.

---

## Command palettes

The "one box for everything" overlay. Reproducible with **cmdk** (shadcn's `Command`
wraps it).

- **One input for everything:** search features, navigate, and run actions in a few
  keystrokes without memorizing individual shortcuts.
- **Show the keyboard shortcut next to each item** so the palette teaches power-user
  paths (Figma, Vercel, Linear, Intercom all do this).
- **Group results** (recents, navigation, actions) and **surface recents first**.

---

## Empty states are four jobs

An empty state is not one thing. It is four distinct jobs, each with its own goal:

1. **First-time use** (no data yet): the highest-leverage onboarding moment, can make or
   break activation. Show the value, give one clear primary action to create the first
   item.
2. **No results** (search/filter): explain why and offer a way out (clear filters).
3. **Post-completion** (inbox-zero): a delight moment to reward finishing.
4. **Feature education:** contextual tips that teach a capability in place.

Design all four. The first-run state especially is an activation make-or-break, not a
placeholder.

---

## The product-UI takeaways

1. Default motion recipe: `ease-out`, under 300ms, animate only `transform`/`opacity`,
   set `transform-origin` to where the element comes from.
2. CSS transitions (interruptible) over keyframes for any UI the user can grab; springs
   for gestures; no animation for precise data.
3. Never animate keyboard actions; respect `prefers-reduced-motion`; do not tease
   disabled elements.
4. Spend delight where it is rare; keep high-frequency actions instant.
5. Build on Radix + shadcn + Sonner + cmdk + Vaul, but verify focus rings and contrast.
6. Use semantic tokens (`foreground`/`background`), a 4/8px spacing scale, bundled type
   tokens, and generate dark mode from the same tokens.
7. Dark mode: never pure black, elevation via lighter surfaces, desaturate accents ~20
   points.
8. Dashboards: sidebar + KPI strip + grid; density over whitespace; ship documented
   pattern compositions.
