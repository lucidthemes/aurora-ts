import Container from '@components/Layout/Container';
import Account from '../features/account';
import { Outlet } from 'react-router-dom';

export function AccountPage() {
  return (
    <Container>
      <Account>
        <Outlet />
      </Account>
    </Container>
  );
}
