import { render, screen } from '@testing-library/react';
import InstagramFeed from '../InstagramFeed';

vi.mock('@server/instagram/getFeed', () => ({
  getFeed: vi.fn(),
}));

import { getFeed } from '@server/instagram/getFeed';
import { MemoryRouter } from 'react-router-dom';

describe('InstagramFeed component', () => {
  const mockLimit = 6;

  const mockInstagramFeed = [
    {
      id: 1,
      image: '/images/instagram/instagram-1.jpg',
    },
    {
      id: 2,
      image: '/images/instagram/instagram-2.jpg',
    },
    {
      id: 3,
      image: '/images/instagram/instagram-3.jpg',
    },
    {
      id: 4,
      image: '/images/instagram/instagram-4.jpg',
    },
    {
      id: 5,
      image: '/images/instagram/instagram-5.jpg',
    },
    {
      id: 6,
      image: '/images/instagram/instagram-6.jpg',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders Instagram feed when feed data is fetched', async () => {
    getFeed.mockResolvedValue(mockInstagramFeed);

    render(
      <MemoryRouter>
        <InstagramFeed limit={mockLimit} link="/" />
      </MemoryRouter>
    );

    const images = await screen.findAllByRole('listitem');
    expect(images).toHaveLength(6);

    const follow = await screen.findByRole('link', { name: /follow on Instagram/i });
    expect(follow).toBeInTheDocument();
  });

  test('renders error message if no Instagram feed images found', async () => {
    getFeed.mockResolvedValue([]);

    render(
      <MemoryRouter>
        <InstagramFeed limit={mockLimit} link="/" />
      </MemoryRouter>
    );

    const message = await screen.findByText(/no images found/i);
    expect(message).toBeInTheDocument();
  });
});
