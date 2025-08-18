# Frontend (Next.js) — Setup and Run

## Requirements
- Node.js 18+ (recommended: 20.x)
- npm (bundled with Node)

Check versions:

```bash
node -v
npm -v
```

## Install Dependencies
From the project root or this folder, run:

```bash
cd frontend
npm install
```

## Development
Start the dev server and open `http://localhost:3000`:

```bash
npm run dev
```

## Production
Build and start a production server:

```bash
npm run build
npm start
```

## Notes
- This is a standalone frontend; backend APIs are not wired here.
- Demo auth is client-side only and stored in `localStorage`.
- Remote images are allowed for `images.pexels.com` (configured in `next.config.js`).
- Tailwind CSS is configured; global styles in `src/styles/globals.css`.

## Useful Scripts
- `npm run lint` — Lint with Next.js ESLint config.

## Troubleshooting
- If you see runtime errors related to Node APIs, ensure Node >= 18.
- Delete `node_modules` and re-install if dependencies become inconsistent:

```bash
rm -rf node_modules package-lock.json
npm install
```


