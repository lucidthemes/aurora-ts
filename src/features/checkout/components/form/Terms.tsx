import { Link } from 'react-router-dom';

export default function Terms() {
  return (
    <div className="border-t-1 border-pearl-bush py-6">
      <p>
        By proceeding with your purchase you agree to our{' '}
        <Link to="/" className="underline transition-colors duration-300 ease-in-out hover:text-shark focus:text-shark">
          Terms and Conditions
        </Link>{' '}
        and{' '}
        <Link to="/" className="underline transition-colors duration-300 ease-in-out hover:text-shark focus:text-shark">
          Privacy Policy
        </Link>
      </p>
    </div>
  );
}
