import { z } from 'zod';

import { AddressSchema } from './address.schema';

export const CustomerSchema = z.object({
  id: z.number().int().positive(),
  email: z.email(),
  shipping: AddressSchema.optional(),
  billing: AddressSchema.optional(),
});
