#!/usr/bin/env bash
set -euo pipefail
source "$(dirname "${BASH_SOURCE[0]}")/common.sh"

require_repository
require_branch dev
require_branch main
[[ -z "$(git status --porcelain)" ]] || fail "Commit or stash pending changes before deploying."

git checkout main
git merge --no-edit dev
git push -u origin main
git checkout dev
printf '%s\n' "Deploy finished."
