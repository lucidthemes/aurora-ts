import { render, screen, fireEvent } from '@testing-library/react';
import List from '../../tabs/components/List';

describe('List component', () => {
  const mockProduct = {
    id: 1,
    title: 'Cozy sweater',
  };

  test('renders tabs list', () => {
    render(<List activeTab="description" singleProduct={mockProduct} />);

    expect(screen.getByRole('tab', { selected: true })).toHaveTextContent(/description/i);
    expect(screen.getByRole('tab', { selected: false })).toHaveTextContent(/reviews/i);
  });

  test('change active tab on click', () => {
    const setActiveTab = vi.fn();

    render(<List activeTab="description" setActiveTab={setActiveTab} singleProduct={mockProduct} />);

    fireEvent.click(screen.getByRole('tab', { name: /reviews/i }));

    expect(setActiveTab).toHaveBeenCalledWith('reviews');
  });
});
