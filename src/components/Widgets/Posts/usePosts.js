import { useState, useEffect } from 'react';
import { getPosts } from '@server/posts/getPosts';

export default function usePosts(limit, category) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsList = await getPosts(limit, category);
        if (postsList) setPosts(postsList);
      } catch (error) {
        console.error('Failed to fetch posts.', error);
      }
    };

    fetchPosts();
  }, [limit, category]);

  return posts;
}
