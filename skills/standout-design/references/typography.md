# Typography: the highest-leverage lever

The typeface is the single biggest tell of unguided, AI-generated frontend. Getting
type right moves a design from "template" to "designed" faster than any other single
decision. Internalize the classic: web design is roughly 95% typography.

## Contents

1. [The anti-generic rule](#the-anti-generic-rule)
2. [High-contrast pairing](#high-contrast-pairing)
3. [Display vs body: two different jobs](#display-vs-body-two-different-jobs)
4. [The named faces](#the-named-faces)
5. [Free and variable, ship-ready](#free-and-variable-ship-ready)
6. [Foundries and free sources](#foundries-and-free-sources)
7. [Technique: fluid type with clamp](#technique-fluid-type-with-clamp)
8. [Technique: variable-axis animation](#technique-variable-axis-animation)
9. [Technique: split-text mask reveals](#technique-split-text-mask-reveals)
10. [Technique: stroke, gradient, blend-mode text](#technique-stroke-gradient-blend-mode-text)
11. [Marquees, justified columns, type-as-hero](#marquees-justified-columns-type-as-hero)

---

## The anti-generic rule

LLMs and site builders converge on the statistical center of their training data
(marketing pages), so the default output is **Inter / Roboto / Arial / Open Sans /
Lato / system-ui** paired with a system fallback. That combination, plus blue-purple
gradients and vague oversized headlines, is the fingerprint of statistical
convergence. Inter in particular is the default in nearly every AI tool and component
library, so it reads as "never intentionally styled."

**Rule:** never ship Inter/Roboto/Arial/system as the display face. Pick one
distinctive typeface and use it decisively.

Quick replacements by register when you need a fast, safe-but-not-generic pick:

| Register | Use instead of system fonts |
|----------|------------------------------|
| Code / technical | JetBrains Mono, Fira Code, Space Grotesk, IBM Plex Mono |
| Editorial / literary | Fraunces, Newsreader, Crimson Pro, Playfair Display |
| Startup / product | Clash Display, Satoshi, Cabinet Grotesk |
| Technical body | IBM Plex family, Source Sans 3 |
| Distinctive / characterful | Bricolage Grotesque, Fraunces |

---

## High-contrast pairing

The award-tier move is **high contrast between two faces**, not two similar
sans-serifs. High contrast reads as interesting and deliberate.

- **Pair across categories:** display serif + grotesque, or geometric sans + serif,
  plus an optional mono accent.
- **Push weight to extremes:** 100/200 against 800/900, not 400 against 600.
- **Push size jumps to 3x or more,** not 1.5x.
- **Two families max.** A third is justified only when it fills a specific role (mono
  for labels and code).
- **A mono accent** on labels, captions, coordinates, timestamps, and nav micro-text
  instantly signals intentional, technical craft. This is the cheapest "designed"
  signal available.

Proven pairings and the feeling each produces:

| Pairing | Feeling | Best for |
|---------|---------|----------|
| PP Editorial New (display serif) + PP Neue Montreal (grotesque) | Timeless, sophisticated | Versatile editorial/branding |
| PP Editorial New + Formula | Rigour against refined elegance | Long-form + impactful posters |
| PP Editorial New + Fraktion (+ Fraktion Mono) | Vintage charm, technical contrast | Unusual, inviting combos |
| High-contrast serif heading + geometric sans body | Classic magazine hierarchy | Most editorial layouts |
| Display face + mono accent | Engineered, precise | Tech / portfolio detail text |

---

## Display vs body: two different jobs

Display and body are different jobs and need different criteria.

- **Pick the hero face for character.** It can be ornate, condensed, extreme.
- **Pick the body/UI face to go unnoticed.** Optimize for two things:
  1. **Scalability:** readable from tiny labels to large headlines. Very thin or
     ornate faces, and many serifs, break down at small sizes.
  2. **Unambiguous letterforms:** distinguishable `1` / `I` / `l` and `0` / `O`. The
     classic failure is Gill Sans's flag-less `1`, nearly identical to `I`/`l`.

A bold, characterful display face over a deliberately boring, hyper-legible body is a
feature, not a compromise. For product/app UI, run a display cut for headings over a
body cut for reading, the way the "Linear look" does.

---

## The named faces

The faces that actually recur on award sites. Pick on feeling.

**Grotesque workhorses (the "designed" sans):**
- **PP Neue Montreal** (Pangram Pangram): the tasteful upgrade from Inter. Warmth
  with precision, character with clarity; display spirit but works as UI/body. The
  most common "upgrade from Inter."
- **Söhne** (Klim): Akzidenz-Grotesk "remembered through Helvetica." Confident,
  premium, neutral-but-warm. Heavy in fintech and high-end agency work.
- **ABC Diatype** (Dinamo): neo-grotesque, slightly mechanical, gallery-grade.
- **GT America** (Grilli Type): bridges American Gothic and European neo-grotesque;
  broad weight/width range, an editorial-system workhorse.
- **Roobert** (friendly-geometric), **Apparat** (humanist with flared terminals,
  warm literary-tech).

**Display serif heroes:**
- **PP Editorial New** (Pangram Pangram): revival of 1970s-80s display serifs,
  flowing curves, pointed terminals. Refined, elegant, slightly nostalgic. The go-to
  oversized hero serif.
- **GT Super** (Grilli Type): same display-serif lineage, magazine-cover energy.
- **Migra** (Pangram Pangram): high-contrast display serif/sans hybrid, luxurious and
  editorial.
- **Bigilla, Magilio:** chic editorial serifs with ligatures and alternates.

**Mono accents (reads "engineered"):**
- **Fraktion Mono** (Pangram Pangram), **JetBrains Mono**, **Space Mono**, **IBM
  Plex Mono.** For labels, captions, coordinates, timestamps, nav micro-text.

---

## Free and variable, ship-ready

Variable fonts are highest value: one file replaces many static weights (smaller
total download) and the axes are animatable.

- **Geist** (Vercel): clean technical sans + mono, open source.
- **Satoshi, Cabinet Grotesk, Chillax, Pangram Sans Rounded:** free for commercial
  use via Fontshare.
- **Clash Display:** bold variable display, free (Fontshare).
- **Bricolage Grotesque, Nohemi, Unique:** characterful and free.
- **Fraunces, Newsreader, Source Serif, Spectral:** Google Fonts editorial serifs
  that escape the Inter trap while staying free and variable.

More free display character (verify license per font before shipping):
- **Humane:** ultra-condensed, towering caps, an award favorite for oversized
  vertical hero type. The single best free addition for big-type heroes.
- **THUNDER:** heavy condensed impact face.
- **Subjectivity:** geometric display family (multiple styles), versatile.
- **Mango Grotesque** (variable), **Melody** (variable), **Mersad** (variable).
- **Heming:** free variable *monospace*, rare and useful for the technical accent.
- **OffBit:** pixel/grid display, ideal for retro-technical/HUD directions.
- **Migha, Galgo Condensed, Aalto Display, Wagon Display, Rockstar Display:** varied
  display energy.
- **Cotta, Ranade, Saint Regus, Harmond, Magilio:** free hero serifs.
- **Avenue Mono:** free mono accent.

---

## Foundries and free sources

- **Pangram Pangram:** free to try fully, license to ship. Neue Montreal, Editorial
  New, Migra, Fraktion, Formula; Satoshi, Cabinet Grotesk, Chillax free. The best
  price/quality entry point.
- **Klim Type Foundry:** Söhne, Calibre, Tiempos, Untitled. Premium.
- **Grilli Type:** GT America, GT Super, GT Sectra, GT Flexa. Swiss precision with
  character.
- **Dinamo:** ABC Diatype, ABC Favorit, ABC Monument Grotesk. Strong variable support.
- **Fontshare:** free for personal and commercial (Ranade, Satoshi, Clash Display,
  Cabinet Grotesk, Chillax).
- **atipo** (pay-what-you-want), **Dirtyline Studio** (free display), **gluk fonts**
  (experimental free), **Free Faces** (freefaces.gallery), and variable-filtered
  **Google Fonts**.

---

## Technique: fluid type with clamp

One formula scales font-size continuously between viewport bounds, no breakpoints.
Pattern: `clamp(MIN, PREFERRED_WITH_VW, MAX)`.

```css
:root {
  /* min 2rem at 320px viewport -> max 8rem at 1440px viewport */
  --step-hero: clamp(2rem, 1rem + 6vw, 8rem);
  --step-body: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
}
h1 { font-size: var(--step-hero); line-height: 0.95; }
```

The `vw` slope creates the truly fluid feel; the `rem` base keeps it from collapsing
below readability and respects user zoom. Compute the slope from a min/max viewport +
size pair with a generator (clampgen.com, Utopia.fyi). Oversized display type (hero
filling most of the viewport, line-height under 1, tight tracking) is a recurring
move, and clamp makes it safe across widths.

---

## Technique: variable-axis animation

A variable font carries many styles along **axes**. Registered axes use lowercase
4-letter tags: `wght`, `wdth`, `slnt`, `ital`, `opsz`. Custom axes use uppercase.

Declare with ranges so normal CSS props drive them:

```css
@font-face {
  font-family: "Favorit Variable";
  font-weight: 300 700;       /* range, not a single value */
  font-stretch: 50% 150%;
  src: url("/fonts/FavoritVariable.woff2") format("woff2-variations");
}
```

`font-variation-settings` is fully animatable: transition on hover, keyframe on
scroll, or drive from a scroll timeline.

```css
.headline {
  font-variation-settings: "wght" 300, "wdth" 100;
  transition: font-variation-settings 0.3s ease;
}
.headline:hover {
  font-variation-settings: "wght" 800, "wdth" 80, "ital" 12;
}
```

**Per-character wave** (the classic kinetic effect): split text into chars, then in a
`requestAnimationFrame` or GSAP loop offset each char's `wght`/`wdth` by its index +
time. This yields ripple and wave headlines. Pair with Splitting.js or GSAP SplitText
for the character wrappers.

---

## Technique: split-text mask reveals

The signature award-site text move: each line slides up from behind a clipping mask,
so text appears to emerge from nothing. Mechanism: wrap each line in an
`overflow: hidden` container, then translate the inner text from 100% to 0.

GSAP SplitText (free in GSAP 3.13+) splits an element into chars, words, and/or
lines. `mask:"lines"` auto-wraps each line in an `overflow:hidden` clip, keeps the
text accessible to screen readers, and re-splits responsively.

```js
const split = SplitText.create(".headline", { type: "lines,words", mask: "lines" });
gsap.from(split.words, {
  yPercent: 120, opacity: 0, duration: 0.9,
  ease: "expo.out", stagger: 0.04,
});
```

Manual masking when you want full control of the wrapper:

```js
gsap.registerPlugin(SplitText, ScrollTrigger);

const split = new SplitText(".headline", { type: "lines", linesClass: "line" });
split.lines.forEach(line => {
  const wrap = document.createElement("div");
  wrap.style.overflow = "hidden";
  line.parentNode.insertBefore(wrap, line);
  wrap.appendChild(line);
});

gsap.from(split.lines, {
  yPercent: 100,        // start fully below the mask
  duration: 1,
  ease: "power4.out",
  stagger: 0.12,        // the "waterfall" cadence
  scrollTrigger: { trigger: ".headline", start: "top 80%" }
});
```

Per-character stagger (scramble / wave / staggered fade):

```js
const s = new SplitText(".title", { type: "chars" });
gsap.from(s.chars, { opacity: 0, yPercent: 50, stagger: 0.02, ease: "back.out(2)" });
```

**Free alternatives to SplitText:** Splitting.js (adds `.char`/`.word` spans + CSS
custom props like `--char-index` for pure-CSS staggered transitions), SplitType
(lightweight chars/words/lines), or a hand-rolled `Array.from(text).map(...)`. Pair
any of these with `IntersectionObserver` to avoid GSAP entirely. Orchestrate the
whole load reveal (logo, nav, hero, CTA) on one timeline with offset start times so
it reads as a single choreographed moment, not parallel fades.

---

## Technique: stroke, gradient, blend-mode text

**Outline (stroke) display type** for hollow hero letters, often layered behind
filled text for depth:

```css
.outline {
  -webkit-text-stroke: 2px currentColor;
  color: transparent;        /* hollow */
}
```

`-webkit-text-stroke` is widely supported; unprefixed `text-stroke` is not. For an
outer stroke or broader support, emulate with layered `text-shadow`.

**Gradient / image-clipped text** fills glyphs with a gradient or photo:

```css
.gradient-text {
  background: linear-gradient(90deg, #ff5e3a, #ffd166);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

**`mix-blend-mode` text** inverts against whatever scrolls behind it (the classic
white-on-anything trick, used for fixed nav and cursor-following type):

```css
.invert-text { color: #fff; mix-blend-mode: difference; }
```

**Mask reveals:** animate a `mask-image` or `clip-path` to wipe text in, or use a
WebGL fluid-distortion mask revealing a background image only through a text-shaped
cutout. Advanced fill: grainy gradient text via `background-blend-mode: color-burn`
on conic + radial gradients clipped to glyph shapes, for a shimmering fluid fill.

---

## Marquees, justified columns, type-as-hero

- **Marquees:** infinite horizontal scrollers of oversized type. Use a duplicated
  track plus a CSS keyframe (`transform: translateX(-50%)`) or GSAP for a seamless
  loop with scroll-velocity-reactive speed (faster scroll = faster, skewed marquee).
  Avoid the deprecated `<marquee>` element.
- **Justified editorial type:** `text-align: justify` with `hyphens: auto` and a
  tight measure for magazine columns; pair with a high-contrast serif for the
  literary feel.
- **Type-as-hero / oversized display:** let one headline in a display serif or heavy
  grotesque fill 60-90% of the viewport, `line-height` 0.9-1.0, negative
  letter-spacing. Combined with `clamp()` and a split-text reveal, this is the
  canonical award hero.
