import { z } from 'zod';

const BaseBlockSchema = z.object({
  id: z.number().int().positive(),
  text: z.string(),
});

const HeadingBlockSchema = BaseBlockSchema.extend({
  type: z.literal('heading'),
  level: z.number().int().optional(),
});

const ParagraphBlockSchema = BaseBlockSchema.extend({
  type: z.literal('paragraph'),
});

const PullquoteBlockSchema = BaseBlockSchema.extend({
  type: z.literal('pullquote'),
  cite: z.string().optional(),
});

const BlockquoteBlockSchema = BaseBlockSchema.extend({
  type: z.literal('blockquote'),
  cite: z.string().optional(),
});

export const ContentBlockSchema = z.discriminatedUnion('type', [HeadingBlockSchema, ParagraphBlockSchema, PullquoteBlockSchema, BlockquoteBlockSchema]);
