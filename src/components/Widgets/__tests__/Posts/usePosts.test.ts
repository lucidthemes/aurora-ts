import { renderHook, waitFor } from '@testing-library/react';
import usePosts from '../../Posts/usePosts';

vi.mock('@server/posts/getPosts', () => ({
  getPosts: vi.fn(),
}));

import { getPosts } from '@server/posts/getPosts';

describe('usePosts hook', () => {
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

  test('fetches posts data and sets posts state', async () => {
    vi.mocked(getPosts).mockResolvedValue(mockPosts);

    const { result } = renderHook(() => usePosts(mockLimit, undefined));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockPosts);
      expect(result.current).toHaveLength(3);
    });

    expect(getPosts).toHaveBeenCalledWith(mockLimit, undefined);
  });
});
