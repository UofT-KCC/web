import Image, { StaticImageData } from 'next/image';
import EventsGalleryClip from './eventsGalleryClip';

import formalBalloons from '@/public/assets/images/events/gallery/formal-balloons.jpg';
import formalBuffet from '@/public/assets/images/events/gallery/formal-buffet.jpg';
import formalDesserts from '@/public/assets/images/events/gallery/formal-desserts.jpg';
import formalGroup from '@/public/assets/images/events/gallery/formal-group.jpg';
import formalSeated from '@/public/assets/images/events/gallery/formal-seated.jpg';
import parkField from '@/public/assets/images/events/gallery/park-field.jpg';
import parkGames from '@/public/assets/images/events/gallery/park-games.jpg';
import parkGroup from '@/public/assets/images/events/gallery/park-group.jpg';
import parkJackets from '@/public/assets/images/events/gallery/park-jackets.jpg';
import parkPorch from '@/public/assets/images/events/gallery/park-porch.jpg';
import parkStreet from '@/public/assets/images/events/gallery/park-street.jpg';
import parkSunflare from '@/public/assets/images/events/gallery/park-sunflare.jpg';
import parkWave from '@/public/assets/images/events/gallery/park-wave.jpg';
import socialBoard from '@/public/assets/images/events/gallery/social-board.jpg';
import socialCrowd from '@/public/assets/images/events/gallery/social-crowd.jpg';
import socialGames from '@/public/assets/images/events/gallery/social-games.jpg';
import socialLivingRoom from '@/public/assets/images/events/gallery/social-living-room.jpg';
import socialPoster from '@/public/assets/images/events/gallery/social-poster.jpg';

type Tile =
  | { kind: 'photo'; src: StaticImageData; alt: string }
  | { kind: 'clip'; name: string; alt: string; aspectRatio: '4 / 3' | '4 / 5' };

const photo = (src: StaticImageData, alt: string): Tile => ({
  kind: 'photo',
  src,
  alt,
});

const clip = (
  name: string,
  aspectRatio: '4 / 3' | '4 / 5',
  alt: string,
): Tile => ({ kind: 'clip', name, aspectRatio, alt });

// Each column mixes portrait, landscape and wide shots plus one 4:3 and one
// 4:5 clip, so the three columns end up the same total height and loop
// seamlessly.
const columns: Tile[][] = [
  [
    photo(parkGroup, 'UTKCC members posing for a group photo in the park'),
    photo(formalBalloons, 'Members chatting in front of gold KCC balloons'),
    clip(
      'park-jackets-walk',
      '4 / 3',
      'Members in varsity jackets walking across the field',
    ),
    photo(parkWave, 'Members in UofT varsity jackets waving'),
    photo(socialCrowd, 'A full room of members at a social night'),
    clip(
      'food-spread',
      '4 / 5',
      'Chicken, tteokbokki and pizza laid out for a social',
    ),
    photo(parkPorch, 'Members gathering outside before an event'),
    photo(parkField, 'Members playing games on the field'),
  ],
  [
    photo(formalDesserts, 'Dessert table at the formal night'),
    clip('park-day', '4 / 5', 'Members playing a running game in the park'),
    photo(parkJackets, 'Members in matching varsity jackets on the field'),
    photo(formalGroup, 'Group photo at the UTKCC formal night'),
    photo(socialPoster, 'A hand-decorated UTKCC poster'),
    clip('crowd-games', '4 / 3', 'A packed room cheering during social games'),
    photo(parkGames, 'Members running a game in the park'),
    photo(socialBoard, 'Members playing a UTKCC board game'),
  ],
  [
    photo(formalSeated, 'Members seated together at the formal night'),
    photo(parkStreet, 'Members walking together in varsity jackets'),
    clip(
      'stage-performance',
      '4 / 3',
      'Members performing in front of the crowd',
    ),
    photo(socialLivingRoom, 'Members hanging out at a house social'),
    photo(parkSunflare, 'Members in varsity jackets in the afternoon sun'),
    clip('poster-signing', '4 / 5', 'Members signing the UTKCC poster'),
    photo(formalBuffet, 'Buffet spread at the formal night'),
    photo(socialGames, 'Members playing games at a social night'),
  ],
];

const columnClassNames = [
  'events-gallery-column',
  'events-gallery-column events-gallery-column-reverse',
  'events-gallery-column events-gallery-column-slow hidden sm:block',
];

export default function EventsGallery({
  heightClassName = 'h-[440px] sm:h-[520px] lg:h-[min(64vh,600px)]',
}: {
  heightClassName?: string;
}) {
  return (
    <div
      className={`events-gallery relative w-full overflow-hidden ${heightClassName}`}
    >
      <div className="absolute inset-0 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:gap-3">
        {columns.map((tiles, i) => (
          <div key={i} className={columnClassNames[i]}>
            <div className="events-gallery-track">
              {[...tiles, ...tiles].map((tile, j) => {
                const isCopy = j >= tiles.length;
                const alt = isCopy ? '' : tile.alt;
                return (
                  <div
                    key={j}
                    className="events-gallery-tile pb-2.5 lg:pb-3"
                    aria-hidden={isCopy || undefined}
                  >
                    {tile.kind === 'photo' ? (
                      <div className="relative overflow-hidden rounded-lg bg-gray-100 shadow-sm">
                        <Image
                          src={tile.src}
                          alt={alt}
                          placeholder="blur"
                          quality={88}
                          sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
                          className="block h-auto w-full"
                        />
                        <span className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-black/5" />
                      </div>
                    ) : (
                      <EventsGalleryClip
                        src={`/assets/videos/events/${tile.name}.mp4`}
                        poster={`/assets/videos/events/${tile.name}.jpg`}
                        aspectRatio={tile.aspectRatio}
                        label={alt || undefined}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
