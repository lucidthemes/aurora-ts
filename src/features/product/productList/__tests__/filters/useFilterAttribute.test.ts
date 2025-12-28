import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@server/products/getAttributes', () => ({
  getAttributesByType: vi.fn(),
}));

import { getAttributesByType } from '@server/products/getAttributes';
import type { Attribute } from '@typings/products/attribute';

import useFilterAttribute from '../../hooks/filters/useFilterAttribute';

describe('useFilterAttribute hook', () => {
  const mockFilterColours: Attribute[] = [
    {
      id: 1,
      name: 'Black',
      slug: 'black',
      type: 'colour',
    },
    {
      id: 2,
      name: 'Green',
      slug: 'green',
      type: 'colour',
    },
    {
      id: 3,
      name: 'Red',
      slug: 'red',
      type: 'colour',
    },
  ];

  const mockFilterSizes: Attribute[] = [
    {
      id: 4,
      name: 'Small',
      slug: 'small',
      type: 'size',
    },
    {
      id: 5,
      name: 'Medium',
      slug: 'medium',
      type: 'size',
    },
    {
      id: 6,
      name: 'Large',
      slug: 'large',
      type: 'size',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches colour attributes data and sets filterAttributes state', async () => {
    vi.mocked(getAttributesByType).mockResolvedValue(mockFilterColours);

    const { result } = renderHook(() => useFilterAttribute('colour'));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockFilterColours);
      expect(result.current).toHaveLength(3);
    });

    expect(getAttributesByType).toHaveBeenCalledWith('colour');
  });

  test('fetches size attributes data and sets filterAttributes state', async () => {
    vi.mocked(getAttributesByType).mockResolvedValue(mockFilterSizes);

    const { result } = renderHook(() => useFilterAttribute('size'));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockFilterSizes);
      expect(result.current).toHaveLength(3);
    });

    expect(getAttributesByType).toHaveBeenCalledWith('size');
  });
});
