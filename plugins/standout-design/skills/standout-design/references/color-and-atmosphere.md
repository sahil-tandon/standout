# Color and atmosphere: the "expensive" surface

Color choice and surface atmosphere are what separate a flat, generated-looking page
from one that feels art-directed and built. The two biggest moves: commit to a
dominant color with a single sharp accent (never an even palette), and layer
atmosphere (gradients, grain, glass, glow) on top of a disciplined OKLCH system so the
surface feels physical rather than digital-flat.

## Contents

1. [Palette strategy: dominant color plus one accent](#palette-strategy-dominant-color-plus-one-accent)
2. [Build the palette in OKLCH](#build-the-palette-in-oklch)
3. [Relative color syntax and color-mix](#relative-color-syntax-and-color-mix)
4. [Aurora and mesh gradients](#aurora-and-mesh-gradients)
5. [Grain and noise overlays (highest leverage)](#grain-and-noise-overlays-highest-leverage)
6. [Glassmorphism done right](#glassmorphism-done-right)
7. [Glow, vignette, dithering, layered transparency](#glow-vignette-dithering-layered-transparency)

---

## Palette strategy: dominant color plus one accent

**A dominant color plus one sharp accent beats a timid, evenly-distributed palette.** A
page that is mostly one confident color (or near-monochrome) with a single high-chroma
accent reserved for CTAs and key type reads as art-directed. A palette where four or
five colors get equal airtime reads as indecisive and template-built.

Winning archetypes:

- **Monochrome plus one accent.** Near-black UI with a single electric accent (acid
  green, hot orange, ultramarine) reserved for CTAs and key type.
- **Duotone.** Map an image or section to exactly two colors (shadows to color A,
  highlights to color B) via `filter`/blend or an SVG `feColorMatrix`. Instantly
  cohesive.
- **High-contrast.** Large light/dark jumps create drama and focus.
- **Crafted dark mode.** Never flat `#000`. Layer near-blacks with a warm or cool tint,
  add subtle gradients, glow, and grain (below).
- **Light editorial.** Warm off-white or paper background, near-black serif, one ink
  accent. The print-magazine register.

**Anti-tells (the generated look):** purple/blue gradients on white, evenly-weighted
rainbow palettes, pure `#000`/`#fff` with no atmosphere.

---

## Build the palette in OKLCH

**OKLCH** (Oklab-based, shipped in all major browsers) is the standard for design-system
color because it is **perceptually uniform**: lightness stays consistent across hues,
and L / C / H are orthogonal. You can build an entire palette by holding L and C and
rotating H, or generate tints and shades by moving only L, without the muddy, uneven
results HSL gives.

Syntax: `oklch(L C H)`. L is 0-1 (or %), C is chroma (0 to ~0.37), H is 0-360.

```css
:root {
  --brand-h: 265;
  --accent:  oklch(0.72 0.19 30);                  /* sharp warm accent */
  --bg:      oklch(0.18 0.02 var(--brand-h));       /* near-black, faint tint */
  --surface: oklch(0.24 0.03 var(--brand-h));
  --text:    oklch(0.95 0.01 var(--brand-h));
}
```

OKLCH also produces the smoothest **gradients** because interpolation is perceptually
linear (no gray dead-zone mid-gradient): use `linear-gradient(in oklch, ...)`.

Theme by overriding the variables on a selector like `[data-theme="light"]`; everything
downstream recomputes from the same tokens.

---

## Relative color syntax and color-mix

**Relative color syntax** derives variants from a base color, keeping the system DRY.
Pull apart the base into its `l`, `c`, `h` channels and recombine with `calc()`:

```css
--accent-hover: oklch(from var(--accent) calc(l + 0.06) c h);
--accent-muted: oklch(from var(--accent) l calc(c * 0.5) h);
```

**`color-mix()`** blends two colors in a chosen space, ideal for tints, borders, and
glass overlays without hand-picking values:

```css
--border: color-mix(in oklch, var(--text) 12%, transparent);
--glass:  color-mix(in oklch, var(--surface) 60%, transparent);
```

Both functions let you maintain one source-of-truth accent and compute every hover,
border, and overlay from it, so a theme change is a single edit.

---

## Aurora and mesh gradients

A **mesh gradient** uses multiple color points across a canvas, each radiating its own
field, blending into organic shapes. It is the backbone of the modern aurora /
glassmorphism backdrop. The CSS approximation: stack several large, soft
`radial-gradient`s at different positions over a near-black base.

```css
.aurora {
  background:
    radial-gradient(40% 50% at 20% 30%, oklch(0.7 0.2 300 / .6), transparent 70%),
    radial-gradient(45% 55% at 80% 20%, oklch(0.75 0.18 220 / .5), transparent 70%),
    radial-gradient(50% 60% at 60% 80%, oklch(0.7 0.2 20 / .45), transparent 70%),
    oklch(0.16 0.02 270);                 /* near-black base */
  filter: saturate(1.1);
}
```

Specify the base in OKLCH and the orbs at high chroma with low alpha so they bleed into
each other. Animate by translating the gradient positions over time, or use a
Canvas/WebGL mesh-gradient shader (the Stripe-style approach) for true organic motion.

These vibrant orbs floating behind the UI are also exactly what makes glassmorphism
legible (below): glass needs something complex to refract.

---

## Grain and noise overlays (highest leverage)

Grain breaks the flat digital plane and makes gradients and dark surfaces feel filmic.
It is the single highest-leverage "expensive" detail. Technique: generate Perlin/fractal
noise with the SVG `feTurbulence` filter, embed it as a data URL, overlay at low opacity.

**The base noise SVG:**

```html
<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="noiseFilter">
    <feTurbulence type="fractalNoise" baseFrequency="0.65"
                  numOctaves="3" stitchTiles="stitch" />
  </filter>
  <rect width="100%" height="100%" filter="url(#noiseFilter)" />
</svg>
```

Key knobs:

- **`baseFrequency`** sets grain scale (higher = finer/denser grain). Use ~0.6 to 0.9
  for film grain, lower for clouds.
- **`numOctaves`** adds detail (more octaves = richer noise).
- **`type="fractalNoise"`** gives soft grain; `"turbulence"` gives harsher noise.
- **`stitchTiles="stitch"`** makes the noise tile seamlessly.

**Grainy gradient** (noise dithering a gradient): layer the noise over a gradient and
crush both with filters so the grain dithers the color band.

```css
.noise-gradient {
  background:
    linear-gradient(to right, blue, transparent),
    url(/noise.svg);
  filter: contrast(170%) brightness(1000%);
}
```

**The production overlay pattern (use this as the default):** inline the SVG as a data
URL so there is no extra request, repeat-tile it, keep opacity low, and never block
clicks.

```css
.grain::before {
  content: "";
  position: absolute; inset: 0;
  pointer-events: none;            /* never block clicks */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 600'%3E%3Cfilter id='a'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E");
  background-size: 182px;          /* grain scale */
  opacity: 0.12;                   /* subtlety is everything */
}
.grain { position: relative; }
.grain > * { position: relative; z-index: 1; }  /* content above grain */
```

Keep opacity around 0.08 to 0.12. Subtlety is the whole point: visible grain reads as a
mistake, perceptible grain reads as film.

**Encoding note:** when inlining the SVG, URL-encode it (`#` becomes `%23`, `%` becomes
`%25`). A URL-encoder or `encodeURIComponent` handles it.

**Animated film grain:** swap the `::before` background between a few pre-baked noise
frames via `@keyframes` with `steps()`, or render noise to a `<canvas>` and repaint per
frame. `feColorMatrix` / `feComponentTransfer` on the alpha channel lets you tune grain
density and contrast inside the filter itself.

---

## Glassmorphism done right

The glass effect is **invisible on flat black and looks cheap on flat white**. It needs
a complex background (the aurora/mesh above) showing through. Three decisions make or
break it: where light comes from, shadow strength, and what color sits behind the glass.

```css
.glass {
  background: color-mix(in oklch, white 8%, transparent);  /* tint, don't rely on blur alone */
  backdrop-filter: blur(16px) saturate(1.2);
  border: 1px solid color-mix(in oklch, white 18%, transparent);
  box-shadow: 0 8px 40px oklch(0 0 0 / .35),
              inset 0 1px 0 oklch(1 0 0 / .15);             /* top edge highlight */
}
```

Two details that separate real glass from a flat blur:

- **A semi-transparent solid tint (10-30%)** paired with the blur, so text on the glass
  stays legible. Blur alone is not enough.
- **An inset top-edge highlight** (`inset 0 1px 0 ...`) that simulates light catching
  the top lip of the panel.

For dark variants, boost panel opacity slightly, add darker borders and stronger inner
shadows. Use glass as an **accent** (a card, a nav bar, a modal), not the whole
interface.

---

## Glow, vignette, dithering, layered transparency

**Glow:** layered `box-shadow` or `filter: drop-shadow` in the accent hue, or a blurred
duplicate of the element sitting behind it. In OKLCH, keep the glow at high chroma and
slightly higher lightness than the element so it reads as emitted light.

**Vignette:** a radial dark edge that focuses the center, applied as an overlay.

```css
.vignette {
  background: radial-gradient(120% 120% at 50% 40%, transparent 55%, oklch(0 0 0 / .55));
}
```

**Dithering:** for a retro or print feel, reduce smooth gradients to a constrained
palette with an ordered-dither (Bayer matrix), or reuse the grain-over-gradient trick
above, which is a lightweight perceptual dither.

**Layered transparency:** stack translucent panels to add depth without introducing new
colors. Each semi-transparent layer over the aurora reads as a new plane of the same
material.

---

## Deriving variations from one color (the S/B seesaw)

The core palette skill is not picking many colors; it is modifying ONE base
color into many correct variations. Work in HSB (or OKLCH L/C):

- **Darker variant = lower Brightness AND higher Saturation.** Lowering
  brightness alone adds black and reads muddy; real shadows are more
  saturated.
- **Lighter variant = higher Brightness AND lower Saturation** (adding white).
- **Hue nudging (refinement):** hues differ in inherent luminosity. Darkening?
  nudge hue a few degrees toward the nearest of 0/120/240 (red/green/blue).
  Lightening? toward 60/180/300 (yellow/cyan/magenta). Shifts are tiny (1-5
  degrees).
- Workable defaults (extrapolated, tune by eye): hover S+8..12 B-8..12;
  pressed S+15..20 B-15..20; tinted background same hue at S 4..8, B 95..98.

## Tinted neutrals, never flat gray

Pure grays (`#f5f5f5`, `#808080`, `#333`) almost never occur in the real
world and instantly read un-art-directed. Tint every neutral with the brand
hue: in OKLCH, keep the hue, set C around 0.01-0.02, and ramp L from about 97
down to 12; allow slightly more chroma at the dark end. Cool-tinted grays
read tech and clean; warm-tinted grays read organic, editorial, premium
print. This one move makes an entire page feel intentionally colored before a
single accent lands.

## The constant-L trick (contrast you can guarantee)

OKLCH is perceptually uniform: equal L is equal perceived brightness across
hues. So derive semantic colors (success, warning, error, info) by keeping L
and C fixed and rotating only H. Identical L means identical contrast ratios:
verify the pair once, and every derived hue passes with it. High-chroma
corners can exceed sRGB; clamp to the nearest in-gamut value and keep hex
fallbacks.

## Dark mode is a derivation, not an inversion

- Never pure `#000` (halation with light text). Base surface at OKLCH L
  10-15, tinted with the brand hue.
- **Elevation is lighter surfaces, not shadows:** base L 10, cards L 14-16,
  popovers L 18-20; each 3-4 L points reads as one layer up.
- **Desaturate per hue:** light-mode saturations vibrate on dark. Blues and
  cyans need roughly 20-30 percent less saturation; reds and oranges only
  10-15; greens like a 3-5 degree shift toward teal; yellows want a redesign
  toward amber, not desaturation.
- Body text is off-white (around 87 percent), never pure white.

## What award-tier sites do with color

- **Commit to a dominant color MASS.** Winners flood the viewport with a
  committed tone (deep green, cream, ink, acid brights); white becomes the
  secondary. A white page with a timid accent is the template look.
- **Vibrant complementary tension, modulated:** saturated non-adjacent pairs,
  but the vivid notes sit inside muted neutral fields that direct the eye.
- **Atmospheric gradients as environment,** not decoration: multi-stop,
  evoking natural light, always with grain over them to kill banding.
- **Duotone as identity:** two colors carrying the whole site (including
  duotone-mapped photography) reads instantly art-directed and unifies
  inconsistent imagery.
- **Unexpected category palettes:** keep ONE cue from the category
  (typography or imagery) and break the color expectation, so it reads
  intentional rather than wrong. Nutrition in night-shift near-blacks,
  banking in warm cream, water in metal-band black.

## Style-to-palette pairings (starting points, not laws)

| Style | Characteristic palette |
|---|---|
| Organic Calm | rice-paper, oat, sand, charcoal (never `#000`), muted matcha or clay accent |
| Art Deco | ink black + metallic gold + one jewel tone (emerald, sapphire, oxblood); cream as the light neutral |
| Cyberpunk Terminal | tinted near-black + 1-2 neons (acid yellow, cyan, magenta) with glow; or phosphor green |
| Neo-Brutalism | 2-3 bold flats max: black + cream + one loud hue; no gradients |
| Minimal/Swiss | white + black + one primary (classically red) |
| Editorial / Quiet Luxury | cream or ivory + ink + one deep accent (bordeaux, forest, navy); warm grays |
| Cottagecore | butter yellow, sage, dusty rose, cream, gingham red |
| Mid-Century | mustard, burnt orange, teal, olive, cream; desaturated warmth |
| Cinematic Noir | desaturated near-black world + one hot accent + off-white type |
| Glass & Aurora | one committed dark base + 2-3 analogous glow hues, grain over everything |
| Synthwave / Y2K | deep purple base + neon magenta/cyan; or chrome + holo pastels |
| Dark Academia | espresso, forest, brass, parchment |

For the palette-variant round of the picker (3-4 options per chosen style,
varied on value / temperature / volume axes), see `style-picker.md`.
