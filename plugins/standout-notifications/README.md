# standout-notifications

Know what Claude Code is doing without watching the screen.

- **iTerm2 tab colors** track state: green while Claude is working, red when it is
  waiting on you or idle.
- **A sound** (a random R2-D2 clip) plays when Claude needs your input.
- **`/sound`** toggles the sound on/off (`on` | `off` | `status`, or no arg to flip).

## Install

```
/plugin marketplace add sahil-tandon/standout
/plugin install standout-notifications@standout
```

## One-time iTerm2 setup (for the tab title emoji)

Tab *color* works with no setup. To also show the status emoji in the tab title,
set **Settings > Profiles > General > Title > Tab title** to:

```
\(user.claudeStatus) \(session.name)
```

## Notes

- The sound respects a mute flag stored at `~/.claude/standout-notifications.muted`
  (managed by `/sound`), so it survives plugin updates.
- macOS only for sound (`afplay`); tab colors require iTerm2. On other terminals
  the hooks no-op quietly and never disrupt the session.
- Hooks are plugin-relative via `${CLAUDE_PLUGIN_ROOT}`, so nothing is hardcoded
  to a particular machine or user.
