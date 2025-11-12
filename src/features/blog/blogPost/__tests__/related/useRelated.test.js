import { renderHook, waitFor } from '@testing-library/react';
import useRelated from '../../related/useRelated';

vi.mock('@server/posts/getPost', () => ({
  getPostArray: vi.fn(),
}));

import { getPostArray } from '@server/posts/getPost';

describe('useRelated hook', () => {
  const mockPost = {
    id: 1,
    relatedPosts: [2, 4, 6],
  };

  const mockRelated = [
    { id: 2, title: 'Old Town Centre' },
    { id: 4, title: 'Sweet Coffee' },
    { id: 6, title: 'Beautiful Bouquet' },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches related posts data and sets relatedPosts state', async () => {
    getPostArray.mockResolvedValue(mockRelated);

    const { result } = renderHook(() => useRelated(mockPost));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockRelated);
      expect(result.current).toHaveLength(3);
    });

    expect(getPostArray).toHaveBeenCalledWith(mockPost.relatedPosts);
  });

  test('sets relatedPosts state to null if singlePost is missing', () => {
    const { result } = renderHook(() => useRelated());

    expect(result.current).toEqual([]);

    expect(getPostArray).not.toHaveBeenCalled();
  });

  test('sets relatedPosts state to null if post has no related posts', () => {
    const postWithoutRelated = { id: 1 };

    const { result } = renderHook(() => useRelated(postWithoutRelated));

    expect(result.current).toEqual([]);

    expect(getPostArray).not.toHaveBeenCalled();
  });
});
