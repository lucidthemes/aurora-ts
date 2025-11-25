interface BaseBlock {
  id: number;
  text: string;
}

interface HeadingBlock extends BaseBlock {
  type: 'heading';
  level?: number;
}

interface ParagraphBlock extends BaseBlock {
  type: 'paragraph';
}

interface PullquoteBlock extends BaseBlock {
  type: 'pullquote';
  cite?: string;
}

interface BlockquoteBlock extends BaseBlock {
  type: 'blockquote';
  cite?: string;
}

export type ContentBlock = HeadingBlock | ParagraphBlock | PullquoteBlock | BlockquoteBlock;
