import { Link } from 'react-router-dom';
import usePosts from './usePosts';
import WidgetTitle from '@components/Widgets/Title';
import MetaList from '@features/blog/MetaList';

export default function PostsWidget({ title = '', limit = 3, category = '', style = 'wide' }) {
  const posts = usePosts(limit, category);

  return (
    <section>
      <WidgetTitle>{title}</WidgetTitle>
      {Array.isArray(posts) && posts.length > 0 ? (
        <ul className="flex flex-col gap-y-8" role="list" aria-label="Widget posts">
          {posts.map((post) => (
            <li key={post.id} className={`${style === 'wide' ? 'flex flex-col gap-y-5' : 'flex flex-row gap-x-5'}`} role="listitem">
              <div className={`${style === 'small' ? 'basis-[40%]' : ''}`}>
                <Link to={`/blog/${post.slug}`}>
                  <img src={post.image} alt={post.title} className="rounded-md" />
                </Link>
              </div>
              <header className={`flex flex-col gap-y-4 ${style === 'small' ? 'basis-[60%]' : ''}`}>
                <h4>
                  <Link to={`/blog/${post.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
                    {post.title}
                  </Link>
                </h4>
                <MetaList date={post.date} />
              </header>
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-md bg-pampas p-5 text-center">No posts found</p>
      )}
    </section>
  );
}
