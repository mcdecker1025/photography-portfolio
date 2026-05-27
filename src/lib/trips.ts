import { getCollection, type CollectionEntry } from 'astro:content';

export type Trip = CollectionEntry<'trips'>;
export type TripPhoto = Trip['data']['photos'][number];

export type FavoritePhoto = TripPhoto & {
  tripTitle: string;
  tripSlug: string;
  tripLocation: string;
};

export async function getTrips() {
  const trips = await getCollection('trips');
  return trips.sort((a, b) => {
    return new Date(b.data.dateStart).getTime() - new Date(a.data.dateStart).getTime();
  });
}

export async function getTripBySlug(slug: string) {
  const trips = await getTrips();
  return trips.find((trip) => trip.data.slug === slug);
}

export async function getFavoritePhotos(): Promise<FavoritePhoto[]> {
  const trips = await getTrips();

  return trips.flatMap((trip) =>
    trip.data.photos
      .filter((photo) => photo.favorite)
      .map((photo) => ({
        ...photo,
        tripTitle: trip.data.title,
        tripSlug: trip.data.slug,
        tripLocation: trip.data.location,
      })),
  );
}

export function formatDateRange(dateStart: string, dateEnd: string) {
  const formatter = new Intl.DateTimeFormat('en', {
    month: 'short',
    year: 'numeric',
  });
  const start = formatter.format(new Date(`${dateStart}T00:00:00`));
  const end = formatter.format(new Date(`${dateEnd}T00:00:00`));

  return start === end ? start : `${start} - ${end}`;
}

export function getAdjacentTrips(trips: Trip[], currentSlug: string) {
  const index = trips.findIndex((trip) => trip.data.slug === currentSlug);

  return {
    previous: index > 0 ? trips[index - 1] : trips.at(-1),
    next: index < trips.length - 1 ? trips[index + 1] : trips[0],
  };
}
