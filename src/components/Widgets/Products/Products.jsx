import { Link } from 'react-router-dom';
import useProducts from './useProducts';
import WidgetTitle from '@components/Widgets/Title';
import StarRating from '@features/product/starRating';

export default function ProductsWidget({ title = '', limit = 3, category = '', style = 'wide' }) {
  const products = useProducts(limit, category);

  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      {Array.isArray(products) && products.length > 0 ? (
        <ul className="flex flex-col gap-y-8" role="list" aria-label="Widget products">
          {products.map((product) => (
            <li key={product.id} className={`${style === 'wide' ? 'flex flex-col gap-y-5' : 'flex flex-row gap-x-5'}`} role="listitem">
              <div className={`${style === 'small' ? 'basis-[40%]' : ''}`}>
                <Link to={`/product/${product.slug}`}>
                  <img src={product.image} alt={product.title} className="rounded-md" />
                </Link>
              </div>
              <header className={`flex flex-col gap-y-2.5 ${style === 'small' ? 'basis-[60%]' : ''}`}>
                <h4>
                  <Link to={`/product/${product.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
                    {product.title}
                  </Link>
                </h4>
                <span className="mb-2.5 text-lg text-boulder">£{product.price.toFixed(2)}</span>
                <StarRating rating={product.averageReview} />
              </header>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-md bg-pampas p-5 text-center">No products found</p>
      )}
    </section>
  );
}
