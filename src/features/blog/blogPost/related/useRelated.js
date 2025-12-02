import { useState, useEffect } from 'react';
import { getPostArray } from '@server/posts/getPost';

export default function useRelated(singlePost) {
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchRelated = async () => {
      if (!singlePost?.relatedPosts) {
        setRelatedPosts([]);
        return;
      }

      try {
        const posts = await getPostArray(singlePost.relatedPosts);
        setRelatedPosts(posts);
      } catch (error) {
        console.error('Failed to fetch related posts.', error);
      }
    };

    fetchRelated();
  }, [singlePost]);

  return relatedPosts;
}
