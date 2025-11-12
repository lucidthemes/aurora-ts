import { renderHook, waitFor } from '@testing-library/react';
import useSingleProduct from '../useSingleProduct';

vi.mock('@server/products/getProduct', () => ({
  getProductBySlug: vi.fn(),
}));

import { getProductBySlug } from '@server/products/getProduct';

describe('useSingleProduct hook', () => {
  const slug = 'cozy-sweater';

  const mockProduct = {
    id: 1,
    title: 'Cozy sweater',
    slug: 'cozy-sweater',
    image: '',
    price: 20,
    averageReview: 5,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches product data and sets singleProduct state', async () => {
    getProductBySlug.mockResolvedValue(mockProduct);

    const { result } = renderHook(() => useSingleProduct(slug));

    expect(result.current).toBeNull();

    await waitFor(() => {
      expect(result.current).toEqual(mockProduct);
    });

    expect(getProductBySlug).toHaveBeenCalledWith(slug);
  });

  test('sets singleProduct state to false if product not found', async () => {
    getProductBySlug.mockResolvedValue(null);

    const { result } = renderHook(() => useSingleProduct(slug));

    await waitFor(() => {
      expect(result.current).toBe(false);
    });
  });

  test('sets setSingleProduct state to null if slug is missing', () => {
    const { result } = renderHook(() => useSingleProduct(null));

    expect(result.current).toBeNull();

    expect(getProductBySlug).not.toHaveBeenCalled();
  });
});
