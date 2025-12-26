import { Link } from 'react-router-dom';

import StarRating from '@features/product/starRating';
import type { Product } from '@typings/products/product';

interface ItemProps {
  product: Product;
}

export default function Item({ product }: ItemProps) {
  return (
    <li>
      <div className="flex flex-col gap-y-5">
        <Link to={`/product/${product.slug}`}>
          <img src={product.image} alt={product.title} className="rounded-md" />
        </Link>
        <div className="flex flex-col gap-y-2.5">
          <Link to={`/product/${product.slug}`} className="text-shark transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
            <h3>{product.title}</h3>
          </Link>
          <span className="mb-2.5 text-xl text-boulder">£{product.price.toFixed(2)}</span>
          <StarRating rating={product.averageReview} />
        </div>
      </div>
    </li>
  );
}
