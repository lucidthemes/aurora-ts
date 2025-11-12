import { useState, useEffect } from 'react';
import { getPostBySlug } from '@server/posts/getPost';
import { getCategoryMap } from '@server/posts/getCategory';
import { getAuthorById } from '@server/posts/getAuthor';

export default function useSinglePost(slug) {
  const [singlePost, setSinglePost] = useState(null);
  const [categoryMap, setCategoryMap] = useState({});
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (!slug) {
      setSinglePost(null);
      return;
    }

    const fetchPost = async () => {
      try {
        const post = await getPostBySlug(slug);
        if (post) {
          setSinglePost(post);
        } else {
          setSinglePost(false);
        }
      } catch (error) {
        console.error('Failed to fetch post.', error);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (!singlePost) return;

    const fetchCategoryMap = async () => {
      try {
        const categoryIds = singlePost.categories;

        const map = await getCategoryMap(categoryIds);
        if (map) setCategoryMap(map);
      } catch (error) {
        console.error('Failed to fetch categories.', error);
      }
    };

    fetchCategoryMap();

    const fetchAuthor = async () => {
      try {
        const authorInfo = await getAuthorById(singlePost.authorId);
        if (authorInfo) setAuthor(authorInfo);
      } catch (error) {
        console.error('Failed to fetch author.', error);
      }
    };

    fetchAuthor();
  }, [singlePost]);

  return { singlePost, categoryMap, author };
}
