# Parsa — Microfrontend Portfolio

A personal portfolio built as a **pnpm monorepo** with a microfrontend architecture.

## Packages

| Package | Framework | Port | Description |
|---|---|---|---|
| `packages/shell` | Next.js 13 | 3000 | App shell — homepage, routing, page chrome |
| `packages/mfe-react` | React + Vite | 3001 | React story chapter navigator |
| `packages/mfe-vue` | Vue 3 + Vite | 3002 | Vue story chapter navigator |
| `packages/mfe-angular` | Angular 16 + Webpack | 3003 | Angular story chapter navigator |
| `packages/shared` | TypeScript | — | Shared story data and types |

## Architecture

Each story route (`/react`, `/vue`, `/angular`) is served by the **shell** (Next.js).
The shell owns the page chrome — navigation, header, metadata, and photos.

The interactive **chapter navigator** in each story is an independent MFE, loaded at runtime via **Module Federation**:

- React MFE → exposed as a React component (`mfe_react/App`)
- Vue MFE → exposed as a framework-agnostic `mount(el)` function (`mfe_vue/mount`)
- Angular MFE → exposed as a framework-agnostic `mount(el)` function (`mfe_angular/bootstrap`)

```
User hits /angular
  → Shell's Next.js page renders (SSR: nav, header, photos)
  → AngularMfeLoader mounts in the browser
  → Shell fetches http://localhost:3003/remoteEntry.js
  → Angular bootstraps inside the provided <div>
```

## Development

```bash
# Install all workspace dependencies
pnpm install

# Start all 4 apps concurrently
pnpm dev

# Or start individually
pnpm dev:shell     # Next.js shell on :3000
pnpm dev:react     # React MFE on :3001
pnpm dev:vue       # Vue MFE on :3002
pnpm dev:angular   # Angular MFE on :3003
```

## Environment Variables

Copy `.env.example` to `.env.local` inside `packages/shell/` to override MFE URLs for production:

```env
NEXT_PUBLIC_MFE_REACT_URL=https://mfe-react.example.com
NEXT_PUBLIC_MFE_VUE_URL=https://mfe-vue.example.com
NEXT_PUBLIC_MFE_ANGULAR_URL=https://mfe-angular.example.com
```

## Production Deploy

Each package can be deployed independently:
- **shell** → Vercel / Node.js host
- **mfe-react**, **mfe-vue** → Any static host (Vercel, Netlify, Cloudflare Pages)
- **mfe-angular** → Any static host (output: `dist/`)

