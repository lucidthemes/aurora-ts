import { Outlet } from 'react-router-dom';

import Container from '@components/Layout/Container';

import Account from '../features/account';

export function AccountPage() {
  return (
    <Container>
      <Account>
        <Outlet />
      </Account>
    </Container>
  );
}
