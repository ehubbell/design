#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/common.sh"

[[ $# -eq 1 && -n "${1//[[:space:]]/}" ]] || fail 'Usage: npm run commit -- "Commit message"'
require_repository
require_branch dev

git checkout dev
git status --short
git add --all
if git diff --cached --quiet; then
  printf '%s\n' "No changes to commit; pushing existing dev commits."
else
  git commit -m "$1"
fi
git push -u origin dev
printf '%s\n' "Commit finished."
