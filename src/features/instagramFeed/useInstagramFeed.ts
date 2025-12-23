import { useState, useEffect } from 'react';

import { getFeed } from '@server/instagram/getFeed';
import type { Feed } from '@typings/instagram/feed';

export default function useInstagramFeed(limit?: number) {
  const [instagramFeed, setInstagramFeed] = useState<Feed[]>([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const feed = await getFeed(limit);
        setInstagramFeed(feed);
      } catch (error) {
        console.error('Failed to fetch instagram feed.', error);
      }
    };

    fetchFeed();
  }, [limit]);

  return instagramFeed;
}
