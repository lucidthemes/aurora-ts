import { z } from 'zod';

export const ShippingOptionSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  amount: z.number(),
});
