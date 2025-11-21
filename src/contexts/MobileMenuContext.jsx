import { createContext, useContext, useState } from 'react';

const MobileMenuContext = createContext();

export const MobileMenuProvider = ({ children }) => {
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  return <MobileMenuContext.Provider value={{ mobileMenuActive, setMobileMenuActive }}>{children}</MobileMenuContext.Provider>;
};

export const useMobileMenuContext = () => useContext(MobileMenuContext);
