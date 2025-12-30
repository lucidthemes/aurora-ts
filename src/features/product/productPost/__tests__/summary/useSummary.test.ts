import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@server/products/getCategory', () => ({
  getCategoryById: vi.fn(),
}));

vi.mock('@server/products/getTags', () => ({
  getTagsArray: vi.fn(),
}));

import { getCategoryById } from '@server/products/getCategory';
import { getTagsArray } from '@server/products/getTags';
import type { Product } from '@typings/products/product';
import type { SummaryData } from '@typings/products/summary';
import type { Category } from '@typings/products/category';
import type { Tag } from '@typings/products/tag';

import useSummary from '../../summary/hooks/useSummary';

describe('useSummary hook', () => {
  const mockProduct: Product = {
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

  const initialSummaryDataState: SummaryData = {
    price: 20.0,
    maxQuantity: 5,
    SKU: 'CS',
  };

  const mockCategory: Category = {
    id: 6,
    name: 'Sweaters',
    slug: 'sweaters',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
  };

  const mockTags: Tag[] = [
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
    vi.mocked(getCategoryById).mockResolvedValue(mockCategory);
    vi.mocked(getTagsArray).mockResolvedValue(mockTags);

    const { result } = renderHook(() => useSummary(mockProduct));

    await waitFor(() => {
      expect(result.current.summaryData.category).toEqual(mockCategory);
      expect(result.current.summaryData.tags).toEqual(mockTags);
    });

    expect(getCategoryById).toHaveBeenCalledWith(mockProduct.category);
    expect(getTagsArray).toHaveBeenCalledWith(mockProduct.tags);
  });

  test('fetch not called if product has no category', () => {
    const productWithoutCategory = { id: 1 };

    renderHook(() => useSummary(productWithoutCategory as Product));

    expect(getCategoryById).not.toHaveBeenCalled();
  });

  test('fetch not called if product has no tags', () => {
    const productWithoutTags = { id: 1 };

    renderHook(() => useSummary(productWithoutTags as Product));

    expect(getTagsArray).not.toHaveBeenCalled();
  });
});
