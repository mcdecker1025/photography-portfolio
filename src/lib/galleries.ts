import { getCollection, type CollectionEntry } from 'astro:content';

export type Gallery = CollectionEntry<'galleries'>;
export type GalleryPhoto = Gallery['data']['photos'][number];

export type DisplayPhoto = GalleryPhoto & {
  image: string;
  title: string;
  location: string;
  description: string;
  alt: string;
  caption: string;
  favorite: boolean;
  orientation?: 'landscape' | 'portrait' | 'square';
  galleryTitle: string;
  gallerySlug: string;
};

export async function getGalleries() {
  const galleries = await getCollection('galleries');
  return galleries.sort((a, b) => a.data.order - b.data.order || a.data.title.localeCompare(b.data.title));
}

export async function getGalleryBySlug(slug: string) {
  const galleries = await getGalleries();
  return galleries.find((gallery) => getGallerySlug(gallery) === slug);
}

export function getGalleryPhotos(gallery: Gallery): DisplayPhoto[] {
  const curatedPhotos = gallery.data.photos.map((photo, index) => normalizePhoto(gallery, photo, index));
  const bulkPhotos = gallery.data.bulkPhotos.map((image, index) =>
    normalizePhoto(
      gallery,
      {
        image,
        alt: `${gallery.data.title} photograph ${index + 1}`,
        title: `${gallery.data.title} Photograph ${index + 1}`,
        location: gallery.data.title,
        description: gallery.data.summary,
        favorite: false,
        orientation: 'landscape',
      },
      curatedPhotos.length + index,
    ),
  );

  const photos = [...curatedPhotos, ...bulkPhotos];

  if (photos.length > 0) return photos;

  return [
    normalizePhoto(
      gallery,
      {
        image: gallery.data.coverImage,
        alt: `${gallery.data.title} gallery cover image`,
        title: gallery.data.title,
        location: gallery.data.title,
        description: gallery.data.summary,
        favorite: false,
        orientation: 'landscape',
      },
      0,
    ),
  ];
}

export async function getPortfolioPhotos() {
  const galleries = await getGalleries();
  return galleries.flatMap((gallery) => getGalleryPhotos(gallery).filter((photo) => photo.favorite));
}

export function getAdjacentGalleries(galleries: Gallery[], currentSlug: string) {
  const index = galleries.findIndex((gallery) => getGallerySlug(gallery) === currentSlug);

  return {
    previous: index > 0 ? galleries[index - 1] : galleries.at(-1),
    next: index < galleries.length - 1 ? galleries[index + 1] : galleries[0],
  };
}

export function getGallerySlug(gallery: Gallery) {
  return gallery.data.slug || gallery.id.replace(/\.mdx?$/, '');
}

export function getGalleryDescription(gallery: Gallery) {
  return gallery.data.description || gallery.data.summary;
}

export function getGalleryHeroImage(gallery: Gallery) {
  return gallery.data.heroImage || gallery.data.coverImage;
}

function normalizePhoto(gallery: Gallery, photo: GalleryPhoto, index: number): DisplayPhoto {
  const title = photo.title || photo.caption || `${gallery.data.title} Photograph ${index + 1}`;
  const location = photo.location || gallery.data.title;
  const description = photo.description || photo.caption || gallery.data.summary;

  return {
    ...photo,
    title,
    location,
    description,
    alt: photo.alt || title,
    caption: photo.caption || description,
    favorite: photo.favorite ?? false,
    galleryTitle: gallery.data.title,
    gallerySlug: getGallerySlug(gallery),
  };
}
