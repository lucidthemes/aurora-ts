import { renderHook, act } from '@testing-library/react';

import type { Item } from '@typings/cart/item';
import { createInputNumberChangeEvent, createMouseClickEvent } from '@utils/tests/events';

import useQuantity from '../../hooks/items/useQuantity';

describe('useQuantity hook', () => {
  const mockItemWithVariation: Item = {
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
    quantity: 2,
  };

  const mockItemWithoutVariation: Item = {
    productId: 4,
    title: 'Handmade bonnet',
    slug: 'handmade-bonnet',
    image: '/images/products/product-10.jpg',
    stock: 5,
    price: 20,
    quantity: 2,
  };

  const updateCartItemMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('decrease quantity for cart item with variation', () => {
    const { result } = renderHook(() => useQuantity(mockItemWithVariation, updateCartItemMock));

    act(() => {
      result.current.handleQuantityDecrease(createMouseClickEvent());
    });

    expect(updateCartItemMock).toHaveBeenCalledWith(mockItemWithVariation.productId, mockItemWithVariation.quantity - 1, mockItemWithVariation.variation?.id);
  });

  test('decrease quantity for cart item with no variation', () => {
    const { result } = renderHook(() => useQuantity(mockItemWithoutVariation, updateCartItemMock));

    act(() => {
      result.current.handleQuantityDecrease(createMouseClickEvent());
    });

    expect(updateCartItemMock).toHaveBeenCalledWith(mockItemWithoutVariation.productId, mockItemWithoutVariation.quantity - 1);
  });

  test('increase quantity for cart item with variation', () => {
    const { result } = renderHook(() => useQuantity(mockItemWithVariation, updateCartItemMock));

    act(() => {
      result.current.handleQuantityIncrease(createMouseClickEvent());
    });

    expect(updateCartItemMock).toHaveBeenCalledWith(mockItemWithVariation.productId, mockItemWithVariation.quantity + 1, mockItemWithVariation.variation?.id);
  });

  test('increase quantity for cart item with no variation', () => {
    const { result } = renderHook(() => useQuantity(mockItemWithoutVariation, updateCartItemMock));

    act(() => {
      result.current.handleQuantityIncrease(createMouseClickEvent());
    });

    expect(updateCartItemMock).toHaveBeenCalledWith(mockItemWithoutVariation.productId, mockItemWithoutVariation.quantity + 1);
  });

  test('change quantity for cart item with variation', () => {
    const mockNewQuantity = 4;

    const { result } = renderHook(() => useQuantity(mockItemWithVariation, updateCartItemMock));

    act(() => {
      result.current.handleQuantityChange(createInputNumberChangeEvent('quantity', mockNewQuantity));
    });

    expect(updateCartItemMock).toHaveBeenCalledWith(mockItemWithVariation.productId, mockNewQuantity, mockItemWithVariation.variation?.id);
  });

  test('change quantity for cart item with no variation', () => {
    const mockNewQuantity = 4;

    const { result } = renderHook(() => useQuantity(mockItemWithoutVariation, updateCartItemMock));

    act(() => {
      result.current.handleQuantityChange(createInputNumberChangeEvent('quantity', mockNewQuantity));
    });

    expect(updateCartItemMock).toHaveBeenCalledWith(mockItemWithoutVariation.productId, mockNewQuantity);
  });
});
