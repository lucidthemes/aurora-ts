import { z } from 'zod';

export const ReviewSchema = z.object({
  id: z.number().int().positive(),
  productId: z.number().int().positive(),
  rating: z.number().int().positive(),
  date: z.iso.date(),
  review: z.string(),
  name: z.string(),
  status: z.string(),
});
