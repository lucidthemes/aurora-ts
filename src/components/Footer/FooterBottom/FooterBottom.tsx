import Container from '@components/Layout/Container';
import Nav from './Nav';
import Copyright from './Copyright';
import ScrollTop from './ScrollTop';

export default function FooterBottom() {
  return (
    <div className="bg-spring-wood py-4">
      <Container>
        <div className="flex flex-col gap-y-4 lg:flex-row lg:justify-between">
          <Nav />
          <Copyright />
          <ScrollTop />
        </div>
      </Container>
    </div>
  );
}
