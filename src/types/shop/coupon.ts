export interface Coupon {
  id: number;
  code: string;
  type: 'fixed' | 'percentage';
  amount: number;
  expires?: string;
}
