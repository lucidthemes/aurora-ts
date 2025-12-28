import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@server/products/getCategories', () => ({
  getCategories: vi.fn(),
}));

import { getCategories } from '@server/products/getCategories';
import type { Category } from '@typings/products/category';

import useFilterCategory from '../../hooks/filters/useFilterCategory';

describe('useFilterCategory hook', () => {
  const mockFilterCategories: Category[] = [
    {
      id: 1,
      name: 'Bags',
      slug: 'bags',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 2,
      name: 'Gloves',
      slug: 'gloves',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 3,
      name: 'Hats',
      slug: 'hats',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 4,
      name: 'Jeans',
      slug: 'jeans',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 5,
      name: 'Scarves',
      slug: 'scarves',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 6,
      name: 'Sweaters',
      slug: 'sweaters',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches categories data and sets filterCategories state', async () => {
    vi.mocked(getCategories).mockResolvedValue(mockFilterCategories);

    const { result } = renderHook(() => useFilterCategory());

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockFilterCategories);
      expect(result.current).toHaveLength(6);
    });

    expect(getCategories).toHaveBeenCalled();
  });
});
