import { z } from 'zod';

export const FeedSchema = z.object({
  id: z.number().int().positive(),
  image: z.string(),
});
