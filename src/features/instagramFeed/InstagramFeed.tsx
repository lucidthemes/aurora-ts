import Button from '@components/UI/Button';

import useInstagramFeed from './useInstagramFeed';

interface InstagramFeedProps {
  limit?: number;
  columns?: number;
  link?: string;
}

export default function InstagramFeed({ limit = 6, columns = 6, link = '' }: InstagramFeedProps) {
  const instagramFeed = useInstagramFeed(limit);

  const instagramFeedClasses = columns === 6 ? 'grid-cols-1 gap-4 md:grid-cols-4 lg:grid-cols-6' : columns === 3 ? 'grid-cols-1 lg:grid-cols-3 gap-2.5' : '';
  const instagramFeedImageClasses = columns === 6 ? 'w-full h-full md:w-60 md:h-60' : columns === 3 ? 'w-full h-full lg:w-20 lg:h-20' : '';

  return (
    <>
      {Array.isArray(instagramFeed) && instagramFeed.length > 0 ? (
        <ul className={`grid grid-cols-1 ${instagramFeedClasses} relative`}>
          {instagramFeed.map((instagram, index) => {
            let visibilityClasses = '';

            if (index === 0) {
              visibilityClasses = 'block'; // Show first image on all screens
            } else if (index < 4) {
              visibilityClasses = 'hidden md:block'; // Show images 1-3 on md+ only
            } else {
              visibilityClasses = 'hidden lg:block'; // Show images 4+ on lg+ only
            }
            return (
              <li key={instagram.id} className={visibilityClasses}>
                <img src={instagram.image} alt={'Instagram image ' + instagram.id} className={`${instagramFeedImageClasses} rounded-md object-cover`} />
              </li>
            );
          })}
          {link && (
            <Button to={link} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              Follow on Instagram
            </Button>
          )}
        </ul>
      ) : (
        <p className="rounded-md bg-pampas p-5 text-center">No images found</p>
      )}
    </>
  );
}
