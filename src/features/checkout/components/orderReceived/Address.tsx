import type { Order } from '@typings/shop/order';

interface AddressProps {
  order: Order;
  section: 'shipping' | 'billing';
}

export default function Address({ order, section }: AddressProps) {
  if (!order.checkoutData) return null;

  let country = '';

  if (order.checkoutData[section].country) {
    switch (order.checkoutData[section].country) {
      case 'GB':
        country = 'United Kingdom';
        break;
    }
  }

  return (
    <address className="not-italic">
      <p>{order.checkoutData[section].firstName + ' ' + order.checkoutData[section].lastName}</p>
      <p>{order.checkoutData[section].addressLine1}</p>
      <p>{order.checkoutData[section].addressLine2}</p>
      <p>{order.checkoutData[section].city}</p>
      <p>{order.checkoutData[section].county}</p>
      <p>{order.checkoutData[section].postcode}</p>
      {country && <p>{country}</p>}
      <p>{order.checkoutData[section].phone}</p>
      <p>{order.checkoutData.contact.email}</p>
    </address>
  );
}
