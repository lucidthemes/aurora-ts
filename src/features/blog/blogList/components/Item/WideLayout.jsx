import { Link } from 'react-router-dom';
import Content from './Content';

export default function WideLayout({ post, categoryMap, authorMap, excerptLength, mediaClasses, contentClasses }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-md">
      {post.image && (
        <div className={mediaClasses}>
          <div>
            <Link to={`/blog/${post.slug}`}>
              <img src={post.image} alt={post.title} />
            </Link>
          </div>
        </div>
      )}
      <Content post={post} categoryMap={categoryMap} authorMap={authorMap} excerptLength={excerptLength} contentClasses={contentClasses} />
    </article>
  );
}
