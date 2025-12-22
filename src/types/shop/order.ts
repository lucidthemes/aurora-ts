import type { Address } from './address';
import type { Item } from '@typings/cart/item';
import type { Coupon } from './coupon';
import type { ShippingOption } from './shippingOption';
import type { PaymentOption } from './paymentOption';

export interface Order {
  id: number;
  customerId: number;
  date: string;
  checkoutData: {
    contact: { email: string };
    shipping: Address;
    billing: Address;
    note?: { text: string };
  };
  items: Item[];
  subTotal: number;
  coupons: Coupon[];
  shippingOption: ShippingOption;
  paymentOption: PaymentOption;
  total: number;
}
