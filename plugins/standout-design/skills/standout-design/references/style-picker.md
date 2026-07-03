# The style picker: show, don't name

Users cannot be expected to know what neoclassical, japandi, or neo-brutalism
mean. Naming styles at them produces mismatched expectations; showing them
rendered options produces confident picks and an end result that matches what
they imagined. This is the workflow for the "show, don't name" step.

## When to run it (and when not to)

Run the picker when the user asked for a build and the direction is genuinely
open ("make me a site for my bakery"). Skip it entirely when:
- the user already named a direction ("make it brutalist", "keep it like X"),
- you are iterating on an existing design (its direction is fixed),
- the user explicitly delegates ("you pick", "surprise me"),
- the artifact is trivially scoped (one button, one email template).
The picker is for "build me a thing" moments. It must never add friction where
it has no decision to inform.

## Round 1: styles

1. **Curate 4-6 styles** from `design-styles-catalog.md` that genuinely fit
   the brief. Rules:
   - Span families: at least one calm, one loud, one dark, one unexpected.
   - Never two near-neighbors (japandi vs scandinavian) in one menu.
   - Every option must be defensible for THIS brief. No filler; if only four
     styles genuinely fit, show four.
   - Respect polarity locks and the do-not-offer list in the catalog.
2. **Build the tasting menu**: one self-contained HTML file (no external
   requests, system-font fallback stacks from the tile recipes). Write it to
   scratch space (the session scratchpad, or an OS temp dir), never into the
   user's repo.
3. **Open it in the browser** (Chrome tools when available; otherwise `open
   <file>` on macOS / `xdg-open` on Linux).
4. **Ask for the pick in chat**: AskUserQuestion when available (one option
   per tile, same numbering), plain chat otherwise. Offer "none of these" as
   an escape hatch; if taken, ask what felt wrong and re-curate once.

## Tasting-menu anatomy

The page is itself a designed artifact (it sells the skill), but its chrome
must stay neutral so tiles do the talking: near-white page, small mono
caption labels, tiles in a responsive grid (2-3 columns desktop, 1 column
under 700px).

Each tile is a **mini-hero of the user's actual project**, not a generic
demo:
- the user's real brand name / product name,
- their real (or drafted) headline and one support line,
- the subject matter implied by the brief (a menu line for a restaurant, a
  metric for a dashboard),
- executed with the style's tile recipe (bg, ink, accent, font stack, one
  signature device).
Content is IDENTICAL across tiles; only the style varies. That is what makes
the comparison honest.

Tile chrome: a number badge ("1"), the style's display name, and a one-line
layperson essence from the catalog ("Gatsby glamour", "spa quiet"). Never
jargon.

Skeleton (adapt, do not copy blindly):

```html
<main class="menu">
  <header>
    <h1>Pick a direction for {PROJECT}</h1>
    <p>Same content, six treatments. Reply with a number (or "none").</p>
  </header>
  <section class="tiles">
    <article class="tile" id="s1">
      <div class="chrome"><b>1</b> Art Deco: Gatsby glamour</div>
      <div class="hero s1-hero"><!-- mini-hero in the style --></div>
    </article>
    <!-- ...one article per style... -->
  </section>
</main>
```

Hard requirements for every tile:
- All text legible against what is behind it (contrast-check the accent).
- The style must be recognizable at tile size: lead with its loudest device
  (the sunburst, the gingham, the scanlines), not its subtlest.
- No external fonts, images, or scripts; fake imagery with gradients, CSS
  shapes, and inline SVG.
- Note under the grid: "Type shown uses system stand-ins; the real build gets
  proper webfonts."

## Round 2: palettes

For the chosen style, generate 3-4 palette variants and show them the same
way (new file, same mechanics). Variants must differ on real mood axes, not
hex noise:

- **Value:** dark dominant with light type vs light dominant with dark type.
  Always include at least one of each unless the style is polarity-locked.
- **Temperature:** warm neutrals and accent vs cool neutrals and accent.
- **Volume:** high-chroma accent and strong contrast vs muted tonal palette
  where the accent is a deep tone.

Recipe: variant 1 is the style's canonical palette executed well; each other
variant moves ONE axis hard. Name each variant evocatively and give a
one-line mood rationale. Hold typography and layout identical across tiles so
the user compares color only. Derive all neutrals by tinting with the
variant's anchor hue (see `color-and-atmosphere.md`); verify accent-on-
dominant contrast at 4.5:1 for any text-bearing use.

Worked example (Quiet Luxury):

| Variant | Dominant | Secondary | Accent | Axis |
|---|---|---|---|---|
| Midnight Gold | warm near-black (L 12) | charcoal (L 18) | gold `#c9a227` | dark, warm, loud |
| Gallery Cream | ivory `#f7f2e9` | warm gray-brown | bordeaux `#6b1f2a` | light, warm, quiet |
| Midnight Champagne | deep navy (L 14) | slate | champagne `#e8d5b0` | dark, cool, quiet |
| Noir Emerald | black + white | tinted gray | emerald `#0e5c4a` | dark, cool, loud |

## Record the choice

Stamp the decision into the build so any later session can pick up the
thread. At the top of the primary stylesheet (or the page's `<style>`):

```css
/* standout-design: style=quiet-luxury palette=midnight-gold (picked 2026-07-03) */
```

If the user picked with modifications ("2 but warmer"), record the
modification too. Then proceed to the visual system step with the direction
fixed: the picker's output is exactly the "committed direction" the method
requires.

## Failure modes to avoid

- **Six near-identical tiles.** If the styles do not read as different at a
  glance, the curation failed; re-read the family map.
- **Generic demo content.** Tiles about "ACME" teach the user nothing about
  their own project. Always their content.
- **Swatch strips for palettes.** Non-designers cannot evaluate swatches;
  they can evaluate a rendered mini page.
- **The lazy default hidden as an option.** Do not slip indigo-gradient-on-
  white in as filler; every option must pass the catalog's bar.
- **Treating the pick as final art.** The tile is a promise, not the design;
  the real build still goes through the full method, wow bar included.
