import { renderHook, waitFor } from '@testing-library/react';
import useNavigation from '../../navigation/useNavigation';

vi.mock('@server/posts/getPost', () => ({
  getPostById: vi.fn(),
}));

import { getPostById } from '@server/posts/getPost';

describe('useNavigation hook', () => {
  const mockPost = {
    id: 2,
    title: 'Old Town Centre',
    slug: 'old-town-centre',
  };

  const mockPrevious = {
    id: 3,
    title: 'Beach Adventure',
    slug: 'beach-adventure',
  };

  const mockNext = {
    id: 1,
    title: 'Dune walk',
    slug: 'dune-walk',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches previous post data and sets previousPost state', async () => {
    getPostById.mockResolvedValue(mockPrevious);

    const { result } = renderHook(() => useNavigation(mockPost.id));

    expect(result.current.previousPost).toBeNull();

    await waitFor(() => {
      expect(result.current.previousPost).toEqual(mockPrevious);
    });

    expect(getPostById).toHaveBeenCalledWith(mockPost.id + 1);
  });

  test('fetches next post data and sets nextPost state', async () => {
    getPostById.mockResolvedValue(mockNext);

    const { result } = renderHook(() => useNavigation(mockPost.id));

    expect(result.current.nextPost).toBeNull();

    await waitFor(() => {
      expect(result.current.nextPost).toEqual(mockNext);
    });

    expect(getPostById).toHaveBeenCalledWith(mockPost.id - 1);
  });

  test('sets previousPost and nextPost state to null if no postId passed through', () => {
    const { result } = renderHook(() => useNavigation());

    expect(result.current.previousPost).toBeNull();
    expect(result.current.nextPost).toBeNull();

    expect(getPostById).not.toHaveBeenCalled();
  });
});
