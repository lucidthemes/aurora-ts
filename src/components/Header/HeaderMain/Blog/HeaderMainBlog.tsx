import { useMobileMenuContext } from '@contexts/MobileMenuContext';
import Container from '@components/Layout/Container';
import NavLeft from './NavLeft';
import NavRight from './NavRight';
import DesktopLogo from '../DesktopLogo';
import MobileLogo from '../MobileLogo';
import MobileMenuIcon from '../MobileMenuIcon';

export default function HeaderMainBlog() {
  const { mobileMenuActive } = useMobileMenuContext();
  const mobileMenuClasses = mobileMenuActive ? 'right-0' : '-right-[75%] md:-right-75';

  return (
    <Container>
      <div className="header-blog-main-split-wrap flex h-22 items-center justify-between lg:block lg:h-auto">
        <MobileLogo />
        <MobileMenuIcon />
        <div
          className={`header-blog-main-split-inner-wrap fixed top-0 overflow-y-scroll lg:overflow-y-visible ${mobileMenuClasses} z-3 h-full w-[75%] bg-white transition-[right] duration-300 ease-in-out md:w-75 lg:static lg:grid lg:h-auto lg:w-full lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-x-10 xl:gap-x-20`}
        >
          <NavLeft />
          <DesktopLogo />
          <NavRight />
        </div>
      </div>
    </Container>
  );
}
