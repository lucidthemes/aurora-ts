import CategoryList from '@features/blog/CategoryList';
import MetaList from '@features/blog/MetaList';

export default function Content({ singlePost, author, categoryMap, align = 'center' }) {
  const alignClass = align === 'left' ? 'start' : align === 'right' ? 'end' : 'center';

  return (
    <div className={`flex flex-col items-${alignClass} gap-y-4 text-${align}`}>
      {singlePost.categories && singlePost.categories.length > 0 && <CategoryList categories={singlePost.categories} categoryMap={categoryMap} />}
      {singlePost.title && <h1>{singlePost.title}</h1>}
      <MetaList author={author} date={singlePost.date} />
    </div>
  );
}
