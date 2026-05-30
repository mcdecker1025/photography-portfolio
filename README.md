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

Gallery categories live in `src/content/galleries/`. New Cloudinary uploads are stored in Cloudinary and referenced by URL. Local fallback uploads use `public/uploads/galleries/`; existing placeholder images still live under `public/uploads/trips/`.

## Adding A Gallery

Use `/admin/` and open the `Galleries` collection.

1. Click `New Gallery`.
2. Add a gallery name, short summary, cover image, and optional hero image.
3. Use `Fast Batch Uploads` when you want to add many photos quickly.
4. Use `Curated Photos` when a photo needs a custom title, location, description, alt text, or portrait/square layout.
5. Save, mark ready, and publish when the gallery is ready to go live.

New gallery URLs are generated from the gallery name. For example, `High Alpine` becomes `/galleries/high-alpine/`.

## Editing About And Contact

Use `/admin/` and open the `Pages` collection. The About and Contact pages are fixed entries, so you can edit their text without changing routes or touching code.

## Cloudinary Media Library

For larger photo archives, use Cloudinary instead of committing every uploaded image to GitHub.

1. Create a free Cloudinary account.
2. In Cloudinary, copy the public `cloud_name` and `api_key` from the dashboard.
3. Put those public values in the `media_library` block in `public/admin/config.yml`.
4. Do not put the Cloudinary API secret in the repo.
5. Commit, push, and let Netlify redeploy.

After that, image fields in `/admin/` will open Cloudinary's media library. Existing `/uploads/...` images will continue to work. Use the `Fast Batch Uploads` gallery field for fast batch uploads that do not need individual titles/descriptions yet.
