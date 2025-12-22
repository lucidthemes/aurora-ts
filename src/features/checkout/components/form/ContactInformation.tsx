import type { ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

import Input from '@components/Form/Input';
import type { CheckoutFormData, CheckoutFormErrors } from '@typings/checkout/form';
import type { Customer } from '@typings/shop/customer';

interface ContactInformationProps {
  checkoutFormData: CheckoutFormData;
  checkoutFormErrors: CheckoutFormErrors;
  handleFormChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>, section: 'contact' | 'shipping' | 'billing' | 'note') => void;
  loggedInUser: Customer | null;
}

export default function ContactInformation({ checkoutFormData, checkoutFormErrors, handleFormChange, loggedInUser }: ContactInformationProps) {
  return (
    <fieldset className="mb-10 flex flex-col gap-y-6">
      <legend className="sr-only">Contact information</legend>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl">1. Contact information</h2>
        {!loggedInUser && (
          <div className="flex gap-x-1">
            <Link to="/login?redirect=/checkout" className="cursor-pointer underline">
              Login
            </Link>
            <span>or</span>
            <Link to="/login?redirect=/checkout" className="cursor-pointer underline">
              Register
            </Link>
          </div>
        )}
      </div>
      <div className="relative flex flex-col gap-y-4 pl-7.5 before:absolute before:left-0 before:left-2 before:h-full before:border-l-1 before:border-pearl-bush">
        <Input
          type="email"
          name="email"
          value={checkoutFormData.contact.email}
          onChange={(e) => handleFormChange(e, 'contact')}
          placeholder="Email address"
          autoComplete="email"
          required={false}
          label="Email address"
          error={checkoutFormErrors.contact.email}
        />
        {!loggedInUser && <p>You are currently checking out as a guest.</p>}
      </div>
    </fieldset>
  );
}
