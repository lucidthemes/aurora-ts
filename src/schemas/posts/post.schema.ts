import { z } from 'zod';

import { ContentBlockSchema } from '@schemas/contentBlock.schema';

export const PostSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  slug: z.string(),
  date: z.iso.date(),
  authorId: z.number().int().positive(),
  categories: z.array(z.number().int().positive()).optional(),
  tags: z.array(z.number().int().positive()).optional(),
  excerpt: z.string().optional(),
  content: z.array(ContentBlockSchema).optional(),
  image: z.string().optional(),
  relatedPosts: z.array(z.number().int().positive()).optional(),
  postHeader: z.object({
    layout: z.enum(['outside-above', 'outside-below', 'split-narrow', 'split-wide', 'split-full', 'overlay-narrow', 'overlay-wide', 'overlay-full']),
    besideSidebar: z.boolean(),
  }),
  postSidebar: z.enum(['left', 'right', 'hidden']),
});
