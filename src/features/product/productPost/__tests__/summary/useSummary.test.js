import { renderHook, waitFor } from '@testing-library/react';
import useSummary from '../../summary/hooks/useSummary';

vi.mock('@server/products/getCategory', () => ({
  getCategoryById: vi.fn(),
}));

vi.mock('@server/products/getTags', () => ({
  getTagsArray: vi.fn(),
}));

import { getCategoryById } from '@server/products/getCategory';
import { getTagsArray } from '@server/products/getTags';

describe('useSummary hook', () => {
  const mockProduct = {
    id: 1,
    title: 'Cozy sweater',
    slug: 'cozy-sweater',
    date: '2025-09-10',
    category: 6,
    tags: [4, 5, 14],
    price: 20.0,
    inStock: true,
    SKU: 'CS',
    stock: 5,
  };

  const initialSummaryDataState = {
    price: 20.0,
    maxQuantity: 5,
    SKU: 'CS',
    category: {},
    tags: [],
  };

  const mockCategory = {
    id: 6,
    name: 'Sweaters',
    slug: 'sweaters',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
  };

  const mockTags = [
    {
      id: 4,
      name: 'Clothing',
      slug: 'clothing',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 5,
      name: 'Cozy',
      slug: 'cozy',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 14,
      name: 'Winter',
      slug: 'winter',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('sets initial summaryData state using singleProduct data', () => {
    const { result } = renderHook(() => useSummary(mockProduct));

    expect(result.current.summaryData).toEqual(initialSummaryDataState);
  });

  test('fetches category and tags data', async () => {
    getCategoryById.mockResolvedValue(mockCategory);
    getTagsArray.mockResolvedValue(mockTags);

    const { result } = renderHook(() => useSummary(mockProduct));

    expect(result.current.summaryData.category).toEqual({});
    expect(result.current.summaryData.tags).toEqual([]);

    await waitFor(() => {
      expect(result.current.summaryData.category).toEqual(mockCategory);
      expect(result.current.summaryData.tags).toEqual(mockTags);
    });

    expect(getCategoryById).toHaveBeenCalledWith(mockProduct.category);
    expect(getTagsArray).toHaveBeenCalledWith(mockProduct.tags);
  });

  test('fetch not called if product has no category', () => {
    const productWithoutCategory = { id: 1 };

    const { result } = renderHook(() => useSummary(productWithoutCategory));

    expect(result.current.summaryData.category).toEqual({});

    expect(getCategoryById).not.toHaveBeenCalled();
  });

  test('fetch not called if product has no tags', () => {
    const productWithoutTags = { id: 1 };

    const { result } = renderHook(() => useSummary(productWithoutTags));

    expect(result.current.summaryData.tags).toEqual([]);

    expect(getTagsArray).not.toHaveBeenCalled();
  });
});
