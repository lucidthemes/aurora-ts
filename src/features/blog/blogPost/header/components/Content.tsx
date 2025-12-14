import CategoryList from '@features/blog/CategoryList';
import MetaList from '@features/blog/MetaList';
import type { Post } from '@typings/posts/post';
import type { Category } from '@typings/posts/category';
import type { Author } from '@typings/posts/author';

interface ContentProps {
  post: Post;
  categoryMap: Record<number, Category>;
  author: Author | null;
  align: string;
}

export default function Content({ post, categoryMap, author, align = 'center' }: ContentProps) {
  const alignClass = align === 'left' ? 'start' : align === 'right' ? 'end' : 'center';

  return (
    <div className={`flex flex-col items-${alignClass} gap-y-4 text-${align}`}>
      {post.categories && post.categories.length > 0 && <CategoryList categories={post.categories} categoryMap={categoryMap} />}
      {post.title && <h1>{post.title}</h1>}
      <MetaList author={author} date={post.date} />
    </div>
  );
}
