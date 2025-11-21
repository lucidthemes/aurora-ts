import { useState, useEffect } from 'react';
import { getPostById } from '@server/posts/getPost';

export default function useNavigation(postId) {
  const [previousPost, setPreviousPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => {
    if (!postId) {
      setPreviousPost(null);
      setNextPost(null);
      return;
    }

    const fetchPreviousPost = async () => {
      try {
        const previous = await getPostById(postId + 1);
        setPreviousPost(previous || null);
      } catch (error) {
        console.error('Failed to fetch previous post.', error);
      }
    };

    fetchPreviousPost();

    const fetchNextPost = async () => {
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
