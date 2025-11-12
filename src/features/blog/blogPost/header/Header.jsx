import Content from './components/Content';
import OutsideLayout from './components/OutsideLayout';
import OverlayLayout from './components/OverlayLayout';
import SplitLayout from './components/SplitLayout';
import Container from '@components/Layout/Container';

export default function Header({ singlePost, author, categoryMap }) {
  const layout = singlePost.postHeader?.layout || 'outside-above';
  const besideSidebar = singlePost.postHeader?.besideSidebar || false;

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

  const headerContent = <Content singlePost={singlePost} author={author} categoryMap={categoryMap} align={headerLayoutAlign} />;

  const LayoutComponent = {
    outside: OutsideLayout,
    overlay: OverlayLayout,
    split: SplitLayout,
  }[headerLayout];

  if (!LayoutComponent) {
    return null;
  }

  const headerInner = <LayoutComponent singlePost={singlePost} content={headerContent} layout={layout} />;

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
