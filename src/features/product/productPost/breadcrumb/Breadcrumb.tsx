import { Link } from 'react-router-dom';

import type { Product } from '@typings/products/product';

import useBreadcrumb from './useBreadcrumbs';
import Separator from './Separator';

interface BreadcrumbProps {
  product: Product;
}

export default function Breadcrumb({ product }: BreadcrumbProps) {
  const breadcrumbCategory = useBreadcrumb(product);

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-x-2.5 text-lg text-boulder">
        <li className="flex items-center gap-x-1">
          <Link to="/shop" className="transition-colors duration-300 ease-in-out hover:text-shark focus:text-shark">
            Shop
          </Link>
          <Separator />
        </li>
        {breadcrumbCategory && (
          <li className="flex items-center gap-x-1">
            <Link to={`/product-category/${breadcrumbCategory.slug}`} className="transition-colors duration-300 ease-in-out hover:text-shark focus:text-shark">
              {breadcrumbCategory.name}
            </Link>
            <Separator />
          </li>
        )}
        <li aria-current="page">{product.title}</li>
      </ol>
    </nav>
  );
}
