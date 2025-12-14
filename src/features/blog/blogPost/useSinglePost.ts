import { useState, useEffect } from 'react';

import { getPostBySlug } from '@server/posts/getPost';
import { getCategoryMap } from '@server/posts/getCategory';
import { getAuthorById } from '@server/posts/getAuthor';
import type { Post } from '@typings/posts/post';
import type { Category } from '@typings/posts/category';
import type { Author } from '@typings/posts/author';

type SinglePostState = { status: 'loading' } | { status: 'not-found' } | { status: 'loaded'; post: Post };

export default function useSinglePost(slug: string | undefined) {
  const [singlePost, setSinglePost] = useState<SinglePostState>({ status: 'loading' });
  const [categoryMap, setCategoryMap] = useState<Record<number, Category>>({});
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        setSinglePost({ status: 'not-found' });
        return;
      }

      try {
        setSinglePost({ status: 'loading' });

        const post = await getPostBySlug(slug);

        if (!post) {
          setSinglePost({ status: 'not-found' });
          return;
        }

        setSinglePost({ status: 'loaded', post });
      } catch (error) {
        console.error('Failed to fetch post.', error);
        setSinglePost({ status: 'not-found' });
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    if (singlePost.status !== 'loaded') return;

    const { post } = singlePost;

    const fetchCategoryMap = async () => {
      if (!post?.categories) return;

      try {
        const map = await getCategoryMap(post.categories);
        setCategoryMap(map);
      } catch (error) {
        console.error('Failed to fetch categories.', error);
      }
    };

    fetchCategoryMap();

    const fetchAuthor = async () => {
      if (!post?.authorId) return;

      try {
        const authorInfo = await getAuthorById(post.authorId);
        setAuthor(authorInfo || null);
      } catch (error) {
        console.error('Failed to fetch author.', error);
      }
    };

    fetchAuthor();
  }, [singlePost]);

  return { singlePost, categoryMap, author };
}
