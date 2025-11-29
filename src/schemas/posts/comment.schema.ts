import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.number().int().positive(),
  postId: z.number().int().positive(),
  replyTo: z.number().nullable().optional(),
  author: z.string(),
  avatar: z.string().optional(),
  datetime: z.iso.datetime(),
  comment: z.string(),
  status: z.string(),
});
