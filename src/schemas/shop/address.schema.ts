import { z } from 'zod';

export const AddressSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  country: z.string(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  county: z.string().optional(),
  postcode: z.string(),
  phone: z.number().optional(),
});
