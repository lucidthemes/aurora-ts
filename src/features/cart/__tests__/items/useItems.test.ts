import { renderHook, waitFor } from '@testing-library/react';

vi.mock('@server/products/getAttribute', () => ({
  getAttributeMap: vi.fn(),
}));

import { getAttributeMap } from '@server/products/getAttribute';
import type { Item } from '@typings/cart/item';
import type { Attribute } from '@typings/products/attribute';

import useItems from '../../hooks/items/useItems';

describe('useItems hook', () => {
  const mockItems: Item[] = [
    {
      productId: 1,
      title: 'Cozy sweater',
      slug: 'cozy-sweater',
      image: '/images/products/product-1.jpg',
      price: 20,
      variation: {
        id: 1001,
        colourId: 1,
        sizeId: 4,
        price: 20,
        stock: 5,
        SKU: 'CS-BLACK-S',
      },
      quantity: 1,
    },
    {
      productId: 2,
      title: 'Autumn beanie',
      slug: 'autumn-beanie',
      image: '/images/products/product-5.jpg',
      price: 20,
      variation: {
        id: 2002,
        colourId: 2,
        price: 20,
        stock: 5,
        SKU: 'AB-GREEN',
      },
      quantity: 1,
    },
    {
      productId: 4,
      title: 'Handmade bonnet',
      slug: 'handmade-bonnet',
      image: '/images/products/product-10.jpg',
      stock: 5,
      price: 20,
      quantity: 1,
    },
  ];

  const mockAttributeMap: Record<number, Attribute> = {
    1: {
      id: 1,
      name: 'Black',
      slug: 'black',
      type: 'colour',
    },
    2: {
      id: 2,
      name: 'Green',
      slug: 'green',
      type: 'colour',
    },
    4: {
      id: 4,
      name: 'Small',
      slug: 'small',
      type: 'size',
    },
  };

  const mockAttributeIds = mockItems.flatMap((item) => [item.variation?.colourId, item.variation?.sizeId]).filter(Boolean) as number[];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('fetches attributes data and sets attributeMap state', async () => {
    vi.mocked(getAttributeMap).mockResolvedValue(mockAttributeMap);

    const { result } = renderHook(() => useItems(mockItems));

    expect(result.current).toEqual([]);

    await waitFor(() => {
      expect(result.current).toEqual(mockAttributeMap);
    });

    expect(getAttributeMap).toHaveBeenCalledWith(mockAttributeIds);
  });
});
