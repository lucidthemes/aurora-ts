import { z } from 'zod';

export const AttributeSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  slug: z.string(),
  type: z.enum(['colour', 'size']),
});
