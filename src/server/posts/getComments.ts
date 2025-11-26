import { Comment } from '@typings/posts/comment';

export async function getComments<K extends 'postId'>(field: K, value: Comment[K]): Promise<Comment[] | undefined> {
  try {
    const res = await fetch('/data/post-comments.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-comments.json: ${res.status}`);
    }

    const allComments: Comment[] = await res.json();
    const comments = allComments.filter((comment) => comment[field] === value);

    return comments;
  } catch (error) {
    console.error('getComments', error);
    throw error;
  }
}

export function getCommentsById(id: number) {
  return getComments('postId', id);
}
