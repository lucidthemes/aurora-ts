import { useAuthContext } from '@contexts/AuthContext';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { loggedInUser, handleLogout } = useAuthContext();

  const name = loggedInUser.shipping?.firstName || loggedInUser.email;

  return (
    <>
      <p className="mb-5">
        Hello {name} (not {name}?{' '}
        <Link onClick={handleLogout} className="underline">
          Log out
        </Link>
        )
      </p>
      <p>
        From your account dashboard you can view your{' '}
        <Link to="/account/orders" className="underline">
          recent orders
        </Link>
        , manage your{' '}
        <Link to="/account/address" className="underline">
          shipping and billing addresses
        </Link>
        , and{' '}
        <Link to="/account/details" className="underline">
          edit your password and account details
        </Link>
        .
      </p>
    </>
  );
}
