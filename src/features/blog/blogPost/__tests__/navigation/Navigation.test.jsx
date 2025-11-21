import { render, screen } from '@testing-library/react';
import Previous from '../../navigation/components/Previous';
import Next from '../../navigation/components/Next';
import { MemoryRouter } from 'react-router-dom';

describe('Navigation component', () => {
  const mockPrevious = {
    id: 2,
    title: 'Old Town Centre',
    slug: 'old-town-centre',
  };

  const mockNext = {
    id: 1,
    title: 'Dune walk',
    slug: 'dune-walk',
  };

  test('renders Previous post component', () => {
    render(
      <MemoryRouter>
        <Previous previousPost={mockPrevious} />
      </MemoryRouter>
    );

    expect(screen.getByText(/previous post/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Old Town Centre/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Old Town Centre/i })).toHaveAttribute('href', '/blog/old-town-centre');
  });

  test('renders Next post component', () => {
    render(
      <MemoryRouter>
        <Next nextPost={mockNext} />
      </MemoryRouter>
    );

    expect(screen.getByText(/next post/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Dune walk/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Dune walk/i })).toHaveAttribute('href', '/blog/dune-walk');
  });
});
