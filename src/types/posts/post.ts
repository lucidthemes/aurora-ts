import { ContentBlock } from '@typings/contentBlock';

export interface Post {
  id: number;
  title: string;
  slug: string;
  date: string;
  authorId: number;
  categories?: number[];
  tags?: number[];
  excerpt?: string;
  content?: ContentBlock[];
  image?: string;
  relatedPosts?: number[];
  postHeader: {
    layout: 'outside-above' | 'outside-below' | 'split-narrow' | 'split-wide' | 'split-full' | 'overlay-narrow' | 'overlay-wide' | 'overlay-full';
    besideSidebar: boolean;
  };
  postSidebar: 'left' | 'right' | 'hidden';
}
