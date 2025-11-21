import { render, screen } from '@testing-library/react';
import Author from '../../author';
import { MemoryRouter } from 'react-router-dom';

describe('Author component', () => {
  const mockAuthor = {
    id: 1,
    name: 'Lucid Themes',
    slug: 'lucid-themes',
    avatar: '/images/author.jpg',
    description:
      'Sed rhoncus, velit sit amet mollis cursus, velit urna congue orci, in dignissim elit magna eget ante. Mauris sem justo, volutpat in quam quis, vulputate luctus neque. Sed ultricies eget augue quis hendrerit. Nullam quis nisi sit amet velit pharetra lobortis ac eget magna. Proin luctus sit amet odio sit amet imperdiet. Integer sodales arcu congue nisl rhoncus feugiat eget vel ex.',
  };

  test('renders image', () => {
    render(
      <MemoryRouter>
        <Author author={mockAuthor} />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: /lucid Themes/i })).toBeInTheDocument();
  });

  test('renders name', () => {
    render(
      <MemoryRouter>
        <Author author={mockAuthor} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /lucid themes/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /lucid Themes/i })).toHaveAttribute('href', '/author/lucid-themes');
  });

  test('renders bio', () => {
    render(
      <MemoryRouter>
        <Author author={mockAuthor} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Sed rhoncus/i)).toBeInTheDocument();
  });
});
