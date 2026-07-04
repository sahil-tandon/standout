# Design styles catalog: the picker set

The named styles the skill can offer, curate from, and execute. Built for the
"show, don't name" step: each style carries a one-line essence a layperson can
feel, a visual signature, fit guidance, and a tile recipe for rendering a
convincing mini-preview with zero external requests (system font stacks only;
the real build upgrades to proper webfonts). Use with
`references/style-picker.md` for the workflow.

Curation reminder: offer 4-6 styles spanning different families below. Never
offer two near-neighbors (japandi vs scandinavian) in the same menu.

## The core sixteen

### 1. Minimal / Swiss
- **Essence:** "Clean and confident." Grid, whitespace, one red accent; quietly authoritative.
- **Signature:** Neo-grotesque sans at extreme size contrast, flush-left; black/white plus one accent; visible modular grid, asymmetric balance; no texture; crisp functional motion.
- **Fits:** Agencies, architecture, SaaS wanting credibility, cultural institutions, portfolios.
- **Tile recipe:** bg `#fbfbfb`; ink `#111`; accent `#e30613`; font `"Helvetica Neue", Helvetica, Arial, sans-serif`; device: 90px headline vs 12px meta, hairline column rule, big index number "01".

### 2. Editorial
- **Essence:** "Like a beautiful magazine." Art-directed print energy: serifs, drop caps, pull quotes.
- **Signature:** Expressive serif display + sans body, small-caps kickers, bylines; paper white/cream, ink, one editorial accent; mixed column widths, hairline rules; parallax images on scroll.
- **Fits:** Content brands, journals, luxury commerce, restaurants, personal essays.
- **Tile recipe:** bg `#f7f4ee`; ink `#1a1a1a`; accent `#8b2635`; display `Georgia, "Times New Roman", serif` with 11px letterspaced caps kicker; device: drop cap via `::first-letter`, italic pull quote crossing a hairline rule.

### 3. Quiet Luxury
- **Essence:** "Expensive and calm." Money whispering: one exquisite serif, acres of space.
- **Signature:** High-contrast serif; black/ivory/taupe plus at most one metallic; tiny letterspaced-caps labels, huge margins, no borders or shadows; slow fades; full-bleed photography.
- **Fits:** Fashion, jewelry, hotels, wine, private services, premium SaaS wanting gravitas.
- **Tile recipe:** bg `#f7f5f0`; ink `#17150f`; accent `#a8834b`; display `"Didot", "Bodoni 72", "Playfair Display", Georgia, serif`; device: 72px headline, 10px caps label with `letter-spacing: .3em`, one hairline rule, padding everywhere.

### 4. Art Deco
- **Essence:** "Gatsby glamour." Gold geometry, sunbursts, machine-age luxury.
- **Signature:** Geometric tall display caps, wide tracking; black + gold + champagne or jewel emerald/sapphire; strong symmetry, stepped and fan motifs, framed panels; metallic sheen.
- **Fits:** Cocktail bars, hotels, jewelry, galas, premium fintech wanting glamour.
- **Tile recipe:** bg `#101010`; ink `#e9ddc0`; accent `#d4af37`; display `"Futura", "Avenir Next", "Century Gothic", sans-serif` in letterspaced caps; device: sunburst via `repeating-conic-gradient`, nested gold hairline frame, thin rules above/below the headline.

### 5. Dark Academia
- **Essence:** "Old books and secrets." Candlelit library: parchment, brass, a hint of the occult.
- **Signature:** Classic serif + engraved accents; espresso, forest green, brass, parchment, near-black; book-plate frames, centered plates, footnotes; paper and leather texture, candle-glow vignette.
- **Fits:** Publishers, book clubs, fantasy games, universities, coffee, tarot brands.
- **Tile recipe:** bg `#1d1712`; panel `#e8dcc3`; accent `#a8834b`; display `"Iowan Old Style", "Palatino", "Book Antiqua", Georgia, serif`; device: double-rule brass frame, drop cap, radial candle-glow vignette.

