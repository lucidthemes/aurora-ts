import type { Dispatch, SetStateAction } from 'react';

import type { PaymentOption } from '@typings/shop/paymentOption';

import usePaymentOptions from '../../hooks/form/usePaymentOptions';

interface PaymentOptionsProps {
  billingSameShipping: boolean;
  paymentOption: PaymentOption | null;
  setPaymentOption: Dispatch<SetStateAction<PaymentOption | null>>;
}

export default function PaymentOptions({ billingSameShipping, paymentOption, setPaymentOption }: PaymentOptionsProps) {
  const { paymentOptions, handlePaymentOptionChange } = usePaymentOptions(paymentOption, setPaymentOption);

  if (!paymentOption || !Array.isArray(paymentOptions) || paymentOptions.length === 0) return null;

  const sectionNumber = billingSameShipping ? '4' : '5';

  return (
    <fieldset className="mb-10 flex flex-col gap-y-6">
      <legend className="sr-only">Payment options</legend>
      <h2 className="text-3xl">{sectionNumber}. Payment options</h2>
      <div className="relative pl-7.5 before:absolute before:left-0 before:left-2 before:h-full before:border-l-1 before:border-pearl-bush">
        <ul className="rounded-sm border-1 border-pearl-bush">
          {paymentOptions.map((payment) => {
            const paymentSelectedClasses = payment.id === paymentOption.id ? 'ring-1 ring-black rounded-sm' : '';
            const paymentRadioChecked = payment.id === paymentOption.id;
            return (
              <li
                key={payment.id}
                onClick={() => handlePaymentOptionChange(payment)}
                className={`flex cursor-pointer flex-col gap-y-2.5 border-b-1 border-pearl-bush p-4 last:border-b-0 ${paymentSelectedClasses}`}
              >
                <div className="flex items-center gap-x-4">
                  <div className="flex">
                    <input
                      type="radio"
                      className="h-6 w-6 cursor-pointer accent-black"
                      name="payment"
                      checked={paymentRadioChecked}
                      onChange={() => handlePaymentOptionChange(payment)}
                    />
                  </div>
                  <p className="text-xl text-shark">{payment.name}</p>
                </div>
                {payment.id === paymentOption.id && <p>{payment.description}</p>}
              </li>
            );
          })}
        </ul>
      </div>
    </fieldset>
  );
}
