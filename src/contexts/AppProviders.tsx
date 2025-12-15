import type { ReactNode } from 'react';

import { CartProvider } from '@features/cart/CartContext';

import { HeaderLayoutProvider } from './HeaderLayoutContext';
import { MobileMenuProvider } from './MobileMenuContext';
import { AuthProvider } from './AuthContext';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <HeaderLayoutProvider>
      <MobileMenuProvider>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </MobileMenuProvider>
    </HeaderLayoutProvider>
  );
}
