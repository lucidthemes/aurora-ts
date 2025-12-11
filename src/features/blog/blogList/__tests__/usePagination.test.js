import { renderHook, act } from '@testing-library/react';
import usePagination from '../hooks/usePagination';

describe('usePagination hook', () => {
  const mockBlogPosts = [
    {
      id: 1,
      title: 'Dune walk',
    },
    {
      id: 2,
      title: 'Old Town Centre',
    },
    {
      id: 3,
      title: 'Beach Adventure',
    },
    {
      id: 4,
      title: 'Sweet Coffee',
    },
    {
      id: 5,
      title: 'Boho fashion',
    },
    {
      id: 6,
      title: 'Beautiful Bouquet',
    },
    {
      id: 7,
      title: 'Fields of Daisies',
    },
    {
      id: 8,
      title: 'Rustic decor',
    },
    {
      id: 9,
      title: 'Love of Books',
    },
    {
      id: 10,
      title: 'Boho globe',
    },
    {
      id: 11,
      title: 'Lazy Days',
    },
  ];

  const mockPostsPerPage = 6;

  const mockShowPagination = true;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('slices posts down to posts per page amount', () => {
    const { result } = renderHook(() => usePagination(mockBlogPosts, mockShowPagination, mockPostsPerPage));

    expect(result.current.paginatedPosts).toHaveLength(mockPostsPerPage);
  });

  test('calculates the total number of pages based on posts count and posts per page', () => {
    const { result } = renderHook(() => usePagination(mockBlogPosts, mockShowPagination, mockPostsPerPage));

    expect(result.current.totalPages).toEqual(2);
  });

  test('updates page number on handlePageChange', () => {
    const { result } = renderHook(() => usePagination(mockBlogPosts, mockShowPagination, mockPostsPerPage));

    act(() => {
      result.current.handlePageChange(2);
    });

    expect(result.current.currentPage).toBe(2);
  });
});
