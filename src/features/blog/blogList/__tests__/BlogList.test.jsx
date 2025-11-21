import { render, screen, within, fireEvent } from '@testing-library/react';
import BlogList from '../BlogList';

vi.mock('@server/posts/getPosts', () => ({
  getPosts: vi.fn(),
}));

vi.mock('@server/posts/getCategory', () => ({
  getCategoryMap: vi.fn(),
}));

vi.mock('@server/posts/getAuthor', () => ({
  getAuthorMap: vi.fn(),
}));

import { getPosts } from '@server/posts/getPosts';
import { getCategoryMap } from '@server/posts/getCategory';
import { getAuthorMap } from '@server/posts/getAuthor';
import { MemoryRouter } from 'react-router-dom';

Element.prototype.scrollIntoView = vi.fn();

describe('BlogList component', () => {
  const mockPosts = [
    {
      id: 1,
      title: 'Dune walk',
      slug: 'dune-walk',
      date: '2025-09-11',
      authorId: 1,
      categories: [1, 2],
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
      image: '/images/posts/post-1.jpg',
    },
    {
      id: 2,
      title: 'Old Town Centre',
      slug: 'old-town-centre',
      date: '2025-09-10',
      authorId: 1,
      categories: [3],
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
      image: '/images/posts/post-2.jpg',
    },
    {
      id: 3,
      title: 'Beach Adventure',
      slug: 'beach-adventure',
      date: '2025-09-09',
      authorId: 1,
      categories: [2],
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
      image: '/images/posts/post-3.jpg',
    },
    {
      id: 4,
      title: 'Sweet Coffee',
      slug: 'sweet-coffee',
      date: '2025-09-08',
      authorId: 1,
      categories: [4],
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
      image: '/images/posts/post-4.jpg',
    },
    {
      id: 5,
      title: 'Boho fashion',
      slug: 'boho-fashion',
      date: '2025-09-07',
      authorId: 1,
      categories: [1, 3],
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
      image: '/images/posts/post-5.jpg',
    },
    {
      id: 6,
      title: 'Beautiful Bouquet',
      slug: 'beautiful-bouquet',
      date: '2025-09-06',
      authorId: 1,
      categories: [3],
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
      image: '/images/posts/post-6.jpg',
    },
    {
      id: 7,
      title: 'Fields of Daisies',
      slug: 'fields-of-daisies',
      date: '2025-09-05',
      authorId: 1,
      categories: [2],
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id',
      image: '/images/posts/post-7.jpg',
    },
  ];

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
    3: {
      id: 3,
      name: 'Photography',
      slug: 'photography',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    4: {
      id: 4,
      name: 'Lifestyle',
      slug: 'lifestyle',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
  };

  const mockAuthorMap = {
    1: {
      id: 1,
      name: 'Lucid Themes',
      slug: 'lucid-themes',
      avatar: '/images/author.jpg',
      description:
        'Sed rhoncus, velit sit amet mollis cursus, velit urna congue orci, in dignissim elit magna eget ante. Mauris sem justo, volutpat in quam quis, vulputate luctus neque. Sed ultricies eget augue quis hendrerit. Nullam quis nisi sit amet velit pharetra lobortis ac eget magna. Proin luctus sit amet odio sit amet imperdiet. Integer sodales arcu congue nisl rhoncus feugiat eget vel ex.',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders list when post data is fetched', async () => {
    getPosts.mockResolvedValue(mockPosts);
    getCategoryMap.mockResolvedValue(mockCategoryMap);
    getAuthorMap.mockResolvedValue(mockAuthorMap);

    render(
      <MemoryRouter>
        <BlogList />
      </MemoryRouter>
    );

    const blogList = await screen.findByRole('list', { name: /blog posts/i });
    expect(blogList).toBeInTheDocument();

    const listItems = blogList.querySelectorAll(':scope > li');
    expect(listItems).toHaveLength(6);
  });

  test('renders post information', async () => {
    getPosts.mockResolvedValue(mockPosts);
    getCategoryMap.mockResolvedValue(mockCategoryMap);
    getAuthorMap.mockResolvedValue(mockAuthorMap);

    render(
      <MemoryRouter>
        <BlogList />
      </MemoryRouter>
    );

    const blogList = await screen.findByRole('list', { name: /blog posts/i });
    expect(blogList).toBeInTheDocument();

    const firstListItem = blogList.querySelector(':scope > li:first-child');
    expect(firstListItem).toBeInTheDocument();

    expect(within(firstListItem).getByRole('img', { name: /dune walk/i })).toBeInTheDocument();

    const categories = await within(firstListItem).findAllByRole('listitem');
    expect(categories).toHaveLength(2);
    expect(within(firstListItem).getByRole('link', { name: /fashion/i })).toBeInTheDocument();
    expect(within(firstListItem).getByRole('link', { name: /fashion/i })).toHaveAttribute('href', '/category/fashion');

    expect(within(firstListItem).getByRole('heading', { name: /dune walk/i })).toBeInTheDocument();

    expect(within(firstListItem).getByRole('link', { name: /lucid themes/i })).toBeInTheDocument();
    expect(within(firstListItem).getByRole('link', { name: /lucid themes/i })).toHaveAttribute('href', '/author/lucid-themes');

    expect(within(firstListItem).getByText(/11 september 2025/i)).toBeInTheDocument();

    expect(within(firstListItem).getByText(/lorem ipsum dolor sit amet/i)).toBeInTheDocument();

    expect(within(firstListItem).getByRole('link', { name: /read more/i })).toBeInTheDocument();
    expect(within(firstListItem).getByRole('link', { name: /read more/i })).toHaveAttribute('href', '/blog/dune-walk');
  });

  test('renders pagination when post data is fetched', async () => {
    getPosts.mockResolvedValue(mockPosts);
    getCategoryMap.mockResolvedValue(mockCategoryMap);
    getAuthorMap.mockResolvedValue(mockAuthorMap);

    render(
      <MemoryRouter>
        <BlogList />
      </MemoryRouter>
    );

    const pagination = await screen.findByLabelText(/post pagination/i);
    expect(pagination).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument();
  });

  test('updates list when pagination link is clicked', async () => {
    getPosts.mockResolvedValue(mockPosts);
    getCategoryMap.mockResolvedValue(mockCategoryMap);
    getAuthorMap.mockResolvedValue(mockAuthorMap);

    render(
      <MemoryRouter>
        <BlogList />
      </MemoryRouter>
    );

    const blogList = await screen.findByRole('list', { name: /blog posts/i });
    expect(blogList).toBeInTheDocument();

    const originalListItems = blogList.querySelectorAll(':scope > li');
    expect(originalListItems).toHaveLength(6);

    const pagination = await screen.findByLabelText(/post pagination/i);
    expect(pagination).toBeInTheDocument();

    fireEvent.click(within(pagination).getByRole('button', { name: /next page/i }));

    const updatedListItems = blogList.querySelectorAll(':scope > li');
    expect(updatedListItems).toHaveLength(1);

    expect(within(pagination).getByRole('button', { name: /previous page/i })).toBeInTheDocument();
  });

  test('hides pagination when showPagination is set to false', async () => {
    getPosts.mockResolvedValue(mockPosts);
    getCategoryMap.mockResolvedValue(mockCategoryMap);
    getAuthorMap.mockResolvedValue(mockAuthorMap);

    render(
      <MemoryRouter>
        <BlogList showPagination={false} />
      </MemoryRouter>
    );

    await screen.findByRole('list', { name: /blog posts/i });

    const pagination = screen.queryByLabelText(/post pagination/i);
    expect(pagination).not.toBeInTheDocument();
  });
});
