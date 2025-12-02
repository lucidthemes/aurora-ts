import { useState, useEffect } from 'react';
import { getTagsArray } from '@server/posts/getTags';

export default function useTags(singlePost) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      if (!singlePost?.tags) {
        setTags([]);
        return;
      }

      try {
        const postTags = await getTagsArray(singlePost.tags);
        setTags(postTags);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };

    fetchTags();
  }, [singlePost]);

  return tags;
}
