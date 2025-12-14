import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@server/posts/getPost', () => ({
  getPostArray: vi.fn(),
}));

import { getPostArray } from '@server/posts/getPost';
import type { Post } from '@typings/posts/post';

import useRelated from '../../related/useRelated';

describe('useRelated hook', () => {
  const mockPost: Partial<Post> = {
    id: 1,
    relatedPosts: [2, 4, 6],
  };

  const mockRelated: Partial<Post>[] = [
    { id: 2, title: 'Old Town Centre' },
    { id: 4, title: 'Sweet Coffee' },
    { id: 6, title: 'Beautiful Bouquet' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches related posts data and sets relatedPosts state', async () => {
    vi.mocked(getPostArray).mockResolvedValue(mockRelated);

    const { result } = renderHook(() => useRelated(mockPost as Post));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockRelated);
      expect(result.current).toHaveLength(3);
    });

    expect(getPostArray).toHaveBeenCalledWith(mockPost.relatedPosts);
  });

  test('sets relatedPosts state to null if post has no related posts', () => {
    const postWithoutRelated = { id: 1 };

    const { result } = renderHook(() => useRelated(postWithoutRelated as Post));

    expect(result.current).toEqual([]);

    expect(getPostArray).not.toHaveBeenCalled();
  });
});
