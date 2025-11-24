import { ReactNode, useEffect } from 'react';
import { useMobileMenuContext } from '@contexts/MobileMenuContext';
import { useLocation } from 'react-router-dom';
import Header from '@components/Header';
import Footer from '@components/Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { mobileMenuActive, setMobileMenuActive } = useMobileMenuContext();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (mobileMenuActive) setMobileMenuActive(false);
  }, [pathname]);

  const mobileMenuClasses = mobileMenuActive ? 'right-[75%] md:right-75 lg:right-0' : 'right-0';

  return (
    <>
      <Header mobileMenuClasses={mobileMenuClasses} />
      <main className={`relative flex flex-col gap-y-10 py-10 ${mobileMenuClasses} transition-[right] duration-300 ease-in-out`}>{children}</main>
      <Footer mobileMenuClasses={mobileMenuClasses} />
    </>
  );
}
