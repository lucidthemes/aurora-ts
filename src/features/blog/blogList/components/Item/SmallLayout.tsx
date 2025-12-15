import { Link } from 'react-router-dom';

import type { Post } from '@typings/posts/post';
import type { Category } from '@typings/posts/category';
import type { Author } from '@typings/posts/author';

import Content from './Content';

interface SmallLayoutProps {
  post: Post;
  categoryMap: Record<number, Category>;
  authorMap: Record<number, Author>;
  excerptLength: number;
  mediaClasses: string;
  contentClasses: string;
}

export default function SmallLayout({ post, categoryMap, authorMap, excerptLength, mediaClasses, contentClasses }: SmallLayoutProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-md lg:flex-row">
      {post.image && (
        <div className={mediaClasses}>
          <div className="h-full bg-none lg:bg-cover lg:bg-center" style={{ backgroundImage: `url(${post.image})` }}>
            <Link to={`/blog/${post.slug}`} className="block h-full">
              <img src={post.image} alt={post.title} className="w-full lg:hidden" />
            </Link>
          </div>
        </div>
      )}
      <Content post={post} categoryMap={categoryMap} authorMap={authorMap} excerptLength={excerptLength} contentClasses={contentClasses} />
    </article>
  );
}
