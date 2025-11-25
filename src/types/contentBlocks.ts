export interface ContentBlocks {
  id: number;
  type: 'paragraph' | 'pullquote' | 'blockquote';
  level?: number;
  text: string;
  cite?: string;
}
