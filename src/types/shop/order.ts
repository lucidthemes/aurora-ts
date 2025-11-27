import { Address } from './address';
import { Coupon } from './coupon';
import { ShippingOption } from './shippingOption';
import { PaymentOption } from './paymentOption';

interface Item {
  productId: number;
  title: string;
  slug: string;
  image: string;
  price: number;
  variation?: {
    id: number;
    colourId?: number;
    sizeId?: number;
    price: number;
    stock?: number;
    SKU: string;
  };
  quantity: number;
}

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
