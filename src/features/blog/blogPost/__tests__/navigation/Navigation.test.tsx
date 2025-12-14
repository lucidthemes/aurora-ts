import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import type { Post } from '@typings/posts/post';

import Previous from '../../navigation/components/Previous';
import Next from '../../navigation/components/Next';

describe('Navigation component', () => {
  const mockPrevious: Partial<Post> = {
    id: 2,
    title: 'Old Town Centre',
    slug: 'old-town-centre',
  };

  const mockNext: Partial<Post> = {
    id: 1,
    title: 'Dune walk',
    slug: 'dune-walk',
  };

  test('renders Previous post component', () => {
    render(
      <MemoryRouter>
        <Previous previousPost={mockPrevious as Post} />
      </MemoryRouter>
    );

    expect(screen.getByText(/previous post/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Old Town Centre/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Old Town Centre/i })).toHaveAttribute('href', '/blog/old-town-centre');
  });

  test('renders Next post component', () => {
    render(
      <MemoryRouter>
        <Next nextPost={mockNext as Post} />
      </MemoryRouter>
    );

    expect(screen.getByText(/next post/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Dune walk/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Dune walk/i })).toHaveAttribute('href', '/blog/dune-walk');
  });
});
