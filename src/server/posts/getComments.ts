import { z } from 'zod';

import { CommentSchema } from '@schemas/posts/comment.schema';
import type { Comment as CommentType } from '@typings/posts/comment';

export async function getComments<K extends 'postId'>(field: K, value: CommentType[K]): Promise<CommentType[]> {
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

    return allComments
      .filter((comment) => comment[field] === value)
      .map(
        (comment): CommentType => ({
          ...comment,
          replyTo: comment.replyTo ?? null,
          replies: [],
        })
      );
  } catch (error) {
    console.error('getComments', error);
    throw error;
  }
}

export function getCommentsById(id: number) {
  return getComments('postId', id);
}
