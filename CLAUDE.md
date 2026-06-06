# standout-design (project notes)

A Claude Code skill plugin. The repository is simultaneously a **plugin** and a
**self-hostable marketplace** (the superpowers model), so it is installable via
`/plugin marketplace add` without waiting for an official listing.

## Structure

- `.claude-plugin/plugin.json`: the plugin manifest.
- `.claude-plugin/marketplace.json`: marketplace manifest (`name: standout`), listing
  this plugin with `source: "./"`. Future `standout-*` skills are added here as new
  plugin entries.
- `skills/standout-design/SKILL.md`: the skill. Keep it under ~500 lines; push depth
  into `references/`.
- `skills/standout-design/references/`: craft guides, loaded on demand. Each is a
  standalone guide with no meta or research framing.
- `skills/standout-design/assets/snippets/`: working, copy-pasteable code. Every
  motion snippet must honor `prefers-reduced-motion`.

## Conventions (in addition to the global ~/CLAUDE.md)

- Develop-branch workflow: never commit directly to `main`. Work on `develop` or
  feature branches; release to `main` via PR.
- Conventional Commits, commit at every granular step.
- Keep `CHANGELOG.md` (Keep a Changelog) and `version` in sync across
  `plugin.json` and `marketplace.json` on every release (SemVer).
- No em dashes or en dashes anywhere. No AI/Claude attribution anywhere.

## Adding a new standout-* skill

Add a new plugin entry to `.claude-plugin/marketplace.json` and a new
`skills/<name>/SKILL.md`. Users keep the same marketplace; they just
`/plugin install <name>@standout`.