### 6. Cinematic Noir
- **Essence:** "Movie poster." One subject blazing out of darkness; trailer-grade drama.
- **Signature:** Near-black canvas, single directional light source; huge thin type or tight-tracked caps; desaturated plus one accent; letterboxed imagery; slow zooms, film grain.
- **Fits:** Film/TV, automotive, watches, fragrance, game launches, premium anything.
- **Tile recipe:** bg `#0a0a0a`; ink `#f2f0eb`; accent `#e5484d`; display `"Helvetica Neue", Arial, sans-serif` at 200 weight or tracked caps; device: spotlight `radial-gradient(circle at 60% 30%, rgba(255,255,255,.14), transparent 55%)`, grain overlay, 21:9 image crop fading to black.

### 7. Organic Calm (japandi / wabi-sabi)
- **Essence:** "Spa quiet." A warm, careful room with one perfect object; imperfection honored.
- **Signature:** Light-weight sans plus occasional thin serif; oat, clay, charcoal, muted sage; airy low density, asymmetric calm, arch and blob shapes, slightly imperfect placement; linen grain; slow soft fades.
- **Fits:** Home goods, wellness, skincare, boutique hotels, tea, ceramics.
- **Tile recipe:** bg `#efe9df`; ink `#3d3833`; accent `#9aa08c`; font `"Avenir Next", "Segoe UI", sans-serif` at 300 weight; device: arch-shaped image mask (`border-radius: 999px 999px 0 0`), generous line height, one element rotated `-1deg`.

### 8. Cottagecore
- **Essence:** "Storybook countryside." Wildflowers, gingham, fresh bread, grandma's kitchen.
- **Signature:** Warm serif + handwritten accent; butter yellow, sage, dusty rose, cream, gingham red; centered recipe-card framing, scalloped edges; linen and pressed-flower texture.
- **Fits:** Recipe and lifestyle blogs, bakeries, candles, handmade goods, weddings.
- **Tile recipe:** bg `#faf3e3`; ink `#4a3f35`; accent `#b5563c`; display `Georgia, serif` italic + `"Bradley Hand", "Comic Sans MS", cursive` annotation; device: gingham via two-axis `repeating-linear-gradient` at low opacity, scalloped card edge, soft-radius buttons.

### 9. Mid-Century Retro
- **Essence:** "1960s optimism." Atomic starbursts, boomerangs, Eames-lounge warmth.
- **Signature:** Friendly geometric sans + retro script accent; mustard, burnt orange, teal, olive, cream; asymmetric but balanced, angled shapes, illustrated spots; flat with paper grain; bouncy restrained motion.
- **Fits:** Furniture, coffee, lifestyle brands, agencies wanting warm retro.
- **Tile recipe:** bg `#f4ead5`; ink `#2e2a24`; accents `#d9a404` `#1f6f78` `#d95d39`; display `"Futura", "Avenir Next", sans-serif` chunky; device: starburst `✱` accents, offset color blocks, boomerang blob via `border-radius: 60% 40% 30% 70%`.

### 10. Memphis Pop
- **Essence:** "Design party." Squiggles, confetti geometry, colors that argue and win.
- **Signature:** Chunky geometric display; hot pink, teal, yellow, purple plus black/white patterns; scattered shapes (squiggle, triangle, half-circle, zigzag), pattern clash, tilted elements; flat with dots and stripes.
- **Fits:** Creative brands, events and festivals, kids-adjacent, agencies with humor.
- **Tile recipe:** bg `#ffffff`; ink `#111`; accents `#ff4d8d` `#00b3a4` `#ffd400`; display `"Arial Black", "Helvetica Neue", sans-serif`; device: scattered absolute shapes with 3px black outlines, dot-pattern circle via `radial-gradient`, one card rotated 2deg with a hard shadow.

### 11. Playful Clay
- **Essence:** "Squishy and friendly." Puffy 3D clay toys: inflated, pastel, squeezably cute.
- **Signature:** Big radii (24-40px), pastel fills, dual inner shadows plus one large soft outer shadow; chunky rounded type; blob illustrations; springy hover scale.
- **Fits:** Kids and education, onboarding, playful fintech, health apps.
- **Tile recipe:** bg `#f3f0ff`; card `#c7b9ff`; ink `#3a3357`; accent `#ff9de2`; font `"Arial Rounded MT Bold", "Trebuchet MS", sans-serif`; device: `border-radius: 32px; box-shadow: inset -8px -8px 16px rgba(0,0,0,.15), inset 8px 8px 16px rgba(255,255,255,.6), 12px 24px 32px rgba(90,70,200,.25)`.

