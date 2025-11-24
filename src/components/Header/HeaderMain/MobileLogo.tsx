import { Link } from 'react-router-dom';

export default function MobileLogo() {
  return (
    <Link to="/" className="w-fit lg:hidden">
      <img src="/images/logo.png" alt="Site logo" className="max-w-37" />
    </Link>
  );
}
