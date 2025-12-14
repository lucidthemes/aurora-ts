import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@server/posts/getTags', () => ({
  getTagsArray: vi.fn(),
}));

import { getTagsArray } from '@server/posts/getTags';
import type { Post } from '@typings/posts/post';
import type { Tag } from '@typings/posts/tag';

import useTags from '../../tags/useTags';

describe('useTags hook', () => {
  const mockPost: Partial<Post> = {
    id: 1,
    tags: [1, 2, 3, 4],
  };

  const mockTags: Tag[] = [
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
    vi.mocked(getTagsArray).mockResolvedValue(mockTags);

    const { result } = renderHook(() => useTags(mockPost as Post));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockTags);
    });

    expect(getTagsArray).toHaveBeenCalledWith(mockPost.tags);
  });

  test('sets tags state to null if post has no tags', () => {
    const postWithoutTags = { id: 1 };

    const { result } = renderHook(() => useTags(postWithoutTags as Post));

    expect(result.current).toEqual([]);

    expect(getTagsArray).not.toHaveBeenCalled();
  });
});
