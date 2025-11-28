import { z } from 'zod';

export const AuthorSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  slug: z.string(),
  avatar: z.string().optional(),
  description: z.string().optional(),
});
