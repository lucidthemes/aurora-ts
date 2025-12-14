import Container from '@components/Layout/Container';
import type { Post } from '@typings/posts/post';
import type { Category } from '@typings/posts/category';
import type { Author } from '@typings/posts/author';

import Content from './components/Content';
import OutsideLayout from './components/OutsideLayout';
import OverlayLayout from './components/OverlayLayout';
import SplitLayout from './components/SplitLayout';

interface HeaderProps {
  post: Post;
  categoryMap: Record<number, Category>;
  author: Author | null;
}

export default function Header({ post, categoryMap, author }: HeaderProps) {
  const layout = post.postHeader?.layout || 'outside-above';
  const besideSidebar = post.postHeader?.besideSidebar || false;

  let headerLayout = '';
  let headerLayoutWidth = '';
  let headerLayoutAlign = '';
  let headerCustomPadding = '';

  if (layout.includes('outside')) {
    headerLayout = 'outside';
    headerLayoutAlign = 'center';
  } else if (layout.includes('overlay')) {
    headerLayout = 'overlay';
    headerLayoutAlign = 'center';
  } else if (layout.includes('split')) {
    headerLayout = 'split';
    headerLayoutAlign = 'left';
  }

  if (layout.includes('wide')) {
    headerLayoutWidth = 'wide';
  } else if (layout.includes('full')) {
    headerLayoutWidth = 'full';
    headerCustomPadding = 'p-0';
  }

  const headerContent = <Content post={post} categoryMap={categoryMap} author={author} align={headerLayoutAlign} />;

  const LayoutComponent = {
    outside: OutsideLayout,
    overlay: OverlayLayout,
    split: SplitLayout,
  }[headerLayout];

  if (!LayoutComponent) {
    return null;
  }

  const headerInner = <LayoutComponent post={post} content={headerContent} layout={layout} />;

  return (
    <header className={`post-header-${headerLayout}`}>
      {!besideSidebar ? (
        <Container width={headerLayoutWidth} customPadding={headerCustomPadding}>
          {headerInner}
        </Container>
      ) : (
        headerInner
      )}
    </header>
  );
}
