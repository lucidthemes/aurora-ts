import { z } from 'zod';

import { PostSchema } from '@schemas/posts/post.schema';
import type { Post } from '@typings/posts/post';

export async function getPost<K extends 'id' | 'slug'>(field: K, value: Post[K]): Promise<Post | undefined> {
  try {
    const res = await fetch('/data/posts.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch posts.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(PostSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const posts = parsed.data;
    const post = posts.find((post) => post[field] === value);

    return post;
  } catch (error) {
    console.error('getPost', error);
    throw error;
  }
}

export function getPostById(id: number) {
  return getPost('id', id);
}

export function getPostBySlug(slug: string) {
  return getPost('slug', slug);
}

export async function getPostArray(postIds: number[]): Promise<Post[]> {
  try {
    const res = await fetch('/data/posts.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch posts.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(PostSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const posts = parsed.data;
    const idSet = new Set(postIds);
    const postArray = posts.filter((post) => idSet.has(post.id));

    return postArray;
  } catch (error) {
    console.error('getPostArray', error);
    throw error;
  }
}
