import { render, screen } from '@testing-library/react';
import Newsletter from '../../newsletter';

describe('Newsletter component', () => {
  test('renders heading', () => {
    render(<Newsletter />);

    expect(screen.getByRole('heading', { name: /join my newsletter/i })).toBeInTheDocument();
  });

  test('renders subscribe form', () => {
    render(<Newsletter />);

    expect(screen.getByRole('form', { name: /newsletter subscribe/i })).toBeInTheDocument();
  });
});
