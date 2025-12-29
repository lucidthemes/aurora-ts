import type { Product } from '@typings/products/product';

interface SingleImageProps {
  product: Product;
}

export default function SingleImage({ product }: SingleImageProps) {
  return (
    <div className="relative overflow-hidden rounded-md">
      <img src={product.image} />
    </div>
  );
}
