import { getCollection, type CollectionEntry } from 'astro:content';

type PageEntry = CollectionEntry<'pages'>;

export type PageContent = PageEntry['data'];

export async function getPageContent(slug: string, fallback: PageContent) {
  const pages = await getCollection('pages');
  const page = pages.find((entry) => entry.id === slug || entry.id === `${slug}.md`);

  if (!page) return fallback;

  return {
    ...fallback,
    ...page.data,
    paragraphs: page.data.paragraphs.length > 0 ? page.data.paragraphs : fallback.paragraphs,
  };
}
