import { z } from 'zod';

export const PaymentOptionSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
  description: z.string(),
});
