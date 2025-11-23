import { Dispatch, SetStateAction } from "react";
import { useMobileMenuContext } from '@contexts/MobileMenuContext';

interface MobileMenuContextType{
  mobileMenuActive: boolean
  setMobileMenuActive: Dispatch<SetStateAction<boolean>>;
}

export default function MobileMenuIcon() {
  const { mobileMenuActive, setMobileMenuActive } = useMobileMenuContext() as MobileMenuContextType;

  const handleMobileMenuClick = () => {
    setMobileMenuActive((prev) => !prev);
  };

  const hiddenIconClass = mobileMenuActive ? '!top-2 opacity-0' : '';
  const rotateLeftClass = mobileMenuActive ? '-rotate-45' : '';
  const rotateRightClass = mobileMenuActive ? 'rotate-45' : '';

  return (
    <div
      id="mobile-nav-button"
      className="relative -right-2.5 box-content h-5 w-6 cursor-pointer p-2.5 lg:hidden"
      onClick={handleMobileMenuClick}
      aria-label="Toggle menu"
      aria-expanded={mobileMenuActive}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && handleMobileMenuClick()}
    >
      <div id="mobile-nav-icon" className="relative">
        <span className={`absolute top-0 h-0.5 w-full bg-shark transition-all duration-150 ease-in-out ${hiddenIconClass}`}></span>
        <span className={`absolute top-2 h-0.5 w-full bg-shark transition-transform duration-300 ease-in-out ${rotateLeftClass}`}></span>
        <span className={`absolute top-2 h-0.5 w-full bg-shark transition-transform duration-300 ease-in-out ${rotateRightClass}`}></span>
        <span className={`absolute top-4 h-0.5 w-full bg-shark transition-all duration-150 ease-in-out ${hiddenIconClass}`}></span>
      </div>
    </div>
  );
}
