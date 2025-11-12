import { renderHook, waitFor } from '@testing-library/react';
import useBreadcrumb from '../../breadcrumb/useBreadcrumbs';

vi.mock('@server/products/getCategory', () => ({
  getCategoryById: vi.fn(),
}));

import { getCategoryById } from '@server/products/getCategory';

describe('useBreadcrumb hook', () => {
  const mockProduct = {
    id: 1,
    title: 'Cozy sweater',
    category: 6,
  };

  const mockCategory = {
    id: 6,
    name: 'Sweaters',
    slug: 'sweaters',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches category data and sets breadcrumbCategory state', async () => {
    getCategoryById.mockResolvedValue(mockCategory);

    const { result } = renderHook(() => useBreadcrumb(mockProduct));

    expect(result.current).toBeNull();

    await waitFor(() => {
      expect(result.current).toEqual(mockCategory);
    });

    expect(getCategoryById).toHaveBeenCalledWith(mockProduct.category);
  });

  test('sets breadcrumbCategory state to null if singleProduct is missing', () => {
    const { result } = renderHook(() => useBreadcrumb());

    expect(result.current).toBeNull();

    expect(getCategoryById).not.toHaveBeenCalled();
  });

  test('sets breadcrumbCategory state to null if product has no category', () => {
    const productWithoutCategory = { id: 1 };

    const { result } = renderHook(() => useBreadcrumb(productWithoutCategory));

    expect(result.current).toBeNull();

    expect(getCategoryById).not.toHaveBeenCalled();
  });
});
