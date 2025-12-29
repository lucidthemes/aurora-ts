import { render, screen, fireEvent } from '@testing-library/react';

import type { Product } from '@typings/products/product';

import List from '../../tabs/components/List';

describe('List component', () => {
  const mockProduct: Partial<Product> = {
    id: 1,
    title: 'Cozy sweater',
  };

  const setActiveTabMock = vi.fn();

  test('renders tabs list', () => {
    render(<List activeTab="description" product={mockProduct as Product} setActiveTab={setActiveTabMock} />);

    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(/description/i);
    expect(screen.getByRole('tab', { selected: false })).toHaveTextContent(/reviews/i);
  });

  test('change active tab on click', () => {
    const setActiveTab = vi.fn();

    render(<List activeTab="description" setActiveTab={setActiveTab} product={mockProduct as Product} />);

    fireEvent.click(screen.getByRole('tab', { name: /reviews/i }));

    expect(setActiveTab).toHaveBeenCalledWith('reviews');
  });
});
