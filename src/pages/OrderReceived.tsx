import { useParams, Navigate } from 'react-router-dom';
import useOrderReceived from '@features/checkout/hooks/orderReceived/useOrderReceived';
import Container from '@components/Layout/Container';
import OrderReceived from '@features/checkout/components/orderReceived';

export default function OrderReceivedPage() {
  const { slug: orderId } = useParams();
  const order = useOrderReceived(orderId);

  if (order === null) return null;
  if (order === false) return <Navigate to="/404" replace />;

  return (
    <Container>
      <OrderReceived order={order} />
    </Container>
  );
}
