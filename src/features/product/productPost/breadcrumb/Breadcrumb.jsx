import { Link } from 'react-router-dom';
import useBreadcrumb from './useBreadcrumbs';
import Separator from './Separator';

export default function Breadcrumb({ singleProduct }) {
  const breadcrumbCategory = useBreadcrumb(singleProduct);

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
        <li aria-current="page">{singleProduct.title}</li>
      </ol>
    </nav>
  );
}
