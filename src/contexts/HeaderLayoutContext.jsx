import { createContext, useContext, useState } from 'react';

const HeaderLayoutContext = createContext();

export const HeaderLayoutProvider = ({ children }) => {
  const [headerTopShown, setHeaderTopShown] = useState(true);
  const [headerMainLayout, setHeaderMainLayout] = useState('blog');

  return (
    <HeaderLayoutContext.Provider value={{ headerTopShown, setHeaderTopShown, headerMainLayout, setHeaderMainLayout }}>{children}</HeaderLayoutContext.Provider>
  );
};

export const useHeaderLayoutContext = () => useContext(HeaderLayoutContext);
