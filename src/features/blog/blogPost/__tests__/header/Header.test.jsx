import { render, screen } from '@testing-library/react';
import Header from '../../header/Header';
import { MemoryRouter } from 'react-router-dom';

describe('Header component', () => {
  const mockPost = {
    id: 1,
    title: 'Dune walk',
    date: '2025-09-11',
    authorId: 1,
    categories: [1, 2],
    image: '/images/posts/post-1.jpg',
  };

  const mockAuthor = {
    id: 1,
    name: 'Lucid Themes',
    slug: 'lucid-themes',
    avatar: '/images/author.jpg',
    description:
      'Sed rhoncus, velit sit amet mollis cursus, velit urna congue orci, in dignissim elit magna eget ante. Mauris sem justo, volutpat in quam quis, vulputate luctus neque. Sed ultricies eget augue quis hendrerit. Nullam quis nisi sit amet velit pharetra lobortis ac eget magna. Proin luctus sit amet odio sit amet imperdiet. Integer sodales arcu congue nisl rhoncus feugiat eget vel ex.',
  };

  const mockCategoryMap = {
    1: {
      id: 1,
      name: 'Fashion',
      slug: 'fashion',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    2: {
      id: 2,
      name: 'Travel',
      slug: 'travel',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
  };

  test('renders title', () => {
    render(
      <MemoryRouter>
        <Header singlePost={mockPost} author={mockAuthor} categoryMap={mockCategoryMap} />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /dune walk/i })).toBeInTheDocument();
  });

  test('renders categories', () => {
    render(
      <MemoryRouter>
        <Header singlePost={mockPost} author={mockAuthor} categoryMap={mockCategoryMap} />
      </MemoryRouter>
    );

    const categories = screen.getAllByRole('listitem');
    expect(categories).toHaveLength(2);

    expect(screen.getByRole('link', { name: /fashion/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /fashion/i })).toHaveAttribute('href', '/category/fashion');

    expect(screen.getByRole('link', { name: /travel/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /travel/i })).toHaveAttribute('href', '/category/travel');
  });

  test('renders author', () => {
    render(
      <MemoryRouter>
        <Header singlePost={mockPost} author={mockAuthor} categoryMap={mockCategoryMap} />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /lucid themes/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /lucid themes/i })).toHaveAttribute('href', '/author/lucid-themes');
  });

  test('renders date', () => {
    render(
      <MemoryRouter>
        <Header singlePost={mockPost} author={mockAuthor} categoryMap={mockCategoryMap} />
      </MemoryRouter>
    );

    expect(screen.getByText(/11 september 2025/i)).toBeInTheDocument();
  });

  test('renders image', () => {
    render(
      <MemoryRouter>
        <Header singlePost={mockPost} author={mockAuthor} categoryMap={mockCategoryMap} />
      </MemoryRouter>
    );

    expect(screen.getByRole('img', { name: /dune walk/i })).toBeInTheDocument();
  });
});
