#!/usr/bin/env bash
# Set iTerm2 tab color + claudeStatus user variable to indicate Claude state.
# Usage: iterm-tab-status.sh <working|waiting|idle|reset>
#
# To make the emoji visible in the tab title, configure iTerm2:
#   Settings > Profiles > General > Title > "Tab title" set to e.g.
#   \(user.claudeStatus) \(session.name)
# (Tab color works regardless of profile settings.)

state="${1:-idle}"

find_tty() {
  local pid="$PPID"
  for _ in 1 2 3 4 5 6 7 8; do
    [ -z "$pid" ] || [ "$pid" = "0" ] || [ "$pid" = "1" ] && return 1
    local t
    t=$(ps -p "$pid" -o tty= 2>/dev/null | tr -d ' \n')
    if [ -n "$t" ] && [ "$t" != "?" ] && [ "$t" != "??" ]; then
      printf '/dev/%s' "$t"
      return 0
    fi
    pid=$(ps -p "$pid" -o ppid= 2>/dev/null | tr -d ' \n')
  done
  return 1
}

tty_path=$(find_tty) || exit 0
[ -w "$tty_path" ] || exit 0

case "$state" in
  working)  emoji="🟢"; r=40;  g=150; b=80 ;;  # green: Claude is working
  waiting)  emoji="🔴"; r=220; g=40;  b=40 ;;  # red: waiting on you (needs input)
  idle)     emoji="🔴"; r=220; g=40;  b=40 ;;  # red: stopped, waiting for your prompt
  reset)
    {
      printf '\e]6;1;bg;*;default\a'
      printf '\e]1337;SetUserVar=claudeStatus=%s\a' "$(printf '' | base64 | tr -d '\n')"
    } > "$tty_path" 2>/dev/null
    exit 0
    ;;
  *) exit 0 ;;
esac

emoji_b64=$(printf '%s' "$emoji" | base64 | tr -d '\n')

{
  printf '\e]6;1;bg;red;brightness;%d\a' "$r"
  printf '\e]6;1;bg;green;brightness;%d\a' "$g"
  printf '\e]6;1;bg;blue;brightness;%d\a' "$b"
  printf '\e]1337;SetUserVar=claudeStatus=%s\a' "$emoji_b64"
} > "$tty_path" 2>/dev/null
exit 0
