import { useState, useEffect } from 'react';

import { getTagsArray } from '@server/posts/getTags';
import type { Post } from '@typings/posts/post';
import type { Tag } from '@typings/posts/tag';

export default function useTags(post: Post) {
  const [tags, setTags] = useState<Tag[]>([]);

  useEffect(() => {
    const fetchTags = async () => {
      if (!post?.tags) {
        setTags([]);
        return;
      }

      try {
        const postTags = await getTagsArray(post.tags);
        setTags(postTags);
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      }
    };

    fetchTags();
  }, [post]);

  return tags;
}
