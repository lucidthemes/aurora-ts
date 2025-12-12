import { Customer } from '@typings/shop/customer';
import useEmail from '../../hooks/details/useEmail';
import EmailForm from './EmailForm';

interface EmailProps {
  loggedInUser: Customer | null;
  handleUserUpdate: <K extends 'email' | 'shipping' | 'billing'>(section: K, data: Customer[K]) => void;
}

export default function Email({ loggedInUser, handleUserUpdate }: EmailProps) {
  const { emailEditShow, handleEmailEditShow } = useEmail();

  return (
    <div className="flex basis-1/2 flex-col gap-y-5">
      <div className="flex flex-wrap justify-between gap-y-2.5">
        <h2>Email address</h2>
        <button onClick={handleEmailEditShow} className="cursor-pointer text-lg text-boulder capitalize hover:text-shark">
          {!emailEditShow ? 'edit' : 'cancel'}
        </button>
      </div>
      {!emailEditShow ? (
        <p>{loggedInUser?.email}</p>
      ) : (
        <EmailForm loggedInUser={loggedInUser} handleUserUpdate={handleUserUpdate} handleEmailEditShow={handleEmailEditShow} />
      )}
    </div>
  );
}
