import { useState, useEffect } from 'react';
import { getPostBySlug } from '@server/posts/getPost';
import { getCategoryMap } from '@server/posts/getCategory';
import { getAuthorById } from '@server/posts/getAuthor';

export default function useSinglePost(slug) {
  const [singlePost, setSinglePost] = useState(null);
  const [categoryMap, setCategoryMap] = useState({});
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setSinglePost(null);
        return;
      }

      try {
        const post = await getPostBySlug(slug);
        setSinglePost(post || false);
      } catch (error) {
        console.error('Failed to fetch post.', error);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    const fetchCategoryMap = async () => {
      if (!singlePost?.categories) return;

      try {
        const categoryIds = singlePost.categories;
        const map = await getCategoryMap(categoryIds);
        setCategoryMap(map);
      } catch (error) {
        console.error('Failed to fetch categories.', error);
      }
    };

    fetchCategoryMap();

    const fetchAuthor = async () => {
      if (!singlePost?.authorId) return;

      try {
        const authorInfo = await getAuthorById(singlePost.authorId);
        setAuthor(authorInfo);
      } catch (error) {
        console.error('Failed to fetch author.', error);
      }
    };

    fetchAuthor();
  }, [singlePost]);

  return { singlePost, categoryMap, author };
}
