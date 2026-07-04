# Signature builds: teardowns of standout archetypes

Most generated pages fail the same way: a pleasant hero bolted to a generic card grid,
effects sprinkled on top. The award-tier sites do the opposite. They pick **one
committed metaphor** and run the whole page through it, then express it with motion
*choreography* rather than raw engine horsepower. This guide reverse-engineers a few
recurring standout archetypes into the moves you can actually reproduce.

The meta-lesson under all of them: **wow is art direction plus choreography plus one
idea carried everywhere, not a heavy 3D engine.** Several of the most-awarded agency
sites ship on constrained or no-code stacks (Webflow, Framer, Tilda) with *no bespoke
WebGL at all*. The rotating "3D" object is often a pre-rendered vector loop scrubbed on
scroll. Do not assume you need Three.js to land an immersive page; assume you need a
stronger concept and tighter motion timing.

## Contents

1. [Archetype: the single-metaphor site](#archetype-the-single-metaphor-site)
2. [Archetype: the editorial work index](#archetype-the-editorial-work-index)
3. [Harvested detail patterns](#harvested-detail-patterns)
4. [The cohesion mechanics](#the-cohesion-mechanics)
5. [Archetype: the scrollytelling world](#archetype-the-scrollytelling-world)
6. [Archetype: the total artifact metaphor](#archetype-the-total-artifact-metaphor)
7. [Archetype: the one-gesture story world](#archetype-the-one-gesture-story-world)

---

## Archetype: the single-metaphor site

**The move:** choose one object that *is* the brand idea, then make it the hero, the
navigation metaphor, the scrollytelling spine, and the section divider all at once. One
agency built its whole homepage around a single rotating wireframe tetrahedron: each
vertex is a service (strategy, web, ads, social). The shape is not decoration; it is the
information architecture made physical. This is the antidote to "every brief comes out
as the same page." When the structural device is born from the artifact, two briefs can
never produce the same layout in different colors.

**The technique stack, in scroll order:**

- **Preloader resolves into the hero.** A real percentage counts to 100 in oversized
  display numerals on a full-bleed accent field, then wipes to reveal the hero already
  in motion. (See `narrative-and-detail.md` for the honesty rules.)
- **The rotating object is a scrubbed vector loop, not WebGL.** Pre-render the rotation
  (After Effects, or a Blender turntable exported to Lottie/SVG), then map scroll
  progress to the animation frame. A `lottie-web`/`bodymovin` player with its frame
  driven by a ScrollTrigger `scrub` gives you a buttery "3D" hero for a fraction of the
  cost and zero shader code. (See `motion-and-interaction.md` "Cinematic scroll-scrub".)
- **The object morphs as it carries the narrative.** Pin the section; as the user
  scrolls, the shape rotates and *gains structure* (a triangle of three services grows a
  fourth vertex into a tetrahedron), stepping through the taxonomy one node at a time.
  Each step pulls up that node's detail panel (scope tags, a "visit page" affordance)
  while the matching legend item highlights. One interpolated scroll value drives the
  rotation, the morph, and the panel swaps so nothing drifts.
- **The vertices are live hotspots.** Each node pulses with a soft glow halo and, on
  hover, scales up and shifts color (a calm mint resting state snapping to the loud
  brand accent). The diagram doubles as a menu.
- **A geometric glyph system does the wayfinding.** One symbol per service (circle,
  square, triangle, cross) reused *everywhere*: hero corner, left legend, tetrahedron
  vertices, footer icon row. A consistent primitive set is the cheapest, strongest
  cohesion device on the page. (See `aesthetic-directions.md`.)
- **Organic annotation over the rigid grid.** A hand-drawn marker ellipse scribbled
  around the *active* legend item, plus deliberately casual asides ("so much wow" with
  an emoji) laid over an otherwise exact Swiss grid. That tension, machined precision
  plus a human hand, *is* the personality. Without it the same layout reads cold.
- **An instrument-dial moment for the close.** The final CTA sits inside nested,
  slowly rotating gauge/tachometer rings (tick marks numbered like a speedometer), the
  call-to-action button at the dead center. A retro-technical HUD motif turned into the
  page's last beat. (See `aesthetic-directions.md` "Retro-technical / HUD".)

**What makes it work and what to watch:** the discipline is a two-accent palette (a
near-white canvas, near-black ink, one loud accent plus one calm accent) and a single
type system (a wide techno display face for the big words, a mono for everything else)
held across every section. The pinned scroll must have a mobile fallback and a
reduced-motion path: show the shape's final state and let the panels stack as normal
sections. Never trap a phone user inside a scrubbed pin.

---

## Archetype: the editorial work index

**The move:** replace the portfolio card grid with a **mono ledger**. Instead of three
rounded thumbnails, list the work as a dense, hairline-ruled table, `Year / Name /
Sector / Industry`, with a per-row arrow, set in a monospace face on an inverted dark
field. It reads like film credits or an awards register: more premium, more
authoritative, and it scales to dozens of entries without becoming a wall of cards.

**The interaction that sells it:** on row hover, the project's screenshot **materializes
next to the cursor and follows it**, and as the pointer moves between rows the previews
**fan into a shallow perspective stack** of thumbnails. The list stays calm and textual;
the imagery is summoned on demand. Implement with a single floating preview element
following `pointermove` (lerp toward the cursor for weight), swapping its image on
`row:hover`; stack two or three layers with small `rotate`/`translate` offsets for the
fan. (See `narrative-and-detail.md` "Cursor-following media preview".)

**The supporting details:**

- **Filter pills as taxonomy.** Outlined chips above the table (`ALL`, `Awarded`, plus
  capability and sector tags) filter the index in place; the active chip fills.
- **Award badges.** A small bordered `Awarded` pill (with a trophy mark) on the rows
  that earned it, doing social proof inline instead of in a separate logo wall.
- **Generous reveal gaps.** Long page, paced by sections that animate in on scroll with
  real breathing room between them, never a uniform stack.

**Why prefer it:** a card grid says "here are some projects." A ruled index says "here
is the body of work," and rewards exploration through the cursor preview rather than
asking the user to click into everything. Use it whenever the work is screen-based and
plentiful. Keep the table fully keyboard-navigable and the previews non-essential
(decorative enhancement only), so the index works without a pointer.

---

## Harvested detail patterns

Reusable across many briefs, not tied to the archetypes above:

- **Oversized headline that bleeds off both edges.** Set the hero line *larger than the
  viewport* so it runs off-frame left and right, with a **two-tone split mid-phrase**
  (the first half in the brand accent, the rest in ink) and a **blinking caret / cursor
  bar** for a typewriter charge. The clipping is the point: it signals confidence and
  scale. Confirm the authored line breaks hold and the meaning survives the crop. (See
  `typography.md`, `motion-and-interaction.md` kinetic type.)
- **Perspective-tilted screen-mockup clusters.** To show screen-based work (sites,
  apps) without a flat thumbnail grid, float the screenshots on an isometric plane,
  tilted in perspective, lightly parallaxed on scroll or pointer. It reads as
  art-directed product, not a contact sheet. (See `imagery-and-illustration.md`.)
- **Rotated vertical labels and count badges.** Section tags set vertically up the
  margins (`AGENCY DECK`, `COMPLETE BRIEF`, `SCROLL`), and inline count badges boxed
  next to nav items (`Work [24]`, `Team [10]`). Small editorial signals that the page
  was authored, not assembled.
- **A marquee bar as the footer cap.** A full-bleed accent strip of repeating wordmark
  or tagline (with a small recurring glyph) closing the page. (See
  `narrative-and-detail.md` marquee tickers.)

---

## The cohesion mechanics

What lets these pages be expressive on the surface and coherent underneath, the same
discipline that separates an award site from a busy one:

- **Two accents, never a rainbow.** A disciplined neutral base (near-white or
  near-black) plus exactly one loud accent and one calm accent. The loud one is the
  call-to-action and the active state; the calm one is the resting/ambient state.
- **One type system, two voices.** A single distinctive display face for the big
  statements and a single mono for everything functional (labels, meta, body, tags).
  The contrast between the two carries the whole hierarchy.
- **A primitive glyph set as the through-line.** Pick a small family of marks and reuse
  them as section icons, list bullets, vertices, and wayfinding. Repetition of a simple
  system is what makes a wild surface feel inevitable.
- **Choreography on shared tokens.** Every reveal, hover, and scrub runs on the same
  easing and duration tokens and one scroll value, so a page full of motion still feels
  like one hand made it. (See `narrative-and-detail.md` "The discipline underneath".)

---

## Archetype: the scrollytelling world

**Seen in the wild:** ON.energy's "Grid Volatility" expertise page. One
continuous monochrome isometric city, drawn like a technical illustration
with red grid lines and the brand's electric yellow as the only live color.

**The move:** the entire page is ONE persistent scene, and scroll drives a
camera through SCALE LEVELS: wide city, down to a battery farm, into a
single container drawn x-ray style, then back out. Scroll simultaneously
scrubs TIME: a fixed HUD widget shows a day clock and price ticker (1:06 AM
at 40$/h to 6:26 PM at 470$/h) synced to a demand curve, while the battery
cells in the scene visibly charge and discharge. The color legend IS the
product story: yellow means charging when energy is cheap, red means
discharging into scarcity. Nobody reads a paragraph about arbitrage; they
watch it.

**The narrative rhythm:** beats arrive as alternating cards in one fixed
slot: a black "Challenge N" card states the problem, a brand-yellow
"Solution N" card answers it, while the scene reconfigures behind them.
Chapters swap the full page background (near-black hero, to a full-viewport
brand-yellow interstitial, to the white illustrated world, to a black finale)
to reset attention. The finale exits the illustration into plain,
high-contrast stats over real photography: after twenty viewports inside a
drawing, reality lands hard.

**Reusable moves:**
- Scrub a NAMEABLE domain axis (here: time and price), not just position.
- A fixed HUD widget that translates scroll into the domain variable.
- Challenge/solution card alternation as the story's meter.
- A color legend that encodes the product's actual mechanism.
- Camera through scale levels (city, site, machine) as the tour structure.
- Full-bleed background color swaps as chapter breaks.
- Exit the world for the proof: finish on plain type, stats, and photos.

## Archetype: the total artifact metaphor

**Seen in the wild:** Niccolo Miranda's "Paper Portfolio". The portfolio IS a
newspaper: a cream sheet floating on a warm near-black desk (rgb(29,29,27),
never flat #000).

**The move:** commit to one printed artifact and let EVERY device on the
page be a device of that artifact. Masthead in blackletter with a dateline
("Amsterdam, NL"). Fat-face Didone headlines (Canopee) over a book serif
(Editorial New, Domaine Display). Drop caps opening body columns. Hairline
column rules. Work items presented as news features with captions.
Testimonials as press clippings: dashed cut-out borders and portrait
medallions. A postage stamp carrying the name, date, and signature. Service-
journalism asides ("TIP! Drag sideways to navigate") doing the UI-hint work.
The contact CTA as a ticker ribbon ("Let's create something together EMAIL
ME") looping like a stop-press band. Paper grain everywhere; imagery is
warm hand-drawn illustration, so even portraits obey the print world.

**Why it lands:** none of the newspaper devices are decoration; each one
carries real content (the stamp is the bio, the clippings are the social
proof, the TIP! is the affordance). The metaphor is the information
architecture.

**The stack lesson:** built on Webflow with GSAP and Locomotive smooth
scroll. Award-tier wow from choreography and art direction on a no-code
platform: proof, again, that the engine is not the wow.

**Reusable moves:**
- Pick the artifact, then translate EVERY page element into that artifact's
  native devices (nav, testimonials, CTAs, hints, metadata).
- Metadata as in-world ephemera: stamps, datelines, edition numbers.
- One illustration style unifying all imagery, portraits included.
- The desk trick: float the artifact on a dark textured surround so the
  page reads as a physical object with edges.

## Archetype: the one-gesture story world

**Seen in the wild:** Resn's "i-Spy" for HEIHEI (NZ kids' platform); Awwwards
SOTD and FWA. A wimmelbilderbuch (teeming picture book) hidden-object game:
six illustrated Aotearoa environments packed with thousands of hand-drawn
characters by one artist (T Wei).

**The move:** one nostalgic artifact metaphor (the road-trip postcard)
carries the entire UI: navigation, level select, and rewards are all
postcards, with design cues from classic Kiwi road signage. Interactions are
limited to the three gestures a five-year-old already knows: touch, click,
drag. Two modes (freeplay vs beat-the-clock) segment the audience without
changing the world. The wow is not an engine; it is the DENSITY of
hand-crafted detail in each scene and the warmth of the illustration.
Aesthetic register: cream field, terracotta frame, vintage slab-serif and
script pairing, characters drifting across the load screen.

**Reusable moves:**
- Radical interaction simplicity as a design feature, not a constraint:
  choose an audience's known gestures and refuse to exceed them.
- One artifact (postcard) as the entire chrome: nav, save state, rewards.
- Craft density as the wow: one committed illustration style, thousands of
  touches, zero stock.
- Border-as-frame: a strong page-edge frame turns the viewport into a scene
  the way a picture-book page does.