### 12. Neo-Brutalism
- **Essence:** "Bold and chunky." Brutalism after art school: thick outlines, hard shadows, candy colors.
- **Signature:** Chunky grotesque display; saturated yellow/pink/lime/cobalt on cream, plus black; card blocks with 2-4px black borders, hard non-blurred offset shadows, slight rotations, sticker elements; snappy press-into-shadow hovers.
- **Fits:** Dev tools, creative agencies, Gen-Z products, newsletters, indie SaaS.
- **Tile recipe:** bg `#fdf6e3`; ink `#000`; accents `#ffd60a` `#ff70a6` `#70d6ff`; display `"Arial Black", sans-serif`; device: `border: 3px solid #000; box-shadow: 6px 6px 0 #000`, hover `translate(3px,3px)` with shadow shrink.

### 13. Brutalist Raw
- **Essence:** "Anti-design." Default-looking, harsh, confrontational; rules broken on purpose.
- **Signature:** System fonts (Times, Courier), jarring sizes; black/white plus hyperlink blue or garish clashes; naive grid, visible 1px borders, underlined links, dense text; no radius, no shadows, abrupt or absent motion.
- **Fits:** Artist portfolios, zines, counterculture, fashion-forward, events.
- **Tile recipe:** bg `#fff`; ink `#000`; accent `#0000ee`; fonts `"Times New Roman", serif` + `"Courier New", monospace`; device: default-blue underlined links, `border: 1px solid #000` on everything, content jammed edge to edge.

### 14. Glass & Aurora
- **Essence:** "Futuristic tech." Frosted panels floating over a colorful glow.
- **Signature:** `backdrop-filter: blur()` panels with 1px light borders over drifting blurred gradient blobs; thin modern sans; soft large shadows.
- **Fits:** SaaS and fintech dashboards, OS-like products, AI products.
- **WARNING:** this is the current AI-generic default. Offer it only when the brief genuinely calls for it, execute with restraint (grain over the gradient, committed dominant tone, no indigo-on-white), and never as the lone safe option.
- **Tile recipe:** bg gradient of 2-3 blurred radial blobs (violet/teal/pink) over `#0e0e14`; panel `rgba(255,255,255,.12)` + `backdrop-filter: blur(16px)` + `border: 1px solid rgba(255,255,255,.25)`; font `"Helvetica Neue", "Segoe UI", sans-serif`.

### 15. Synthwave / Y2K Chrome
- **Essence:** "80s / 2000s nostalgia." Neon horizon grids, or chrome gloss and cyber-optimism; pick the era.
- **Signature:** Synthwave: neon magenta/cyan on deep purple, perspective grid floor, glow everywhere. Y2K: chrome gradient text, holo pastels, glossy pills, star motifs.
- **Fits:** Music, arcades, fashion, event microsites, dev tools with personality.
- **Tile recipe (synthwave):** bg `#120b2e`; accents `#ff2ec4` `#19e3ff`; glow via layered `text-shadow`; horizon grid via `linear-gradient` lines + `transform: perspective(400px) rotateX(60deg)`. **(Y2K):** chrome text via `linear-gradient(#eee,#999,#fff,#777)` + `background-clip: text`; holo bg `linear-gradient(120deg,#ff9ff3,#a29bfe,#81ecec)`; glossy pill with top inset white highlight.

### 16. Cyberpunk Terminal
- **Essence:** "Hacker HUD." Neon-soaked dystopia or green phosphor on black; the interface is a machine.
- **Signature:** Techno/mono type; acid yellow + black, or neon cyan/magenta on near-black, or `#33ff66` terminal green; HUD frames, clipped corners, scanlines, data readouts, glitch offsets, type-on text.
- **Fits:** Games, esports, security and dev tools, nightlife, tech events.
- **Tile recipe:** bg `#0c0c0e`; accent `#fcee0a` or `#33ff66`; font `"SF Mono", Menlo, Consolas, monospace`; device: clipped corners via `clip-path: polygon()`, scanlines `repeating-linear-gradient(transparent 0 2px, rgba(0,0,0,.3) 2px 4px)`, mono uppercase microlabels.

