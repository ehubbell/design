#!/usr/bin/env bash
set -euo pipefail

cd "$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"

fail() {
  printf '%s\n' "$*" >&2
  exit 1
}

require_repository() {
  local git_root
  git_root=$(git rev-parse --show-toplevel 2>/dev/null) || fail "Initialize this project directory as a Git repository first."
  [[ "$(cd "$git_root" && pwd -P)" == "$PWD" ]] || fail "The project directory must be its own Git repository."
  git remote get-url origin >/dev/null 2>&1 || fail "Configure the origin remote before running this command."
}

require_branch() {
  git show-ref --verify --quiet "refs/heads/$1" || fail "Missing local Git branch: $1"
}
