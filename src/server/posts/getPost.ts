import { Post } from '@typings/posts/post';

export async function getPost<K extends 'id' | 'slug'>(field: K, value: Post[K]): Promise<Post | undefined> {
  try {
    const res = await fetch('/data/posts.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch posts.json: ${res.status}`);
    }

    const posts: Post[] = await res.json();
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

export async function getPostArray(postIds: number[]): Promise<Post[] | undefined> {
  try {
    const res = await fetch('/data/posts.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch posts.json: ${res.status}`);
    }

    const posts: Post[] = await res.json();
    const idSet = new Set(postIds);
    const postArray = posts.filter((post) => idSet.has(post.id));

    return postArray;
  } catch (error) {
    console.error('getPostArray', error);
    throw error;
  }
}
