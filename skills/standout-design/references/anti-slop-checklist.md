# The anti-slop pre-ship checklist

Run this before calling any frontend done. It is the gate between "competent" and
"distinctive." Two parts: the checklist, then the explicit list of generic-AI
tells to avoid.

---

## The checklist

**Concept**
- [ ] Can a stranger name the one idea in 3 seconds?
- [ ] There is a single committed aesthetic direction, not a blend of three.

**Type**
- [ ] Display face is NOT Inter / Roboto / Arial / Helvetica / system-ui.
- [ ] High-contrast pairing (display vs text); a mono or technical accent present.
- [ ] Weights and sizes pushed to extremes, not a timid 400/600 at two sizes.
- [ ] Sizes in `rem`; zoom not disabled; measure ~45-75ch.

**Color**
- [ ] One dominant tone + one sharp accent, not an even, evenly-distributed palette.
- [ ] Built in OKLCH for perceptual control.
- [ ] Atmosphere present (grain, gradient, glow, depth), not flat `#000` / `#fff`.
- [ ] No information carried by color alone.

**Layout**
- [ ] Intentional grid with at least one breakout or deliberate asymmetry.
- [ ] Not a stack of equal centered cards; not a predictable hero-features-CTA dump.

**Architecture and follow-through**
- [ ] The page structure is derived from THIS artifact (a magazine reads as a printed
      object, a festival as a poster, an app as its own UI), not the same nav +
      eyebrow + accent-word headline + CTA skeleton you would use for anything.
- [ ] You did not lean on the same one signature device (two-tone accent word, mono
      eyebrow) you reach for every time.
- [ ] You escaped the CATEGORY default in both structure AND palette (named the cliche
      look of this category and made one ownable choice against it; the palette is not
      the category's stock skin like neon-on-black for tech).
- [ ] You did not reuse your own tics: the mono-eyebrow + hyper-specific spec block,
      and the two-tone accent-color word, are not on every page out of habit.
- [ ] The concept extends into every section, especially the second/product screen.
      The hero's metaphor and type system carry through; it does not evaporate below
      the fold into a generic second screen.
- [ ] Every section holds the hero's craft level. No frame drops into a flat gradient
      block, an empty placeholder, or a visibly weaker second screen.
- [ ] Decorative ornament is structural: any systemic motif (grid, traces, diagram)
      maps to real content; no lines that connect nothing, no dead empty quadrants.
- [ ] ALL text (body copy included, not just the headline) is legible against what is
      actually behind it; motifs are kept out of every text element's box.

**Motion**
- [ ] One orchestrated load reveal that resolves into the usable page.
- [ ] Reused easing/duration tokens, not ad-hoc values per element.
- [ ] Nothing animated except `transform` / `opacity`.
- [ ] Micro-interactions feel sub-200ms and intentional.

**Detail**
- [ ] Considered hover states (not just opacity dips).
- [ ] Custom cursor and/or `::selection` styling.
- [ ] Designed empty, 404, and loading states.
- [ ] Polished, conformant focus states (see `accessibility.md`).

**Performance**
- [ ] LCP under 2.5s; INP under 200ms; CLS under 0.1.
- [ ] WebGL lazy-loaded, code-split, and IntersectionObserver-gated.
- [ ] One shared rAF loop; DPR capped at 2.
- [ ] Assets compressed (KTX2/Basis textures, draco/meshopt glTF, AVIF/WebP).

**Accessibility**
- [ ] `prefers-reduced-motion` honored with a designed fallback, not `animation: none`.
- [ ] Fully keyboard navigable; visible focus; logical Tab order.
- [ ] Semantic, selectable DOM behind any canvas; lite mode where load-bearing.
- [ ] Non-hover paths exist; WCAG 2.2 AA contrast (verify dark palettes with APCA).

**Cohesion**
- [ ] Type, color, motion, and copy speak one voice.
- [ ] Spacing, type, and motion run on scales/tokens, not magic numbers.

**The remember test**
- [ ] Is there one thing a visitor will describe to a friend? If not, it is not done.

---

## The generic-AI tells to avoid

If the work has any of these, it reads as machine-default. Replace each one.

- **Inter / Roboto / Arial / Helvetica / system-ui as the display face.** The
  single loudest tell. Pick a distinctive display face and a high-contrast text
  pairing; add a mono or technical accent.
- **Purple-to-blue gradient on white**, especially on buttons, hero blobs, and
  "AI product" headers. The default LLM palette. Commit to a real palette with one
  dominant tone and one sharp accent.
- **Equal, evenly-centered card grids.** Three or four identical rounded cards in a
  symmetric row. Break the grid: vary card sizes, introduce asymmetry or a breakout
  element, let one item dominate.
- **Predictable layouts** - hero, then three feature cards, then a centered CTA,
  every section the same width and rhythm. Vary section structure; use the grid as
  a compositional tool, not a stack.
- **Timid, evenly-distributed palettes** where every color gets equal weight and
  nothing is dominant or accent. Pick a clear hierarchy: one tone owns the page,
  one accent punctuates.
- **Flat `#000` / `#fff` with no atmosphere.** Pure black and pure white with no
  grain, gradient, glow, or depth reads as unfinished. Add a near-black or
  near-white with a tint, plus a texture or atmospheric layer.
- **Generic everything-the-same easing** (linear or a single default cubic-bezier
  on everything). Tokenize a "productive" ease for functional moves and an
  "expressive" ease for delight.
- **No first-3-seconds hook, no detail craft** (default focus rings, no hover
  thought, default 404/empty states). Distinctiveness lives in the details as much
  as the hero.
- **The same page skeleton for every brief.** Nav, mono eyebrow strip, one giant
  headline with a single accent-colored word, supporting copy, paired CTAs. It is a
  template tell when a dev tool, a magazine, and a festival share one architecture.
  Derive structure from the artifact instead.
- **The category-default skin.** Avoiding Inter-on-white but landing on dev-tool
  near-black + neon-green + clean grotesque, or the synthwave striped-sun + scanlines +
  pink/cyan starter pack, or the AI-product violet. Category stock is still stock.
- **Killer hero, broken second frame.** A strong first screen followed by a flat
  gradient placeholder, an empty block, or a markedly weaker section. Finish past the
  fold; every frame earns its place.
- **Critical text fighting its background.** The brand name or hero line placed over a
  busy gradient, a bright shape, or scanlines so it loses legibility. The most
  important words must read instantly; knock them out, plate them, or move them. This
  applies to body copy too: motifs (traces, grids, textures) running through any text
  is a fail.
- **The concept that evaporates below the fold.** A striking metaphor in the hero that
  vanishes on the next screen, leaving a generic product UI or a plain section. The
  idea must escalate through the page, especially onto the product/second screen.
- **The category-default palette.** A fresh concept rendered in the category's stock
  colors (neon/green-on-black for tech and electronic, violet for AI, candy gradients
  for consumer). Concept does not excuse a default palette; change the palette too.
- **Decorative-not-structural ornament.** Circuit traces that connect nothing, grid
  lines as pure texture, diagrams that do not map to content, and dead empty quadrants.
  Atmosphere cosplaying as a system reads as filler. Every motif should carry meaning
  or be cut.
- **Your own repeated signature.** Even bespoke instincts become a template when
  reused every time: the mono eyebrow plus a hyper-specific spec block, or the
  one-accent-colored word in the headline, on every single page. Vary the device.
