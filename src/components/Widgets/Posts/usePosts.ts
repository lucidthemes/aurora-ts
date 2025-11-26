import { useState, useEffect } from 'react';
import { Post } from '@typings/posts/post';
import { getPosts } from '@server/posts/getPosts';

export default function usePosts(limit: number, category?: number) {
  const [posts, setPosts] = useState<Post[]>([]);

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
