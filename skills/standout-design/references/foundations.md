# Foundations: the principles of awe and the canon craft rules

These are the floor every standout interface stands on, expressive or restrained.
Start here before any code. Awe comes from one committed idea executed with
precision, not from stacking effects. Use the principles to decide *what* to build;
use the canon rules to keep it coherent while you build it.

## Contents

1. [The principles of awe](#the-principles-of-awe)
2. [The scoring reality (calibration)](#the-scoring-reality-calibration)
3. [The canon craft rules](#the-canon-craft-rules)
4. [The discipline under the expression](#the-discipline-under-the-expression)
5. [The anti-slop pre-ship checklist](#the-anti-slop-pre-ship-checklist)

---

## The principles of awe

What separates great from merely competent. These hold regardless of aesthetic
direction.

**The outcome these serve is a wow on sight.** Everything below is in service of one
gut-level result: a first-time visitor involuntarily reacts "that's a great-looking
site" within a second, and remembers it later. Judge the work by that reaction, not by
how clever or how restrained it is. Spectacle can deliver it (a bold poster hero, a
kinetic title, a striking color field) and so can restraint (an arrestingly spare
editorial page) but "tasteful and competent" without that jolt is a miss. When in
doubt, push the focal moment harder until the first impression is awe, not approval.

1. **One strong concept.** The most memorable interfaces are built around a single
   legible idea that everything serves: a metaphor, a world, a story. It should be
   readable in the first three seconds. Decoration without a concept reads as
   templated. Make the concept drive the tech, never the reverse. If a stranger
   cannot name the one idea in three seconds, there is no concept yet.

2. **Micro-craft.** Polish is the accumulation of hundreds of small correct
   decisions: easing that feels physical, hover states with weight, considered
   spacing and rhythm, magnetic buttons, kinetic type. No single one is the magic;
   the sum is.

3. **Originality and surprise.** Do something unseen, or give an unexpected
   execution of the familiar. This is the differentiator that lifts competent to
   unforgettable. Awe lives in the gap between expectation and execution.

4. **Performance is a feature.** Heavy visuals that still load fast and hold 60fps.
   Engineering discipline is part of the craft, not separate from it. A slow or
   broken masterpiece is not a masterpiece. Static or sluggish spectacle loses to a
   good photo.

5. **Cohesion and art direction.** Type, color, motion, sound, and copy all speak
   one voice. The best work feels authored, not assembled. Microcopy tone matters as
   much as visuals.

6. **Emotional impact.** The interface makes you feel something: wonder, joy, calm,
   tension. Pick the feeling on purpose and aim every decision at it.

7. **Usability survives the spectacle.** The hardest discipline. Navigation stays
   obvious, content stays readable, mobile still works, while doing something
   extraordinary. Keep the reading path static-fast; make every effect opt-in
   progressive enhancement that never blocks content.

8. **Tech in service of the idea.** WebGL, shaders, physics, spatial audio impress
   because they carry the concept, not because they exist. The wow is usually a
   bespoke shader or one signature motion, not heavier geometry. Fake and bake the
   "expensive" look (baked lighting, matcaps, composited sprites) rather than
   computing it in real time; pick tricks that delete entire systems.

---

## The scoring reality (calibration)

Award juries weight the work roughly Design 40%, Usability 30%, Creativity 20%,
Content 10%. The lesson that generalizes far beyond awards:

**About 70% of perceived quality is "beautiful AND works flawlessly."** Creativity
is the differentiator layered on top of a solid, usable base, never a substitute for
it. Spectacle and accessibility rarely coexist in the wild, which is exactly the gap
to exploit: doing both is how you beat the bar, not just meet it.

---

## The canon craft rules

Distilled from Refactoring UI, Thinking with Type, Grid Systems, Don't Make Me
Think, and Designing Interface Animation. Apply these whether the direction is
minimal or maximal.

- **Hierarchy is the master skill, and you build it by de-emphasizing.** Mute
  secondary elements with weight, color, and space; reach for size *last*, not
  first. A page where everything shouts has no hierarchy.

- **Work from systems, never one-off values.** Use a spacing scale (4/8px base), a
  multi-shade color ramp, a modular type scale, and motion duration/easing tokens.
  Constraints are what produce coherence. Pick a value once, reuse it everywhere.

- **Start spacious, then remove. Clutter is the enemy.** Generous whitespace, fewer
  borders (separate with spacing and background, not lines), cut half the words.
  Adding comes easily; removing is the discipline.

- **Make it self-evident.** If a user has to think to understand an element or a
  transition, it failed. Every animation needs a known purpose. Decoration that
  carries no meaning is noise.

- **Typography carries the product.** Measure 45 to 75 characters, generous leading,
  left-aligned body, real small-caps and italics (no faux-bold or scaled type),
  tighten tracking only as size grows. The typeface is the single biggest tell of
  unguided output; treat the type choice as a first-class decision.

- **Imitate the physical world for depth and motion.** Two-part shadows for
  elevation; ease-out for entrances, ease-in for exits (never linear for UI); a 200
  to 500ms budget; animate only performant properties (`transform`, `opacity`); keep
  motion interruptible. Set `transform-origin` to where the element actually
  originates; a wrong origin is the top reason a reveal feels "off."

- **Never rely on color alone.** Pair color with text, icon, weight, or shape for
  any state that carries meaning (accessibility), and honor `prefers-reduced-motion`
  as its motion sibling: author the static version as the default and gate motion
  behind `(prefers-reduced-motion: no-preference)`.

- **Consistency across every screen** so the whole product reads as one designed
  system. This is the ultimate payoff. The reduced-motion path, the empty state, and
  the 404 all carry the same voice as the hero.

---

## The discipline under the expression

Even maximalist standout work runs on systems. Three token families do the work:

- **A spacing scale** on a 4/8px base.
- **A modular type scale** (and a separate display cut for headings over a body cut
  for reading).
- **Motion tokens**: standardized duration, easing, delay, and scale. Keep a
  "productive" ease for functional moves and an "expressive" ease for delight, and
  reuse one signature easing token site-wide as the motion accent.

Tokenizing motion is what lets an interface be wild on the surface and coherent
underneath. Awe is engineered, not sprinkled. Build instruments (a themeable palette
engine, a generative motif, reusable reveal helpers), not one-off artifacts, so the
polish scales across a project repeatably.

Match implementation complexity to the vision: maximalist needs elaborate code,
minimal needs restraint and precision. Do not over-animate a calm design.

Vary across projects. Never converge on the same fonts, palette, or layout every
time; alternate light and dark, serif and grotesque, calm and loud. Convergence on
one safe choice is itself the generic tell.

---

## Moves worth stealing (studied from standout sites)

Specific, reusable techniques observed across great real-world sites. Pull one or two
that fit the brief; do not stack them all.

- **Copy is part of the design system.** A short, voice-heavy line or a recurring
  refrain (a repeated tagline across sections) carries tone and welds a multi-section
  page into one voice more cheaply than any visual token. Write the voice, then design.
- **Reframe the user's main objection into the headline.** Lead with the line that
  neutralizes the decision-maker's biggest fear ("turn screen time into learning
  time"). The headline does sales work, not just description.
- **Short, declarative headline voice.** Three confident words ("Capable, safe, fun.")
  beat adjective-stuffed marketing copy.
- **Borrow a high-trust template, then subvert it.** Run a familiar, credible format
  (an Apple-style product launch, a spec sheet) deadpan over an unexpected subject. The
  borrowed structure carries authority; the mismatch carries the surprise.
- **Make "now" feel live.** Real-world state for almost no visual cost: a real
  open/closed banner, local time, a telemetry readout (tide, temperature, price). It
  makes static marketing feel operated and current.
- **Oversized numeric proof points as the typographic hero.** Hard numbers (1 day,
  10,000 parts, 3,000 clients) set huge double as both typography and trust signal.
- **Dramatize the invisible.** For abstract or infrastructure products, render the
  mechanism as a tangible 3D/visual form instead of explaining it with bullets.
- **Name sections as places, not labels.** Turning a nav or section grid into named,
  explorable "pavilions" or rooms upgrades a menu into an experience.
- **Let imagery supply the color; keep the chrome neutral.** When real photos or video
  carry the palette, run minimal surrounding UI so the imagery sings.
- **A single saturated accent on a neutral, airy field** reads as premium
  consumer/precision-tech; reserve the loud palette for expressive briefs.
- **One signature tactile interaction that recurs** (a consistent ripple, a magnetic
  pull) makes a site feel authored, more than ten generic scattered effects.
- **Treat dead time as a designed beat.** A loading or empty state is a brand moment,
  not a spinner.
- **Reposition via aesthetic (de-clinicalize, de-stiffen).** When a subject is one the
  category renders cold, clinical, technical, or boring (robotics, machining, therapy,
  finance, infrastructure), give it warm, saturated, playful, handcrafted, or natural
  visual language instead. The look carries the repositioning more than the copy does.
- **Diegetic title and UI.** Render the title or key info as a real object inside the
  world: a license plate, a product spec badge, a stamp, a ticket, a painted sign. The
  interface becomes part of the depicted scene, not a label floating over it.
- **The color-field hero.** A full-bleed single saturated color with soft diagonal
  light bands plus grain and one elegant type statement, no product shot. Confident,
  low-asset, high-impact when the brand voice can carry it.
- **The food / playful hero recipe.** One bold color field, a cut-out real photo (or
  rich illustration) overlapping oversized display type, and a scattered hand-drawn
  doodle vocabulary of small outline icons. Warm, appetizing, energetic.
- **Strip the furniture when the experience is the message.** Remove the nav bar and
  scroll and make a single immersive screen (a title screen, a game start).
- **Illustration as the brand, matched to intent.** For creative studios, kids,
  playful, or handmade brands, a rich illustration (isometric, flat-vector, hand-drawn)
  is the right hero and the style is the proof, so make it rich and characterful, not
  flat-diagrammatic. (For food and products, real photography or photoreal 3D still
  wins; see `imagery-and-illustration.md`.)

---

## The anti-slop pre-ship checklist

Run this before calling any frontend done.

- [ ] **Concept:** can a stranger name the one idea in three seconds?
- [ ] **Type:** display face is NOT Inter/Roboto/Arial/system; high-contrast
      pairing; a mono or technical accent present; weights and sizes pushed to
      extremes.
- [ ] **Color:** one dominant tone + one sharp accent, not an even palette; built in
      OKLCH; atmosphere present (grain, gradient, glow), not flat `#000`/`#fff`.
- [ ] **Layout:** intentional grid with at least one breakout or asymmetry; not a
      stack of equal centered cards.
- [ ] **Motion:** one orchestrated load reveal; one reused easing token; nothing
      animated except `transform`/`opacity`; micro-interactions sub-200ms.
- [ ] **Detail:** considered hover states, custom cursor or selection styling,
      designed empty and 404 states, polished focus states.
- [ ] **Performance:** LCP under 2.5s, INP under 200ms, CLS under 0.1; WebGL lazy and
      gated; assets compressed.
- [ ] **Accessibility:** `prefers-reduced-motion` honored; keyboard navigable;
      semantic DOM behind any canvas; non-hover paths exist.
- [ ] **Cohesion:** type, color, motion, and copy speak one voice; spacing, type, and
      motion run on scales and tokens.
- [ ] **The wow test:** would a stranger go "wow, that's a great-looking site" on
      sight and remember it later? Approval is not enough; aim for the involuntary jolt.
