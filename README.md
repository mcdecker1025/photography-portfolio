# Photography Portfolio

A static Astro photography portfolio designed for Netlify hosting and browser-based editing through Decap CMS.

## Local Commands

```sh
pnpm install
pnpm run dev
pnpm run build
```

## Deploy

1. Push this folder to a GitHub repository.
2. In `public/admin/config.yml`, confirm `mcdecker1025/photography-portfolio` matches your GitHub `owner/repo`.
3. Connect the GitHub repository to Netlify.
4. Use build command `pnpm run build` and publish directory `dist`.
5. After deploy, visit `/admin/` and log in with a GitHub account that has write access to the repo.

## Content

Trips live in `src/content/trips/`. CMS-uploaded images are configured to go into `public/uploads/trips/`, and they are referenced on the site as `/uploads/trips/...`.
