import { useState, useEffect } from 'react';
import { getFeed } from '@server/instagram/getFeed';

export default function useInstagramFeed(limit) {
  const [instagramFeed, setInstagramFeed] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const feed = await getFeed(limit);
        if (feed) setInstagramFeed(feed);
      } catch (error) {
        console.error('Failed to fetch instagram feed.', error);
      }
    };

    fetchFeed();
  }, [limit]);

  return instagramFeed;
}
