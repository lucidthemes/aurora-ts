import { Link } from 'react-router-dom';
import Content from './Content';
import { Post } from '@typings/posts/post';
import { Category } from '@typings/posts/category';
import { Author } from '@typings/posts/author';

interface WideLayoutProps {
  post: Post;
  categoryMap: Record<number, Category>;
  authorMap: Record<number, Author>;
  excerptLength: number;
  mediaClasses: string;
  contentClasses: string;
}

export default function WideLayout({ post, categoryMap, authorMap, excerptLength, mediaClasses, contentClasses }: WideLayoutProps) {
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
