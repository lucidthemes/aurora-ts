import { renderHook, waitFor } from '@testing-library/react';
import useList from '../../../tabs/hooks/reviews/useList';

vi.mock('@server/products/getReviews', () => ({
  getReviewsById: vi.fn(),
}));

import { getReviewsById } from '@server/products/getReviews';

describe('useList hook', () => {
  const mockProduct = {
    id: 1,
    title: 'Cozy sweater',
    reviewCount: 2,
    averageReview: 5,
  };

  const mockReviews = [
    {
      id: 1,
      productId: 1,
      rating: 5,
      date: '2025-09-18',
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris.',
      name: 'Lucid Themes',
      status: 'approved',
    },
    {
      id: 2,
      productId: 1,
      rating: 5,
      date: '2025-09-17',
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
      name: 'Lucid Themes',
      status: 'approved',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches reviews data and sets reviews state', async () => {
    getReviewsById.mockResolvedValue(mockReviews);

    const { result } = renderHook(() => useList(mockProduct));

    expect(result.current.reviews).toEqual([]);

    await waitFor(() => {
      expect(result.current.reviews).toEqual(mockReviews);
      expect(result.current.reviews).toHaveLength(2);
    });

    expect(getReviewsById).toHaveBeenCalledWith(mockProduct.id);
  });

  test('sets reviews state to null if singleProduct is missing', () => {
    const { result } = renderHook(() => useList());

    expect(result.current.reviews).toEqual([]);

    expect(getReviewsById).not.toHaveBeenCalled();
  });

  test('sets reviews state to null if product has no reviews', () => {
    const productWithoutReviews = { id: 1 };

    const { result } = renderHook(() => useList(productWithoutReviews));

    expect(result.current.reviews).toEqual([]);

    expect(getReviewsById).not.toHaveBeenCalled();
  });
});
