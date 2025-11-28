import { z } from 'zod';

export const CommentSchema = z.object({
  id: z.number().int().positive(),
  postId: z.number().int().positive(),
  replyTo: z.boolean().optional(),
  author: z.string(),
  avatar: z.string().optional(),
  datetime: z.string(),
  comment: z.string(),
  status: z.string(),
});
