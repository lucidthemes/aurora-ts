import { createContext, useContext, useState } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';

interface MobileMenuContextType {
  mobileMenuActive: boolean;
  setMobileMenuActive: Dispatch<SetStateAction<boolean>>;
  handleMobileMenuClick: () => void;
}

const MobileMenuContext = createContext<MobileMenuContextType>({
  mobileMenuActive: false,
  setMobileMenuActive: () => {},
  handleMobileMenuClick: () => {},
});

export const MobileMenuProvider = ({ children }: { children: ReactNode }) => {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const handleMobileMenuClick = () => {
    setMobileMenuActive((prev) => !prev);
  };

  return <MobileMenuContext.Provider value={{ mobileMenuActive, setMobileMenuActive, handleMobileMenuClick }}>{children}</MobileMenuContext.Provider>;
};

export const useMobileMenuContext = (): MobileMenuContextType => {
  return useContext(MobileMenuContext);
};
