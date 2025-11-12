import Container from '@components/Layout/Container';

export function PageLayout({ children }) {
  return <Container>{children}</Container>;
}

export function PageSidebarLayout({ content, sidebar, sidebarPosition = 'right' }) {
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
