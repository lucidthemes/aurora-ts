import { z } from 'zod';
import { ContentBlockSchema } from '@schemas/contentBlock.schema';

export const ProductSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  slug: z.string(),
  date: z.iso.date(),
  category: z.number().int().positive().optional(),
  tags: z.array(z.number().int().positive()).optional(),
  image: z.string().optional(),
  gallery: z.array(z.string()).optional(),
  shortDescription: z.string().optional(),
  description: z.array(ContentBlockSchema).optional(),
  price: z.number(),
  inStock: z.boolean(),
  SKU: z.string(),
  variationAttributes: z
    .array(
      z.object({
        type: z.string(),
        options: z.array(z.number().int().positive()),
      })
    )
    .optional(),
  variations: z
    .array(
      z.object({
        id: z.number().int().positive(),
        colourId: z.number().int().positive().optional(),
        sizeId: z.number().int().positive().optional(),
        price: z.number(),
        stock: z.number().int().nonnegative(),
        SKU: z.string(),
      })
    )
    .optional(),
  reviewCount: z.number().optional(),
  averageReview: z.number().optional(),
  relatedProducts: z.array(z.number().int().positive()).optional(),
});
