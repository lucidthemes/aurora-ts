export interface PriceFilterMinMax {
  minPrice: number;
  maxPrice: number;
}

export interface ActiveFilters {
  category: number[];
  colour: number[];
  size: number[];
  rating: number[];
  stock: Record<string, boolean>;
  price: PriceFilterMinMax;
}

export interface FilterCounts {
  category: Record<number, number>;
  colour: Record<number, number>;
  size: Record<number, number>;
  rating: Record<number, number>;
  stock: Record<string, number>;
}
