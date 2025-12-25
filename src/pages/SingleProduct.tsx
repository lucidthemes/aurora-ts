import { useParams, Navigate } from 'react-router-dom';

import Container from '@components/Layout/Container';
import useSingleProduct from '@features/product/productPost/useSingleProduct';
import ProductPost from '@features/product/productPost';

export default function SingleProduct() {
  const { slug } = useParams();
  const singleProduct = useSingleProduct(slug);

  if (singleProduct === null) return null;
  if (singleProduct === false) return <Navigate to="/404" replace />;

  return (
    <Container>
      <div id={`product-${singleProduct.id}`} className="flex flex-col gap-y-10">
        <ProductPost singleProduct={singleProduct} />
      </div>
    </Container>
  );
}
