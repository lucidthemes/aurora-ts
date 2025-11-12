import { render, screen, within } from '@testing-library/react';
import PostsWidget from '../../Posts/Posts';

vi.mock('@server/posts/getPosts', () => ({
  getPosts: vi.fn(),
}));

import { getPosts } from '@server/posts/getPosts';
import { MemoryRouter } from 'react-router-dom';

describe('PostsWidget component', () => {
  const mockLimit = 3;

  const mockPosts = [
    {
      id: 1,
      title: 'Dune walk',
      slug: 'dune-walk',
      date: '2025-09-11',
      image: '/images/posts/post-1.jpg',
    },
    {
      id: 2,
      title: 'Old Town Centre',
      slug: 'old-town-centre',
      date: '2025-09-10',
      image: '/images/posts/post-2.jpg',
    },
    {
      id: 3,
      title: 'Beach Adventure',
      slug: 'beach-adventure',
      date: '2025-09-09',
      image: '/images/posts/post-3.jpg',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders posts widget when posts data is fetched', async () => {
    getPosts.mockResolvedValue(mockPosts);

    render(
      <MemoryRouter>
        <PostsWidget title="Latest posts" limit={mockLimit} />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { name: /latest posts/i });
    expect(heading).toBeInTheDocument();

    const posts = await screen.findAllByRole('listitem');
    expect(posts).toHaveLength(3);
  });

  test('renders post information', async () => {
    getPosts.mockResolvedValue(mockPosts);

    render(
      <MemoryRouter>
        <PostsWidget title="Latest posts" limit={mockLimit} />
      </MemoryRouter>
    );

    const postsList = await screen.findByRole('list', { name: /widget posts/i });
    expect(postsList).toBeInTheDocument();

    const firstListItem = postsList.querySelector(':scope > li:first-child');
    expect(firstListItem).toBeInTheDocument();

    expect(within(firstListItem).getByRole('img', { name: /dune walk/i })).toBeInTheDocument();

    expect(within(firstListItem).getByRole('heading', { name: /dune walk/i })).toBeInTheDocument();

    expect(within(firstListItem).getByText(/11 september 2025/i)).toBeInTheDocument();
  });

  test('renders error message if no posts found', async () => {
    getPosts.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <PostsWidget title="Latest posts" limit={mockLimit} />
      </MemoryRouter>
    );

    const message = await screen.findByText(/no posts found/i);
    expect(message).toBeInTheDocument();
  });
});
