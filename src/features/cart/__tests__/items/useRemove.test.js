import { renderHook, act } from '@testing-library/react';
import useRemove from '../../hooks/items/useRemove';

describe('useRemove hook', () => {
  const mockItemWithVariation = {
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
  };

  const mockItemWithoutVariation = {
    productId: 4,
    title: 'Handmade bonnet',
    slug: 'handmade-bonnet',
    image: '/images/products/product-10.jpg',
    stock: 5,
    price: 20,
    quantity: 1,
  };

  const removeCartItemMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('remove item with variation from the cart', () => {
    const { result } = renderHook(() => useRemove(mockItemWithVariation.id, mockItemWithVariation.variation, removeCartItemMock));

    act(() => {
      result.current();
    });

    expect(removeCartItemMock).toHaveBeenCalledWith(mockItemWithVariation.id, mockItemWithVariation.variation.id);
  });

  test('remove item with no variation from the cart', () => {
    const { result } = renderHook(() => useRemove(mockItemWithoutVariation.id, mockItemWithoutVariation.variation, removeCartItemMock));

    act(() => {
      result.current();
    });

    expect(removeCartItemMock).toHaveBeenCalledWith(mockItemWithoutVariation.id, null);
  });
});
