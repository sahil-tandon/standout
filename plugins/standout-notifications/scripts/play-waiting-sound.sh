#!/usr/bin/env bash
# Plays a random R2-D2 clip when Claude is waiting for input (wired to the
# Notification hook). Exits 0 quietly if the pool is empty or afplay is
# unavailable, so it never disrupts the session.
#
# Sounds ship inside the plugin (../sounds). The mute flag lives outside the
# plugin dir so it survives plugin updates (the cache dir is replaced on update).

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
sounds_dir="$script_dir/../sounds"
mute_flag="${HOME}/.claude/standout-notifications.muted"

# Honor the mute toggle (managed by the /sound command).
[ -f "$mute_flag" ] && exit 0

# Collect the pool (wav + mp3). nullglob so an empty dir yields an empty array.
shopt -s nullglob
files=("$sounds_dir"/*.wav "$sounds_dir"/*.mp3)
shopt -u nullglob

[ ${#files[@]} -eq 0 ] && exit 0
command -v afplay >/dev/null 2>&1 || exit 0

# Pick one at random and play it.
afplay "${files[RANDOM % ${#files[@]}]}" >/dev/null 2>&1 &
exit 0
