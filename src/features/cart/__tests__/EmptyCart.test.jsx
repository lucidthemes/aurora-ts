import { render, screen, fireEvent } from '@testing-library/react';
import EmptyCart from '../components/EmptyCart';

describe('EmptyCart component', () => {
  const emptyCartMock = vi.fn();

  test('renders button', () => {
    render(<EmptyCart emptyCart={emptyCartMock} />);

    expect(screen.getByRole('button', { name: /empty cart/i })).toBeInTheDocument();
  });

  test('empties cart when button clicked', () => {
    render(<EmptyCart emptyCart={emptyCartMock} />);

    fireEvent.click(screen.getByRole('button', { name: /empty cart/i }));

    expect(emptyCartMock).toHaveBeenCalled();
  });
});
