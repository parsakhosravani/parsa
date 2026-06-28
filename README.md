# Parsa Portfolio

Story-driven personal portfolio built with Next.js and Tailwind CSS.

## What this portfolio includes

- Career storytelling across three frontend frameworks:
  - React route
  - Vue route
  - Angular route
- Homepage with:
  - Hero section and stylized portrait
  - Featured wins
  - How I work
  - Career timeline with company logos
  - Proof snapshots
- Light and dark mode toggle
- Shared story data source used across all pages

## Tech stack

- Next.js (App Router)
- React
- Tailwind CSS
- TypeScript
- Vue (client-mounted story route)
- Angular (client-bootstrapped story route)

## Project routes

- `/` - Homepage
- `/react` - React storytelling page
- `/vue` - Vue storytelling page
- `/angular` - Angular storytelling page

## Run locally

```sh
git clone https://github.com/parsa/Parsa.git
cd Parsa
pnpm install
pnpm dev
```

## Build for production

```sh
pnpm build
pnpm start
```

## Content and assets

- Story content and framework metadata: `app/lib/story.ts`
- Homepage layout and sections: `app/page.tsx`
- Global styles and animations: `app/globals.css`
- Portrait and company logos: `public/`

## Notes

- If Google Fonts are blocked in your environment, the project uses system fonts as fallback.
- Vue and Angular pages run client-side and are integrated intentionally to compare storytelling across frameworks in one repo.