## The bench (offer when the brief calls for them)

- **Bauhaus:** primary red/blue/yellow geometry on white, lowercase geometric sans, circle/triangle/square as graphic elements. Design tools, education, brand systems.
- **Art Nouveau:** whiplash curves, arched frames, sage/mustard/terracotta, organic display type. Botanical brands, cafes, festivals.
- **Victorian / Baroque / Neoclassical heritage set:** ornate frames, engraved caps, gilt on dark or cream. Heritage spirits, museums, law and finance with lineage.
- **Gothic:** blackletter display, black/bone/blood red, pointed-arch motifs. Music, fantasy, alternative fashion.
- **Frutiger Aero:** glassy bubbles, sky blue and grass green, dew and bokeh, humanist sans. Nostalgic tech, eco-tech (light-locked).
- **Pixel Art:** chunky pixels, limited NES palette, `image-rendering: pixelated`, dialog boxes. Indie games, retro events.
- **Vaporwave:** pastel pink/purple/teal sunset gradients, statue imagery, Windows 95 chrome, checkerboards. Ironic cousin of synthwave.
- **Scrapbook / Collage:** paper textures, tape strips, polaroid frames, handwriting, rotated scatter. Journaling, personal portfolios, fan sites.
- **Mystical Southwest:** terracotta and midnight blue, western slab type, sun/moon line icons, serape stripes. Boutique hotels, coffee, festival brands.
- **Maximalist Eclectic:** pattern-on-pattern, clashing accent pairs, ornate + grotesque font mix, dense layering. Fashion, experiential, editorial statements.
- **Surrealist Wildcard:** dream juxtapositions, impossible scale, floating objects, horizon gradients. Art-led heroes, agency self-promo.
- **Utilitarian / Industrial:** mono + DIN-ish sans, spec-sheet tables, safety orange, barcodes, registration marks. Streetwear, hardware, dev tools, logistics.

## Family map (curate across, not within)

1. **Rational modernist:** Minimal/Swiss, Editorial, Bauhaus, Utilitarian
2. **Luxury and heritage:** Quiet Luxury, Art Deco, Victorian/Baroque/Neoclassical, Art Nouveau
3. **Moody narrative:** Dark Academia, Cinematic Noir, Gothic
4. **Natural calm:** Organic Calm, Cottagecore, Mystical Southwest
5. **Retro warmth:** Mid-Century, Scrapbook
6. **Playful loud:** Memphis Pop, Playful Clay, Maximalist, Surrealist
7. **Raw rebellion:** Neo-Brutalism, Brutalist Raw
8. **Tech surfaces:** Glass & Aurora, Frutiger Aero
9. **Tech nostalgia:** Synthwave/Y2K, Vaporwave, Pixel Art, Cyberpunk Terminal

Near-duplicate folds already applied: japandi/scandinavian/wabi-sabi into Organic
Calm; claymorphism/kawaii/toy into Playful Clay; synthwave/Y2K share one slot with
an era toggle; dark/light academia are one style with a polarity flip.

## Do not offer

- **Corporate Memphis** (flat bendy-limbed people): reads as generic 2019 startup.
- **Raw aurora gradients alone** (indigo/violet blobs on white with Inter): the
  number-one generic-AI fingerprint. Glass & Aurora is offerable only as the full
  committed treatment above.
- **Lone neumorphism:** accessibility trap (low contrast by construction), weak at
  page scale. Its soft-extrusion moves can season another style's components.

## Cross-cutting notes

- **Bento is a layout, not an aesthetic.** Any surface style above can be poured
  into a bento grid (see `layout-and-composition.md`).
- **Polarity locks:** Cottagecore and Frutiger Aero are light-locked; Cyberpunk,
  Synthwave, and Cinematic Noir are dark-locked; most others flip with a derived
  dark mode (see `color-and-atmosphere.md`).
- **Style is not palette.** After a style is chosen, palettes still vary widely
  within it; run the palette round (`style-picker.md`) rather than assuming the
  canonical colors.
