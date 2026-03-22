# Oracle Free VPS Deployment (Recommended)

This project can run with:
- Frontend on GitHub Pages
- Backend API on Oracle Always Free VPS

## A. Prepare your GitHub repo

Make sure latest code is pushed to GitHub (`main` branch).

## B. Run one-shot server setup on Oracle Ubuntu

SSH into your Oracle instance and run:

```bash
sudo -i
cd /tmp
curl -fsSL https://raw.githubusercontent.com/thisshy/hunan-mandarin-converter/main/deploy/oracle/bootstrap.sh -o bootstrap.sh
chmod +x bootstrap.sh
REPO_URL="https://github.com/thisshy/hunan-mandarin-converter.git" \
GITHUB_PAGES_ORIGIN="https://thisshy.github.io" \
PUBLIC_HOST="_" \
ADMIN_TOKEN="replace-with-your-strong-token" \
bash bootstrap.sh
```

Notes:
- `PUBLIC_HOST` can be `_` when using server IP directly.
- If you have a domain, set `PUBLIC_HOST` to your domain.

## C. Configure frontend API endpoint

Edit file `config.js` in this repo:

```js
window.APP_CONFIG = {
  API_BASE_URL: "http://<oracle-public-ip>/api"
};
```

Then commit and push to GitHub.

## D. Verify

- API health: `http://<oracle-public-ip>/api/health`
- User page: `https://thisshy.github.io/hunan-mandarin-converter/`
- Admin page: `https://thisshy.github.io/hunan-mandarin-converter/?admin=1`

Use the same `ADMIN_TOKEN` in admin prompt.

## E. Update after code changes

On server:

```bash
sudo -i
cd /opt/hunan-mandarin-converter
bash deploy/oracle/update.sh
```

## F. Optional HTTPS (recommended)

After domain DNS points to your Oracle IP:

```bash
sudo apt-get update
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

Then set `API_BASE_URL` in `config.js` to `https://your-domain.com/api`.
