import { useState, useEffect } from 'react';

import { getTags } from '@server/posts/getTags';
import type { Tag } from '@typings/posts/tag';

export default function useTags(limit?: number) {
  const [tags, setTags] = useState<Tag[]>([]);

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
