#!/usr/bin/env bash
set -euo pipefail

# One-shot setup for Oracle Cloud Always Free (Ubuntu)
# Run as root: sudo bash bootstrap.sh

REPO_URL="${REPO_URL:-https://github.com/thisshy/hunan-mandarin-converter.git}"
APP_DIR="${APP_DIR:-/opt/hunan-mandarin-converter}"
APP_USER="${APP_USER:-ubuntu}"
APP_PORT="${APP_PORT:-8080}"
PUBLIC_HOST="${PUBLIC_HOST:-_}"
GITHUB_PAGES_ORIGIN="${GITHUB_PAGES_ORIGIN:-https://thisshy.github.io}"
CORS_ORIGINS="${CORS_ORIGINS:-$GITHUB_PAGES_ORIGIN}"
DATA_DIR="${DATA_DIR:-/var/lib/hunan-mandarin-converter}"
ADMIN_TOKEN="${ADMIN_TOKEN:-}"

if [ "$(id -u)" -ne 0 ]; then
  echo "Please run as root (sudo)."
  exit 1
fi

if [ -z "$ADMIN_TOKEN" ]; then
  ADMIN_TOKEN="$(openssl rand -hex 24)"
fi

echo "[1/8] Install base packages"
apt-get update
apt-get install -y curl git nginx ca-certificates

echo "[2/8] Install Node.js (18+)"
if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi
NODE_MAJOR="$(node -p 'process.versions.node.split(".")[0]')"
if [ "$NODE_MAJOR" -lt 18 ]; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

echo "[3/8] Prepare app source"
mkdir -p "$(dirname "$APP_DIR")"
if [ ! -d "$APP_DIR/.git" ]; then
  git clone "$REPO_URL" "$APP_DIR"
else
  cd "$APP_DIR"
  git fetch --all --prune
  git reset --hard origin/main
fi

cd "$APP_DIR"
echo "[4/8] Install dependencies"
if [ -f package-lock.json ]; then
  npm ci --omit=dev
else
  npm install --omit=dev
fi

echo "[5/8] Prepare persistent data directory"
mkdir -p "$DATA_DIR"
chown -R "$APP_USER":"$APP_USER" "$DATA_DIR"

echo "[6/8] Write environment file"
cat >/etc/hunan-mandarin-converter.env <<EOF
PORT=$APP_PORT
HOST=0.0.0.0
ADMIN_TOKEN=$ADMIN_TOKEN
CORS_ORIGINS=$CORS_ORIGINS
DATA_DIR=$DATA_DIR
EOF
chmod 600 /etc/hunan-mandarin-converter.env

echo "[7/8] Install and start systemd service"
cat >/etc/systemd/system/hunan-mandarin-converter.service <<EOF
[Unit]
Description=Hunan Mandarin Converter API
After=network.target

[Service]
Type=simple
User=$APP_USER
WorkingDirectory=$APP_DIR
EnvironmentFile=/etc/hunan-mandarin-converter.env
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=3

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now hunan-mandarin-converter

echo "[8/8] Configure Nginx reverse proxy"
cat >/etc/nginx/sites-available/hunan-mandarin-converter <<EOF
server {
  listen 80;
  server_name $PUBLIC_HOST;

  location / {
    proxy_pass http://127.0.0.1:$APP_PORT;
    proxy_http_version 1.1;
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto \$scheme;
  }
}
EOF

ln -sf /etc/nginx/sites-available/hunan-mandarin-converter /etc/nginx/sites-enabled/hunan-mandarin-converter
rm -f /etc/nginx/sites-enabled/default
nginx -t
systemctl reload nginx

if command -v ufw >/dev/null 2>&1; then
  ufw allow OpenSSH || true
  ufw allow 'Nginx Full' || true
fi

echo
systemctl --no-pager --full status hunan-mandarin-converter | sed -n '1,20p'
echo
echo "Setup complete."
echo "ADMIN_TOKEN=$ADMIN_TOKEN"
echo "Set config.js API_BASE_URL to: http://<your-server-public-ip>/api"
