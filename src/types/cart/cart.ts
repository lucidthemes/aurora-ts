import type { Product } from '@typings/products/product';
import type { Coupon as CouponType } from '@typings/shop/coupon';

import type { Item } from './item';

export interface Cart {
  items: Item[];
  subTotal: number;
  coupons: CouponType[];
  total: number;
}

type AddCartItemPayload = {
  cartItemProduct: Product;
  productId: number;
  quantity: number;
  variationId?: number;
};

type UpdateCartItemPayload = {
  productId: number;
  quantity: number;
  variationId?: number;
};

type RemoveCartItemPayload = {
  productId: number;
  variationId?: number;
};

type AddCartCouponPayload = {
  coupon: CouponType;
};

type RemoveCartCouponPayload = {
  couponId: number;
};

export type CartAction =
  | {
      type: 'add_cart_item';
      payload: AddCartItemPayload;
    }
  | {
      type: 'update_cart_item';
      payload: UpdateCartItemPayload;
    }
  | {
      type: 'remove_cart_item';
      payload: RemoveCartItemPayload;
    }
  | {
      type: 'empty_cart';
    }
  | {
      type: 'add_cart_coupon';
      payload: AddCartCouponPayload;
    }
  | { type: 'remove_cart_coupon'; payload: RemoveCartCouponPayload }
  | {
      type: 'update_cart_total';
    };
