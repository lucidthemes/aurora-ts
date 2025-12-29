import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Notification from '../../notification';

describe('Notification component', () => {
  const mockAddCartNotification = 'Cozy sweater has been added to the cart';

  test('renders product added to cart notification', () => {
    render(
      <MemoryRouter>
        <Notification addCartNotification={mockAddCartNotification} />
      </MemoryRouter>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByText(/cozy sweater/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view cart/i })).toHaveAttribute('href', '/cart');
  });
});
