import { Link } from 'react-router-dom';
import MetaList from '@features/blog/MetaList';

export default function Item({ related }) {
  return (
    <li className="nth-3:hidden lg:nth-3:block">
      <article className="h-full overflow-hidden rounded-md bg-pampas">
        <div>
          <Link to={`/blog/${related.slug}`}>
            <img src={related.image} alt={related.title} />
          </Link>
        </div>
        <header className="flex flex-col gap-y-4 p-5">
          <h4>
            <Link to={`/blog/${related.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
              {related.title}
            </Link>
          </h4>
          <MetaList date={related.date} />
        </header>
      </article>
    </li>
  );
}
