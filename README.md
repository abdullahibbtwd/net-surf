# NetSurf

A single Expo app: landing, packages, and contact on web now, the same codebase for iOS/Android later.

```
netsurf/
├── app/            Expo Router routes
├── components/     buttons, cards, nav, fields
├── theme/          color, type, spacing tokens
├── services/       packages + contact data
├── package.json
└── vercel.json
```

## Local

```bash
npm install
npm run web
```

Native later:

```bash
npm run ios
npm run android
```

## Vercel

`vercel.json` already has:

- **Build command:** `npm run build`
- **Output:** `dist`
- **Framework:** Other / none

`expo export -p web` writes a static site (`/`, `/packages`, `/contact`).
