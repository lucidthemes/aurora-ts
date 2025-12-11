import { renderHook, waitFor } from '@testing-library/react';
import useTags from '../../Tags/useTags';

vi.mock('@server/posts/getTags', () => ({
  getTags: vi.fn(),
}));

import { getTags } from '@server/posts/getTags';

describe('usePosts hook', () => {
  const mockLimit = 3;

  const mockTags = [
    {
      id: 1,
      name: 'Beach',
      slug: 'beach',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 2,
      name: 'Dunes',
      slug: 'dunes',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 3,
      name: 'Outdoors',
      slug: 'outdoors',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches posts data and sets posts state', async () => {
    vi.mocked(getTags).mockResolvedValue(mockTags);

    const { result } = renderHook(() => useTags(mockLimit));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockTags);
      expect(result.current).toHaveLength(3);
    });

    expect(getTags).toHaveBeenCalledWith(mockLimit);
  });
});
