export interface ContentBlock {
  id: number;
  type: 'paragraph' | 'pullquote' | 'blockquote';
  level?: number;
  text: string;
  cite?: string;
}
