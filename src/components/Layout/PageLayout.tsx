import type { ReactNode } from 'react';

import Container from '@components/Layout/Container';

interface PageLayoutProps {
  children: ReactNode;
}

interface PageSidebarLayoutProps {
  content?: ReactNode;
  sidebar?: ReactNode;
  sidebarPosition?: 'left' | 'right';
}

export function PageLayout({ children }: PageLayoutProps) {
  return <Container>{children}</Container>;
}

export function PageSidebarLayout({ content, sidebar, sidebarPosition = 'right' }: PageSidebarLayoutProps) {
  const isLeft = sidebarPosition === 'left';

  return (
    <Container>
      <div className={`flex flex-col gap-10 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
        <div className="basis-3/4">{content}</div>
        <div className="basis-1/4">{sidebar}</div>
      </div>
    </Container>
  );
}
