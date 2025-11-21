import { useState, useEffect } from 'react';
import { getPostArray } from '@server/posts/getPost';

export default function useRelated(singlePost) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    if (!singlePost || !singlePost.relatedPosts) {
      setRelatedPosts([]);
      return;
    }

    const fetchRelated = async () => {
      try {
        const posts = await getPostArray(singlePost.relatedPosts);
        if (posts) setRelatedPosts(posts);
      } catch (error) {
        console.error('Failed to fetch related posts.', error);
      }
    };

    fetchRelated();
  }, [singlePost]);

  return relatedPosts;
}
