# standout (project notes)

A self-hostable Claude Code **plugin marketplace** hosting the `standout-*` family.
The repo root is the marketplace; each plugin lives under `plugins/<name>/`.

## Structure

- `.claude-plugin/marketplace.json`: marketplace manifest (`name: standout`). Lists
  every plugin with `source: "./plugins/<name>"`. Add a new `standout-*` plugin by
  adding an entry here plus a `plugins/<name>/` directory.
- `plugins/standout-design/`: the design skill plugin.
  - `.claude-plugin/plugin.json`: plugin manifest.
  - `skills/standout-design/SKILL.md`: the skill (keep under ~500 lines; push depth
    into `references/`).
  - `skills/standout-design/references/`: craft guides, loaded on demand.
  - `skills/standout-design/assets/snippets/`: working, copy-pasteable code. Every
    motion snippet must honor `prefers-reduced-motion`.
- `plugins/standout-notifications/`: the notifications hooks plugin.
  - `.claude-plugin/plugin.json`: plugin manifest.
  - `hooks/hooks.json`: lifecycle hooks (SessionStart / UserPromptSubmit / Stop /
    Notification). Commands MUST use `${CLAUDE_PLUGIN_ROOT}` for paths, never
    hardcoded `/Users/...` or `$HOME/.claude/...`.
  - `scripts/`: the hook scripts (iterm-tab-status.sh, play-waiting-sound.sh).
    Self-locate their assets relative to the script (`$(dirname "${BASH_SOURCE[0]}")`),
    not via hardcoded paths. Referenced from hooks.json via `${CLAUDE_PLUGIN_ROOT}`.
  - `sounds/`: bundled audio. Persistent state (the mute flag) must live OUTSIDE the
    plugin dir (`~/.claude/standout-notifications.muted`) so it survives updates.
  - `commands/sound.md`: the `/sound` slash command. It is SELF-CONTAINED: it inlines
    the mute-flag toggle using only `$HOME` and bash, with no `${CLAUDE_PLUGIN_ROOT}`
    dependency. This is deliberate: `${CLAUDE_PLUGIN_ROOT}` substitution is documented
    for hook commands but NOT for command files, so commands must not rely on it.

## Conventions (in addition to the global ~/CLAUDE.md)

- Develop-branch workflow: never commit directly to `main`. Work on `develop` or
  feature branches; release to `main` via PR.
- Conventional Commits, commit at every granular step.
- Keep `CHANGELOG.md` (Keep a Changelog). Each plugin carries its OWN `version` in its
  `plugin.json`; keep it in sync with the entry in `marketplace.json`. Bump the
  changed plugin's version on release (SemVer); the repo CHANGELOG records all of it.
- No em dashes or en dashes anywhere. No AI/Claude attribution anywhere.

## Adding a new standout-* plugin

1. Create `plugins/<name>/.claude-plugin/plugin.json` and the plugin's components
   (`skills/`, `hooks/`, `commands/`, `agents/`, assets).
2. Add an entry to `.claude-plugin/marketplace.json` with `source: "./plugins/<name>"`.
3. Test locally: `/plugin marketplace add ./standout` then
   `/plugin install <name>@standout`.
4. Users keep the same marketplace; they just `/plugin install <name>@standout`.

## What does NOT belong here

- The status line: plugins cannot set `statusLine` (user-settings only), so it stays
  in its own `claude-code-statusline` repo with its own installer.
