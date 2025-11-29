import { z } from 'zod';
import { Comment } from '@typings/posts/comment';
import { CommentSchema } from '@schemas/posts/comment.schema';

export async function getComments<K extends 'postId'>(field: K, value: Comment[K]): Promise<Comment[]> {
  try {
    const res = await fetch('/data/post-comments.json');

    if (!res.ok) {
      throw new Error(`Failed to fetch post-comments.json: ${res.status}`);
    }

    const unparsed = await res.json();

    const parsed = z.array(CommentSchema).safeParse(unparsed);

    if (!parsed.success) {
      throw new Error(`Invalid data: ${parsed.error}`);
    }

    const allComments = parsed.data;
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
