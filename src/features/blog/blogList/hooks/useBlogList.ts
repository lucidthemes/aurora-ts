import { useState, useEffect } from 'react';

import { getPosts } from '@server/posts/getPosts';
import { getCategoryMap } from '@server/posts/getCategory';
import { getAuthorMap } from '@server/posts/getAuthor';
import type { Post } from '@typings/posts/post';
import type { Category } from '@typings/posts/category';
import type { Author } from '@typings/posts/author';

export default function useBlogList(limit?: number, category?: number, tag?: number, author?: number, search?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categoryMap, setCategoryMap] = useState<Record<number, Category>>({});
  const [authorMap, setAuthorMap] = useState<Record<number, Author>>({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts(limit, category, tag, author, search);
        setPosts(posts);
      } catch (error) {
        console.error('Failed to fetch posts.', error);
      }
    };

    fetchPosts();
  }, [limit, category, tag, author, search]);

  useEffect(() => {
    if (posts.length === 0) return;

    const fetchCategoryMap = async () => {
      try {
        const categoryIds = posts.flatMap((post) => post.categories ?? []);

        const map = await getCategoryMap(categoryIds);
        setCategoryMap(map);
      } catch (error) {
        console.error('Failed to fetch category map.', error);
      }
    };

    fetchCategoryMap();

    const fetchAuthorMap = async () => {
      try {
        const authorIds = posts.flatMap((post) => post.authorId ?? []);

        const map = await getAuthorMap(authorIds);
        setAuthorMap(map);
      } catch (error) {
        console.error('Failed to fetch author map.', error);
      }
    };

    fetchAuthorMap();
  }, [posts]);

  return { posts, categoryMap, authorMap };
}
