import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@server/instagram/getFeed', () => ({
  getFeed: vi.fn(),
}));

import { getFeed } from '@server/instagram/getFeed';
import type { Feed } from '@typings/instagram/feed';

import useInstagramFeed from '../useInstagramFeed';

describe('useInstagramFeed hook', () => {
  const mockLimit = 6;

  const mockInstagramFeed: Feed[] = [
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

  test('fetches Instagram feed data and sets instagramFeed state', async () => {
    vi.mocked(getFeed).mockResolvedValue(mockInstagramFeed);

    const { result } = renderHook(() => useInstagramFeed(mockLimit));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockInstagramFeed);
      expect(result.current).toHaveLength(6);
    });

    expect(getFeed).toHaveBeenCalledWith(mockLimit);
  });
});
