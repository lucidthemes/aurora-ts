import { useState, useEffect } from 'react';

import { getPostById } from '@server/posts/getPost';
import type { Post } from '@typings/posts/post';

export default function useNavigation(postId: number) {
  const [previousPost, setPreviousPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPreviousPost = async () => {
      if (!postId) {
        setPreviousPost(null);
        return;
      }

      try {
        const previous = await getPostById(postId + 1);
        setPreviousPost(previous || null);
      } catch (error) {
        console.error('Failed to fetch previous post.', error);
      }
    };

    fetchPreviousPost();

    const fetchNextPost = async () => {
      if (!postId) {
        setNextPost(null);
        return;
      }

      try {
        const next = await getPostById(postId - 1);
        setNextPost(next || null);
      } catch (error) {
        console.error('Failed to fetch next post.', error);
      }
    };

    fetchNextPost();
  }, [postId]);

  return { previousPost, nextPost };
}
