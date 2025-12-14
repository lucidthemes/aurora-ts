import { useState, useEffect } from 'react';

import { getPostArray } from '@server/posts/getPost';
import type { Post } from '@typings/posts/post';

export default function useRelated(post: Post) {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!post?.relatedPosts) {
        setRelatedPosts([]);
        return;
      }

      try {
        const posts = await getPostArray(post.relatedPosts);
        setRelatedPosts(posts);
      } catch (error) {
        console.error('Failed to fetch related posts.', error);
      }
    };

    fetchRelated();
  }, [post]);

  return relatedPosts;
}
