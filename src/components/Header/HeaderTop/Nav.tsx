import { Link } from 'react-router-dom';

export default function Nav() {
  const navLinks: { id: number; link: string; text: string }[] = [
    { id: 1, link: '/category/lifestyle', text: 'Lifestyle' },
    { id: 2, link: '/category/travel', text: 'Travel' },
    { id: 3, link: '/category/photography', text: 'Photography' },
  ];

  return (
    <nav className="hidden lg:block" aria-label="Header top links">
      <ul className="flex gap-x-7.5 text-sm tracking-xwide uppercase">
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
