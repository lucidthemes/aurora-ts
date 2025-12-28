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

    expect(result.current).toEqual({ status: 'loading' });

    await waitFor(() => {
      expect(result.current).toEqual({ status: 'loaded', product: mockProduct });
    });

    expect(getProductBySlug).toHaveBeenCalledWith(slug);
  });

  test('sets singleProduct status to not-found if product not found', async () => {
    getProductBySlug.mockResolvedValue(null);

    const { result } = renderHook(() => useSingleProduct(slug));

    await waitFor(() => {
      expect(result.current).toEqual({ status: 'not-found' });
    });
  });

  test('sets setSingleProduct status to not-found if slug is missing', () => {
    const { result } = renderHook(() => useSingleProduct(null));

    expect(result.current).toEqual({ status: 'not-found' });

    expect(getProductBySlug).not.toHaveBeenCalled();
  });
});
