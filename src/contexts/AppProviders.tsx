import { ReactNode } from 'react';
import { HeaderLayoutProvider } from './HeaderLayoutContext';
import { MobileMenuProvider } from './MobileMenuContext';
import { AuthProvider } from './AuthContext';
import { CartProvider } from '@features/cart/CartContext';

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
