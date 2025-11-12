import { Link } from 'react-router-dom';

export default function Nav() {
  const navLinks = [
    { id: 1, link: '/', text: 'Privacy Policy' },
    { id: 2, link: '/', text: 'Cookie policy' },
    { id: 3, link: '/contact', text: 'Contact' },
  ];

  return (
    <nav className="self-center lg:self-start" aria-label="Footer bottom links">
      <ul className="flex gap-x-6 text-sm tracking-xwide uppercase">
        {navLinks.map((navLink) => (
          <li key={navLink.id}>
            <Link to={navLink.link} className="text-shark transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
              {navLink.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
