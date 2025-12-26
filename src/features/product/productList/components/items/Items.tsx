import type { Product } from '@typings/products/product';

import Item from './Item';

interface ItemsProps {
  products: Product[];
}

export default function Items({ products }: ItemsProps) {
  if (!products || products.length === 0) {
    return <p className="rounded-sm bg-white p-5 text-center">No products found</p>;
  }

  return (
    <ul className="grid grid-cols-1 gap-x-7.5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3" aria-label="Products">
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </ul>
  );
}
