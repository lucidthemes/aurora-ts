import { useParams, Navigate } from 'react-router-dom';

import Container from '@components/Layout/Container';
import useOrderReceived from '@features/checkout/hooks/orderReceived/useOrderReceived';
import OrderReceived from '@features/checkout/components/orderReceived';

export default function OrderReceivedPage() {
  const { slug } = useParams();
  const orderId = Number(slug);

  const orderReceived = useOrderReceived(orderId);

  if (orderReceived.status === 'not-found') return <Navigate to="/404" replace />;

  if (orderReceived.status === 'loading') {
    return (
      <Container>
        <p className="rounded-sm bg-white p-5 text-center">Order loading</p>
      </Container>
    );
  }

  if (orderReceived.status !== 'loaded') return null;

  const { order } = orderReceived;

  return (
    <Container>
      <OrderReceived order={order} />
    </Container>
  );
}
