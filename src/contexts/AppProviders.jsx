import { HeaderLayoutProvider } from './HeaderLayoutContext';
import { MobileMenuProvider } from './MobileMenuContext';
import { AuthProvider } from './AuthContext';
import { CartProvider } from '@features/cart/CartContext';

export function AppProviders({ children }) {
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
