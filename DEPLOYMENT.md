# Deployment checklist (Vercel + Render)

Use this so **sign-in, sessions, Lab 5, and Kambaz** work in production (fixes common “unable to sign in” / “todos not loading” grader issues).

## Node server (Render, Heroku, etc.)

| Variable | Purpose |
|----------|---------|
| `PORT` | Set automatically on most hosts; local default `4000`. |
| `SERVER_ENV` | Set to `production` so session cookies use `sameSite: 'none'` and `secure: true`. |
| `SESSION_SECRET` | Strong random string; **required** in production. |
| `CLIENT_URL` | Comma-separated **exact** browser origins for the Next app, e.g. `https://your-app.vercel.app` (no path, no trailing slash). Multiple: `https://a.vercel.app,https://b.vercel.app`. |

**CORS:** The server reads `CLIENT_URL` in [kambaz-node-server-app/index.js](kambaz-node-server-app/index.js). A typo here breaks cookies and API calls from the browser.

## Next.js (Vercel)

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_HTTP_SERVER` | Root URL of the **deployed** API, e.g. `https://your-api.onrender.com` — **https**, **no trailing slash**. |

After changing env vars on Vercel, **redeploy** so the client bundle picks up `NEXT_PUBLIC_*` values.

## Smoke tests (remote)

1. Open `https://your-api.../hello` or `/lab5/welcome` — should return text.
2. Run: `./scripts/verify-a5-labs.sh https://your-api.onrender.com`
3. Open deployed Next app: sign in (`iron_man` / `stark123`), open `/labs/lab5`, confirm todos load and **API Server** link in Labs TOC opens your API.

## Git branch `a5`

Course deliverable: work on branch **`a5`** in both repositories, push to GitHub, deploy that branch (or merge per instructor policy), submit the **Vercel** URL for the assignment branch.
