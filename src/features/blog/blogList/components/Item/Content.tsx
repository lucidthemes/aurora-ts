import { Link } from 'react-router-dom';
import CategoryList from '@features/blog/CategoryList';
import MetaList from '@features/blog/MetaList';
import Button from '@components/UI/Button';
import { textTruncateByWords } from '@utils/formatters';
import { Post } from '@typings/posts/post';
import { Category } from '@typings/posts/category';
import { Author } from '@typings/posts/author';

interface ContentProps {
  post: Post;
  categoryMap: Record<number, Category>;
  authorMap: Record<number, Author>;
  excerptLength: number;
  contentClasses: string;
}

export default function Content({ post, categoryMap, authorMap, excerptLength, contentClasses }: ContentProps) {
  const author = authorMap[post.authorId];

  return (
    <div className={`flex flex-col ${contentClasses} gap-y-8 bg-white`}>
      <header className="flex flex-col gap-y-5">
        {post.categories && post.categories.length > 0 && <CategoryList categories={post.categories} categoryMap={categoryMap} />}
        <h2>
          <Link to={`/blog/${post.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
            {post.title}
          </Link>
        </h2>
        <MetaList author={author} date={post.date} />
      </header>
      {post.excerpt && <p>{textTruncateByWords(post.excerpt, excerptLength)}</p>}
      <Button to={`/blog/${post.slug}`} className="max-w-fit">
        Read More
      </Button>
    </div>
  );
}
