---
description: Toggle the "Claude is waiting" notification sound on/off
allowed-tools: Bash(bash -c:*)
---

Current result of toggling the notification sound:

!`bash -c 'f="$HOME/.claude/standout-notifications.muted"; mkdir -p "$(dirname "$f")"; case "${1:-toggle}" in on) rm -f "$f" ;; off) : > "$f" ;; status) : ;; toggle|"") if [ -f "$f" ]; then rm -f "$f"; else : > "$f"; fi ;; *) echo "Unknown arg: $1 (use on|off|toggle|status)" >&2; exit 0 ;; esac; if [ -f "$f" ]; then echo "🔇 Notification sound is OFF (muted)"; else echo "🔊 Notification sound is ON"; fi' sound $ARGUMENTS`

Relay the line above to the user verbatim in one short sentence. Do nothing else. (Args: no arg toggles; `on`, `off`, or `status` set/check explicitly.)
