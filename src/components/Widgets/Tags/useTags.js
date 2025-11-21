import { useState, useEffect } from 'react';
import { getTags } from '@server/posts/getTags';

export default function useTags(limit) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagsList = await getTags(limit);
        if (tagsList) setTags(tagsList);
      } catch (error) {
        console.error('Failed to fetch tags.', error);
      }
    };

    fetchTags();
  }, [limit]);

  return tags;
}
