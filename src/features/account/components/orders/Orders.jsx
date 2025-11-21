import { useAuthContext } from '@contexts/AuthContext';
import useOrders from '../../hooks/orders/useOrders';
import Items from './Items';
import Button from '@components/UI/Button';

export default function Orders() {
  const { loggedInUser } = useAuthContext();

  const orders = useOrders(loggedInUser.id);

  return (
    <>
      {orders.length > 0 ? (
        <Items orders={orders} />
      ) : (
        <div className="flex items-center justify-between rounded-md bg-pampas p-5">
          <p>No orders found</p>
          <Button to="/shop">Browse products</Button>
        </div>
      )}
    </>
  );
}
