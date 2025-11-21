import { useState, useEffect } from 'react';
import { getPosts } from '@server/posts/getPosts';
import { getCategoryMap } from '@server/posts/getCategory';
import { getAuthorMap } from '@server/posts/getAuthor';

export default function useBlogList(limit, category, tag, author, search) {
  const [posts, setPosts] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [authorMap, setAuthorMap] = useState({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getPosts(limit, category, tag, author, search);
        if (posts) setPosts(posts);
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
        const categoryIds = posts.flatMap((post) => post.categories);

        const map = await getCategoryMap(categoryIds);
        if (map) setCategoryMap(map);
      } catch (error) {
        console.error('Failed to fetch category map.', error);
      }
    };

    fetchCategoryMap();

    const fetchAuthorMap = async () => {
      try {
        const authorIds = posts.flatMap((post) => post.authorId);

        const map = await getAuthorMap(authorIds);
        if (map) setAuthorMap(map);
      } catch (error) {
        console.error('Failed to fetch author map.', error);
      }
    };

    fetchAuthorMap();
  }, [posts]);

  return { posts, categoryMap, authorMap };
}
