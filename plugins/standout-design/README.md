# standout-design

> Build sites and apps with real craft: bold art direction, distinctive type,
> high-impact motion, and accessibility, none of the generic AI look.

A Claude Code skill that makes your agent produce **distinctive, memorable frontends
for websites and apps**, instead of the default AI look (Inter on white, purple
gradients, three evenly-spaced rounded cards, timid motion). It replaces that with
committed art direction and real craft, while keeping the result fast and accessible.

Flagship plugin of the `standout-*` family.

## What it does

When you ask your agent to build, design, style, or redesign any web component,
page, landing site, portfolio, dashboard, or app UI, `standout-design` activates and
guides it through a real design process:

1. **Commit to a concept and one bold direction** before any code.
2. **Build the visual system**: distinctive typography (never default fonts), a
   dominant color plus one sharp accent in OKLCH, atmosphere over flat fills, and an
   intentional layout.
3. **Add purposeful motion**: one orchestrated reveal, a single reused easing token,
   compositor-friendly only.
4. **Reach for advanced visuals (WebGL, shaders, generative) only when they serve the
   concept.**
5. **Switch modes for apps and product UI**: density, the proven component stack, the
   "Linear look" as a system.
6. **Gate on performance and accessibility**, the part most flashy sites skip, which
   is exactly why doing it well makes the work stand out.
7. **Run an anti-slop checklist** before calling it done.

## Install (Claude Code)

```
/plugin marketplace add sahil-tandon/standout
/plugin install standout-design@standout
```

The skill triggers automatically on frontend/design requests. You can also invoke it
explicitly.

**Manual install** (without the marketplace): copy this plugin's
`skills/standout-design/` into your `~/.claude/skills/` directory.

## What's inside

```
standout-design/
├── .claude-plugin/plugin.json   the plugin manifest
└── skills/standout-design/
    ├── SKILL.md               the workflow + non-negotiables
    ├── references/            craft guides, loaded on demand
    │   ├── foundations.md            principles of awe + the canon craft rules
    │   ├── aesthetic-directions.md   choosing a bold art direction
    │   ├── typography.md             distinctive type, named faces, techniques
    │   ├── color-and-atmosphere.md   OKLCH, gradients, grain, glass
    │   ├── layout-and-composition.md grids, breakout, bento, scroll architecture
    │   ├── motion-and-interaction.md scroll, transitions, cursors, easing, kinetic type
    │   ├── webgl-3d-and-generative.md when 3D/shaders/generative earn their place
    │   ├── app-and-product-ui.md     dashboards, product UI, the Linear look
    │   ├── narrative-and-detail.md   loaders, intros, sound, micro-details
    │   ├── signature-builds.md       worked teardowns of standout archetypes
    │   ├── accessibility.md          stunning AND accessible (the differentiator)
    │   ├── tech-stack.md             the library-to-effect decision map
    │   └── anti-slop-checklist.md    the pre-ship pass
    └── assets/snippets/        working, copy-pasteable building blocks
```

Every motion snippet honors `prefers-reduced-motion`. See
`skills/standout-design/assets/snippets/README.md` for the snippet index.

## Why it is different

Most design skills stop at "make it pretty." `standout-design` adds the two things
they skip: **accessibility as craft** (stunning and inclusive, not one or the other)
and a **bundled, research-backed reference set plus a working snippet library**, so
the agent has real technique to draw on, not just adjectives.

## License

MIT. See [LICENSE](../../LICENSE).
