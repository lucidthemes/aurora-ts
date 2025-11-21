import { Link } from 'react-router-dom';

export default function DesktopLogo({ headerLayout = 'blog' }) {
  const logoClasses = headerLayout === 'blog' ? 'max-w-62' : 'max-w-44';

  return (
    <Link to="/" className="hidden w-fit py-10 lg:block">
      <img src="/images/logo.png" alt="Site logo" className={`${logoClasses}`} />
    </Link>
  );
}
