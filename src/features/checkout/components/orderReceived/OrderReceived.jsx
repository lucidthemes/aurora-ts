import Overview from './Overview';
import OrderDetails from './orderDetails';
import CustomerDetails from './CustomerDetails';

export default function OrderReceived({ order, location = 'checkout' }) {
  if (!order) return null;

  const orderReceivedClasses = location === 'checkout' ? 'p-5 md:p-7.5 lg:p-10' : '';

  return (
    <div className={`flex flex-col gap-y-10 rounded-md bg-white ${orderReceivedClasses}`}>
      {location === 'checkout' && (
        <>
          <h1 className="text-center">Thank you! Your order has been received.</h1>
          <Overview order={order} />
        </>
      )}
      <OrderDetails order={order} />
      <CustomerDetails order={order} />
    </div>
  );
}
