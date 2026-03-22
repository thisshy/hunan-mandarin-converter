#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/opt/hunan-mandarin-converter}"
BRANCH="${BRANCH:-main}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Please run as root (sudo)."
  exit 1
fi

cd "$APP_DIR"
git fetch --all --prune
git checkout "$BRANCH"
git pull --ff-only origin "$BRANCH"

if [ -f package-lock.json ]; then
  npm ci --omit=dev
else
  npm install --omit=dev
fi

systemctl restart hunan-mandarin-converter
systemctl --no-pager --full status hunan-mandarin-converter | sed -n '1,20p'
