import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@server/posts/getPost', () => ({
  getPostById: vi.fn(),
}));

import { getPostById } from '@server/posts/getPost';
import type { Post } from '@typings/posts/post';

import useNavigation from '../../navigation/useNavigation';

describe('useNavigation hook', () => {
  const mockPrevious: Partial<Post> = {
    id: 3,
    title: 'Beach Adventure',
    slug: 'beach-adventure',
  };

  const mockNext: Partial<Post> = {
    id: 1,
    title: 'Dune walk',
    slug: 'dune-walk',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches previous post data and sets previousPost state', async () => {
    vi.mocked(getPostById).mockResolvedValue(mockPrevious);

    const { result } = renderHook(() => useNavigation(2));

    expect(result.current.previousPost).toBeNull();

    await waitFor(() => {
      expect(result.current.previousPost).toEqual(mockPrevious);
    });

    expect(getPostById).toHaveBeenCalledWith(3);
  });

  test('fetches next post data and sets nextPost state', async () => {
    vi.mocked(getPostById).mockResolvedValue(mockNext);

    const { result } = renderHook(() => useNavigation(2));

    expect(result.current.nextPost).toBeNull();

    await waitFor(() => {
      expect(result.current.nextPost).toEqual(mockNext);
    });

    expect(getPostById).toHaveBeenCalledWith(1);
  });
});
