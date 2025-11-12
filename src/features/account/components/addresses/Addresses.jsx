import { useAuthContext } from '@contexts/AuthContext';
import useAddresses from '../../hooks/addresses/useAddresses';
import Address from './Address';
import EditForm from './EditForm';

export default function Addresses() {
  const { loggedInUser, handleUserUpdate } = useAuthContext();
  const { shippingEditShow, billingEditShow, handleShippingEditShow, handleBillingEditShow } = useAddresses();

  return (
    <div className="flex flex-col gap-y-5">
      <p>The following addresses will be used on the checkout page by default.</p>
      <div className="flex flex-col gap-10 lg:flex-row">
        <div className="flex basis-1/2 flex-col gap-y-5">
          <div className="flex flex-wrap justify-between gap-y-2.5">
            <h2>Shipping address</h2>
            <button onClick={handleShippingEditShow} className="cursor-pointer text-lg text-boulder capitalize hover:text-shark">
              {!shippingEditShow ? 'edit' : 'cancel'}
            </button>
          </div>
          {!shippingEditShow ? (
            <Address loggedInUser={loggedInUser} section="shipping" />
          ) : (
            <EditForm loggedInUser={loggedInUser} handleUserUpdate={handleUserUpdate} handleShippingEditShow={handleShippingEditShow} section="shipping" />
          )}
        </div>
        <div className="flex basis-1/2 flex-col gap-y-5">
          <div className="flex flex-wrap justify-between gap-y-2.5">
            <h2>Billing address</h2>
            <button onClick={handleBillingEditShow} className="cursor-pointer text-lg text-boulder capitalize hover:text-shark">
              {!billingEditShow ? 'edit' : 'cancel'}
            </button>
          </div>
          {!billingEditShow ? (
            <Address loggedInUser={loggedInUser} section="billing" />
          ) : (
            <EditForm loggedInUser={loggedInUser} handleUserUpdate={handleUserUpdate} handleBillingEditShow={handleBillingEditShow} section="billing" />
          )}
        </div>
      </div>
    </div>
  );
}
