import { createContext, useContext, useState } from 'react';
import type { ReactNode, Dispatch, SetStateAction } from 'react';

interface HeaderLayoutContextType {
  headerTopShown: boolean;
  setHeaderTopShown: Dispatch<SetStateAction<boolean>>;
  headerMainLayout: string;
  setHeaderMainLayout: Dispatch<SetStateAction<string>>;
}

const HeaderLayoutContext = createContext<HeaderLayoutContextType>({
  headerTopShown: true,
  setHeaderTopShown: () => {},
  headerMainLayout: 'blog',
  setHeaderMainLayout: () => {},
});

export const HeaderLayoutProvider = ({ children }: { children: ReactNode }) => {
  const [headerTopShown, setHeaderTopShown] = useState(true);
  const [headerMainLayout, setHeaderMainLayout] = useState('blog');

  return (
    <HeaderLayoutContext.Provider value={{ headerTopShown, setHeaderTopShown, headerMainLayout, setHeaderMainLayout }}>{children}</HeaderLayoutContext.Provider>
  );
};

export const useHeaderLayoutContext = (): HeaderLayoutContextType => {
  return useContext(HeaderLayoutContext);
};
