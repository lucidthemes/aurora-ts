import { useParams, Navigate } from 'react-router-dom';

import Container from '@components/Layout/Container';
import useSingleProduct from '@features/product/productPost/useSingleProduct';
import ProductPost from '@features/product/productPost';

export default function SingleProduct() {
  const { slug } = useParams();
  const singleProduct = useSingleProduct(slug);

  if (singleProduct.status === 'not-found') return <Navigate to="/404" replace />;

  if (singleProduct.status === 'loading')
    return (
      <Container>
        <p className="rounded-sm bg-white p-5 text-center">Product loading</p>
      </Container>
    );

  if (singleProduct.status !== 'loaded') return null;

  const { product } = singleProduct;

  return (
    <Container>
      <div id={`product-${product.id}`} className="flex flex-col gap-y-10">
        <ProductPost product={product} />
      </div>
    </Container>
  );
}
