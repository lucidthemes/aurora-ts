import { render, screen } from '@testing-library/react';
import StarRating from '../StarRating';

describe('StarRating component', () => {
  test('renders 1 star rating', () => {
    render(<StarRating rating={1} />);

    expect(screen.getByLabelText(/1 out of 5 stars/i)).toBeInTheDocument();
  });

  test('renders 2 star rating', () => {
    render(<StarRating rating={2} />);

    expect(screen.getByLabelText(/2 out of 5 stars/i)).toBeInTheDocument();
  });

  test('renders 3 star rating', () => {
    render(<StarRating rating={3} />);

    expect(screen.getByLabelText(/3 out of 5 stars/i)).toBeInTheDocument();
  });

  test('renders 4 star rating', () => {
    render(<StarRating rating={4} />);

    expect(screen.getByLabelText(/4 out of 5 stars/i)).toBeInTheDocument();
  });

  test('renders 5 star rating', () => {
    render(<StarRating rating={5} />);

    expect(screen.getByLabelText(/5 out of 5 stars/i)).toBeInTheDocument();
  });
});
