import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Nav from '../components/Nav';

describe('Nav component', () => {
  const handleLogoutMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <Nav handleLogout={handleLogoutMock} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /dashboard/i })).toHaveAttribute('href', '/account');

    expect(screen.getByRole('link', { name: /orders/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /orders/i })).toHaveAttribute('href', '/account/orders');

    expect(screen.getByRole('link', { name: /addresses/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /addresses/i })).toHaveAttribute('href', '/account/addresses');

    expect(screen.getByRole('link', { name: /details/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /details/i })).toHaveAttribute('href', '/account/details');

    expect(screen.getByRole('link', { name: /log out/i })).toBeInTheDocument();
  });

  test('logs user out after clicking log out link', () => {
    render(
      <MemoryRouter>
        <Nav handleLogout={handleLogoutMock} />
      </MemoryRouter>
    );

    const logoutLink = screen.getByRole('link', { name: /log out/i });
    expect(logoutLink).toBeInTheDocument();

    fireEvent.click(logoutLink);
    expect(handleLogoutMock).toHaveBeenCalled();
  });
});
