import { z } from 'zod';

export const CouponSchema = z.object({
  id: z.number().int().positive(),
  code: z.string(),
  type: z.enum(['fixed', 'percentage']),
  amount: z.number(),
  expires: z.string().optional(),
});
