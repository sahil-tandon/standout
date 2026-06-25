# standout

> The `standout-*` family of craft plugins for Claude Code.

A self-hostable Claude Code plugin marketplace. Add it once, then install any of the
`standout-*` plugins a la carte.

```
/plugin marketplace add sahil-tandon/standout
```

## Plugins

| Plugin | What it does | Install |
|---|---|---|
| **[standout-design](plugins/standout-design/)** | Distinctive, memorable frontends with real craft (art direction, type, motion, accessibility), none of the generic AI look. | `/plugin install standout-design@standout` |
| **[standout-notifications](plugins/standout-notifications/)** | iTerm tab colors that track working / waiting / idle, plus an R2-D2 sound when Claude needs you. Includes `/sound`. | `/plugin install standout-notifications@standout` |

## Companion (not a plugin)

The **statusline** lives in its own repo with its own installer, because Claude Code
does not allow plugins to set the status line (it is a user-settings-only feature):

- [claude-code-statusline](https://github.com/sahil-tandon/claude-code-statusline)

## Layout

```
standout/
├── .claude-plugin/marketplace.json     lists every standout-* plugin
└── plugins/
    ├── standout-design/                skill plugin (design craft)
    └── standout-notifications/         hooks plugin (tab colors + sound + /sound)
```

## Updating

```
/plugin marketplace update standout
```

## Developing locally

Test changes before publishing by adding the working copy as a local marketplace:

```
/plugin marketplace add ./standout
/plugin install standout-notifications@standout
```

## License

MIT. See [LICENSE](LICENSE).
