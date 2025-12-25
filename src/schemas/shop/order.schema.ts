import { z } from 'zod';

import { AddressSchema } from './address.schema';
import { CouponSchema } from './coupon.schema';
import { ShippingOptionSchema } from './shippingOption.schema';
import { PaymentOptionSchema } from './paymentOption.schema';

const ItemSchema = z.object({
  productId: z.number().int().positive(),
  title: z.string(),
  slug: z.string(),
  image: z.string(),
  price: z.number(),
  variation: z
    .object({
      id: z.number().int().positive(),
      colourId: z.number().int().positive().optional(),
      sizeId: z.number().int().positive().optional(),
      price: z.number(),
      stock: z.number().optional(),
      SKU: z.string(),
    })
    .optional(),
  quantity: z.number().int().positive(),
});

export const OrderSchema = z.object({
  id: z.number().int().positive(),
  customerId: z.number().int().positive(),
  date: z.iso.datetime(),
  checkoutData: z.object({
    contact: z.object({ email: z.email() }),
    shipping: AddressSchema,
    billing: AddressSchema,
    note: z.object({ text: z.string() }),
  }),
  items: z.array(ItemSchema),
  subTotal: z.number(),
  coupons: z.array(CouponSchema),
  shippingOption: ShippingOptionSchema,
  paymentOption: PaymentOptionSchema,
  total: z.number(),
});
