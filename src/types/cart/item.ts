import type { Variation } from './variation';

export interface Item {
  productId: number;
  title: string;
  slug: string;
  image?: string;
  stock?: number;
  price: number;
  variation?: Variation;
  quantity: number;
}
