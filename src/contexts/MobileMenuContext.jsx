import { createContext, useContext, useState } from 'react';

const MobileMenuContext = createContext();

export const MobileMenuProvider = ({ children }) => {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const handleMobileMenuClick = () => {
    setMobileMenuActive((prev) => !prev);
  };

  return <MobileMenuContext.Provider value={{ mobileMenuActive, handleMobileMenuClick }}>{children}</MobileMenuContext.Provider>;
};

export const useMobileMenuContext = () => useContext(MobileMenuContext);
