import { useState, useEffect } from 'react';
import { getTagsArray } from '@server/posts/getTags';

export default function useTags(singlePost) {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    if (!singlePost || !singlePost.tags) {
      setTags([]);
      return;
    }

    const fetchTags = async () => {
      try {
        const postTags = await getTagsArray(singlePost.tags);
        if (postTags) setTags(postTags);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };

    fetchTags();
  }, [singlePost]);

  return tags;
}
