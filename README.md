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

## Cloudinary Media Library

For larger photo archives, use Cloudinary instead of committing every uploaded image to GitHub.

1. Create a free Cloudinary account.
2. In Cloudinary, copy the public `cloud_name` and `api_key` from the dashboard.
3. Put those public values in the `media_library` block in `public/admin/config.yml`.
4. Do not put the Cloudinary API secret in the repo.
5. Commit, push, and let Netlify redeploy.

After that, image fields in `/admin/` will open Cloudinary's media library. Existing `/uploads/...` images will continue to work. Use the `Bulk Photos` trip field for fast batch uploads that do not need individual captions.
