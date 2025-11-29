import { z } from 'zod';

export const TagSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
});
