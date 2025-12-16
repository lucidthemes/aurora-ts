import { ContentBlock } from '@typings/contentBlock';

export interface Product {
  id: number;
  title: string;
  slug: string;
  date: string;
  category?: number;
  tags?: number[];
  image?: string;
  gallery?: string[];
  shortDescription?: string;
  description?: ContentBlock[];
  price: number;
  inStock: boolean;
  stock?: number;
  SKU: string;
  variationAttributes?: { type: string; options: number[] }[];
  variations?: { id: number; colourId?: number; sizeId?: number; price: number; stock: number; SKU: string }[];
  reviewCount?: number;
  averageReview?: number;
  relatedProducts?: number[];
}
