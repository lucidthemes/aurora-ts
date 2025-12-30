import type { Category } from './category';
import type { Tag } from './tag';

export interface SummaryData {
  price: number;
  maxQuantity?: number;
  SKU: string;
  category?: Category;
  tags?: Tag[];
}

export interface AddCartFormData {
  variationId?: number;
  quantity: number;
}
