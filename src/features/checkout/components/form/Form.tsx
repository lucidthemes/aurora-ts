import { useNavigate } from 'react-router-dom';
import type { Dispatch, SetStateAction } from 'react';

import { useAuthContext } from '@contexts/AuthContext';
import type { Item } from '@typings/cart/item';
import type { Coupon } from '@typings/shop/coupon';
import type { ShippingOption } from '@typings/shop/shippingOption';
import type { PaymentOption } from '@typings/shop/paymentOption';

import useForm from '../../hooks/form/useForm';
import ContactInformation from './ContactInformation';
import ShippingAddress from './ShippingAddress';
import BillingAddress from './BillingAddress';
import ShippingOptions from './ShippingOptions';
import PaymentOptions from './PaymentOptions';
import Note from './Note';
import Terms from './Terms';
import Button from '@components/UI/Button';

interface FormProps {
  cartItems: Item[];
  cartSubTotal: number;
  cartCoupons: Coupon[];
  emptyCart: () => void;
  shippingOption: ShippingOption | null;
  setShippingOption: Dispatch<SetStateAction<ShippingOption | null>>;
  paymentOption: PaymentOption | null;
  setPaymentOption: Dispatch<SetStateAction<PaymentOption | null>>;
  checkoutTotal: number;
}

export default function Form({
  cartItems,
  cartSubTotal,
  cartCoupons,
  emptyCart,
  shippingOption,
  setShippingOption,
  paymentOption,
  setPaymentOption,
  checkoutTotal,
}: FormProps) {
  const { loggedInUser } = useAuthContext();

  const navigate = useNavigate();

  const {
    checkoutFormData,
    checkoutFormErrors,
    billingSameShipping,
    setBillingSameShipping,
    noteEnabled,
    setNoteEnabled,
    handleFormChange,
    handleFormKeyDown,
    handleFormSubmit,
  } = useForm(cartItems, cartSubTotal, cartCoupons, emptyCart, shippingOption, paymentOption, checkoutTotal, loggedInUser, navigate);

  return (
    <form onKeyDown={handleFormKeyDown} onSubmit={handleFormSubmit} aria-label="Checkout" noValidate>
      <ContactInformation
        checkoutFormData={checkoutFormData}
        checkoutFormErrors={checkoutFormErrors}
        handleFormChange={handleFormChange}
        loggedInUser={loggedInUser}
      />
      <ShippingAddress
        checkoutFormData={checkoutFormData}
        checkoutFormErrors={checkoutFormErrors}
        billingSameShipping={billingSameShipping}
        setBillingSameShipping={setBillingSameShipping}
        handleFormChange={handleFormChange}
      />
      <BillingAddress
        checkoutFormData={checkoutFormData}
        checkoutFormErrors={checkoutFormErrors}
        billingSameShipping={billingSameShipping}
        handleFormChange={handleFormChange}
      />
      <ShippingOptions billingSameShipping={billingSameShipping} shippingOption={shippingOption} setShippingOption={setShippingOption} />
      <PaymentOptions billingSameShipping={billingSameShipping} paymentOption={paymentOption} setPaymentOption={setPaymentOption} />
      <Note checkoutFormData={checkoutFormData} noteEnabled={noteEnabled} setNoteEnabled={setNoteEnabled} handleFormChange={handleFormChange} />
      <Terms />
      <Button type="submit" className="w-full">
        Place order
      </Button>
    </form>
  );
}
