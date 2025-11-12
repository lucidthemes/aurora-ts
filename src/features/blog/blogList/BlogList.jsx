import useBlogList from './hooks/useBlogList';
import usePagination from './hooks/usePagination';
import WideLayout from './components/Item/WideLayout';
import SmallLayout from './components/Item/SmallLayout';
import Pagination from './components/pagination/Pagination';

export default function BlogList({ limit, category = null, tag = null, author = null, search = '', style = 'wide', showPagination = true, postsPerPage = 6 }) {
  const { posts, categoryMap, authorMap } = useBlogList(limit, category, tag, author, search);
  const { totalPages, currentPage, currentPosts, postListRef, handlePageChange } = usePagination(posts, postsPerPage);

  if (!Array.isArray(posts) || posts.length === 0) {
    return <p className="rounded-sm bg-white p-5 text-center">No posts found</p>;
  }

  const wide = style === 'wide';
  const wideSmall = style === 'wide-small-small' || style === 'wide-small-half' || style === 'wide-small-large';
  const wideGrid = style === 'wide-grid-2' || style === 'wide-grid-3' || style === 'wide-grid-4';
  const grid = style === 'grid-2' || style === 'grid-3' || style === 'grid-4';
  const small = style === 'small-small' || style === 'small-half' || style === 'small-large';

  const wideExcerpt = 70;
  const smallExcerpt = 45;
  const gridExcerpt = 25;

  let listClasses = 'grid gap-10';
  let mediaClasses = '';
  let contentClasses = 'p-5 md:p-7.5';

  if (!wideGrid && !grid) {
    listClasses += ' grid-cols-1';
    contentClasses += ' lg:p-10';
    if (style.includes('small-small')) {
      mediaClasses += ' lg:basis-[40%]';
      contentClasses += ' lg:basis-[60%]';
    } else if (style.includes('small-half')) {
      mediaClasses += ' lg:basis-1/2';
      contentClasses += ' lg:basis-1/2';
    } else if (style.includes('small-large')) {
      mediaClasses += ' lg:basis-[60%]';
      contentClasses += ' lg:basis-[40%]';
    }
  } else {
    if (style.includes('grid-2')) {
      listClasses += ' grid-cols-1 lg:grid-cols-2';
      contentClasses += ' lg:p-10';
    }
    if (style.includes('grid-3')) {
      listClasses += ' grid-cols-1 lg:grid-cols-3';
    }
    if (style.includes('grid-4')) {
      listClasses += ' grid-cols-1 lg:grid-cols-4';
      contentClasses += ' lg:p-5';
    }
  }

  return (
    <>
      <ul className={listClasses} aria-label="Blog posts" ref={postListRef}>
        {currentPosts.map((post, index) => {
          const isFirstPost = index === 0 && currentPage === 1;
          const itemWide = wide || grid || wideGrid || (wideSmall && isFirstPost);
          const itemWideGridClasses = wideGrid && isFirstPost ? 'col-span-full' : '';
          const itemWideExcerptLength =
            wide || (wideSmall && isFirstPost) ? wideExcerpt : grid ? gridExcerpt : wideGrid && !isFirstPost ? gridExcerpt : wideExcerpt;

          return (
            <li key={post.id} className={itemWideGridClasses}>
              {itemWide ? (
                <WideLayout
                  post={post}
                  categoryMap={categoryMap}
                  authorMap={authorMap}
                  excerptLength={itemWideExcerptLength}
                  mediaClasses={mediaClasses}
                  contentClasses={contentClasses}
                />
              ) : (
                <SmallLayout
                  post={post}
                  categoryMap={categoryMap}
                  authorMap={authorMap}
                  excerptLength={smallExcerpt}
                  mediaClasses={mediaClasses}
                  contentClasses={contentClasses}
                />
              )}
            </li>
          );
        })}
      </ul>

      {showPagination && totalPages > 1 && <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />}
    </>
  );
}
