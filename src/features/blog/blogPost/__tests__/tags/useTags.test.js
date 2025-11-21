import { renderHook, waitFor } from '@testing-library/react';
import useTags from '../../tags/useTags';

vi.mock('@server/posts/getTags', () => ({
  getTagsArray: vi.fn(),
}));

import { getTagsArray } from '@server/posts/getTags';

describe('useTags hook', () => {
  const mockPost = {
    id: 1,
    tags: [1, 2, 3, 4],
  };

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
    {
      id: 4,
      name: 'Walk',
      slug: 'walk',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches tags data and sets tags state', async () => {
    getTagsArray.mockResolvedValue(mockTags);

    const { result } = renderHook(() => useTags(mockPost));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockTags);
    });

    expect(getTagsArray).toHaveBeenCalledWith(mockPost.tags);
  });

  test('sets tags state to null if singlePost is missing', () => {
    const { result } = renderHook(() => useTags());

    expect(result.current).toEqual([]);

    expect(getTagsArray).not.toHaveBeenCalled();
  });

  test('sets tags state to null if post has no tags', () => {
    const postWithoutTags = { id: 1 };

    const { result } = renderHook(() => useTags(postWithoutTags));

    expect(result.current).toEqual([]);

    expect(getTagsArray).not.toHaveBeenCalled();
  });
});
