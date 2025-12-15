import type { ReactNode } from 'react';

import { useAuthContext } from '@contexts/AuthContext';

import Nav from './components/Nav';

interface AccountProps {
  children: ReactNode;
}

export default function Account({ children }: AccountProps) {
  const { handleLogout } = useAuthContext();

  return (
    <div className="flex flex-col gap-10 md:flex-row">
      <Nav handleLogout={handleLogout} />
      <div className="max-h-fit basis-3/4 gap-y-5 rounded-md bg-white p-5 md:p-7.5 lg:p-10">{children}</div>
    </div>
  );
}
