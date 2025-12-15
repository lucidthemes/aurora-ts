import Container from '@components/Layout/Container';
import { useMobileMenuContext } from '@contexts/MobileMenuContext';

import DesktopLogo from '../DesktopLogo';
import Nav from './Nav';
import Icons from '../../Icons';
import MobileLogo from '../MobileLogo';
import MobileMenuIcon from '../MobileMenuIcon';

interface HeaderMainMinimalProps {
  handleHeaderSearchActive: () => void;
}

export default function HeaderMainMinimal({ handleHeaderSearchActive }: HeaderMainMinimalProps) {
  const { mobileMenuActive } = useMobileMenuContext();
  const mobileMenuClasses = mobileMenuActive ? 'right-0' : '-right-[75%] md:-right-75';

  return (
    <Container width="full" customPadding="px-4 md:px-20">
      <div className="header-minimal-main-wrap flex h-22 items-center justify-between lg:block lg:h-auto">
        <MobileLogo />
        <MobileMenuIcon />
        <div
          className={`header-minimal-main-inner-wrap fixed top-0 overflow-y-scroll lg:overflow-y-visible ${mobileMenuClasses} z-3 h-full w-[75%] bg-white transition-[right] duration-300 ease-in-out md:w-75 lg:static lg:flex lg:h-auto lg:w-full lg:items-center lg:justify-between lg:gap-x-6 xl:grid xl:grid-cols-[1fr_auto_1fr]`}
        >
          <DesktopLogo headerLayout="minimal" />
          <Nav />
          <Icons location="main" handleHeaderSearchActive={handleHeaderSearchActive} />
        </div>
      </div>
    </Container>
  );
}
