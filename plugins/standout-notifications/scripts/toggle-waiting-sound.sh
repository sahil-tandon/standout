#!/usr/bin/env bash
# Toggles the "Claude is waiting for input" notification sound on or off by
# managing a flag file that play-waiting-sound.sh checks before playing.
#
# The flag lives outside the plugin dir so it survives plugin updates.
#
# Usage:
#   toggle-waiting-sound.sh            # toggle current state
#   toggle-waiting-sound.sh toggle     # toggle current state
#   toggle-waiting-sound.sh on         # sound ON  (remove the mute flag)
#   toggle-waiting-sound.sh off        # sound OFF (create the mute flag)
#   toggle-waiting-sound.sh status     # report current state, change nothing

flag="${HOME}/.claude/standout-notifications.muted"
mkdir -p "$(dirname "$flag")"

is_muted() { [ -f "$flag" ]; }
mute()   { touch "$flag"; }
unmute() { rm -f "$flag"; }

case "${1:-toggle}" in
  on)     unmute ;;
  off)    mute ;;
  status) ;;
  toggle) if is_muted; then unmute; else mute; fi ;;
  *)
    echo "Unknown argument: $1 (use: on | off | toggle | status)" >&2
    exit 1
    ;;
esac

if is_muted; then
  echo "🔇 Notification sound is OFF (muted)"
else
  echo "🔊 Notification sound is ON"
fi
