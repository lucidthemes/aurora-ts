import { renderHook, act } from '@testing-library/react';
import useQuantity from '../../hooks/items/useQuantity';

describe('useQuantity hook', () => {
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
    quantity: 2,
  };

  const mockItemWithoutVariation = {
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
    const { result } = renderHook(() =>
      useQuantity(
        mockItemWithVariation.productId,
        mockItemWithVariation.stock,
        mockItemWithVariation.variation,
        mockItemWithVariation.quantity,
        updateCartItemMock
      )
    );

    act(() => {
      result.current.handleQuantityDecrease();
    });

    expect(updateCartItemMock).toHaveBeenCalledWith(mockItemWithVariation.productId, mockItemWithVariation.variation.id, mockItemWithVariation.quantity - 1);
  });

  test('decrease quantity for cart item with no variation', () => {
    const { result } = renderHook(() =>
      useQuantity(
        mockItemWithoutVariation.productId,
        mockItemWithoutVariation.stock,
        mockItemWithoutVariation.variation,
        mockItemWithoutVariation.quantity,
        updateCartItemMock
      )
    );

    act(() => {
      result.current.handleQuantityDecrease();
    });

    expect(updateCartItemMock).toHaveBeenCalledWith(mockItemWithoutVariation.productId, null, mockItemWithoutVariation.quantity - 1);
  });

  test('increase quantity for cart item with variation', () => {
    const { result } = renderHook(() =>
      useQuantity(
        mockItemWithVariation.productId,
        mockItemWithVariation.stock,
        mockItemWithVariation.variation,
        mockItemWithVariation.quantity,
        updateCartItemMock
      )
    );

    act(() => {
      result.current.handleQuantityIncrease();
    });

    expect(updateCartItemMock).toHaveBeenCalledWith(mockItemWithVariation.productId, mockItemWithVariation.variation.id, mockItemWithVariation.quantity + 1);
  });

  test('increase quantity for cart item with no variation', () => {
    const { result } = renderHook(() =>
      useQuantity(
        mockItemWithoutVariation.productId,
        mockItemWithoutVariation.stock,
        mockItemWithoutVariation.variation,
        mockItemWithoutVariation.quantity,
        updateCartItemMock
      )
    );

    act(() => {
      result.current.handleQuantityIncrease();
    });

    expect(updateCartItemMock).toHaveBeenCalledWith(mockItemWithoutVariation.productId, null, mockItemWithoutVariation.quantity + 1);
  });

  test('change quantity for cart item with variation', () => {
    const mockNewQuantity = 4;

    const { result } = renderHook(() =>
      useQuantity(
        mockItemWithVariation.productId,
        mockItemWithVariation.stock,
        mockItemWithVariation.variation,
        mockItemWithVariation.quantity,
        updateCartItemMock
      )
    );

    act(() => {
      result.current.handleQuantityChange({ target: { value: mockNewQuantity } });
    });

    expect(updateCartItemMock).toHaveBeenCalledWith(mockItemWithVariation.productId, mockItemWithVariation.variation.id, mockNewQuantity);
  });

  test('change quantity for cart item with no variation', () => {
    const mockNewQuantity = 4;

    const { result } = renderHook(() =>
      useQuantity(
        mockItemWithoutVariation.productId,
        mockItemWithoutVariation.stock,
        mockItemWithoutVariation.variation,
        mockItemWithoutVariation.quantity,
        updateCartItemMock
      )
    );

    act(() => {
      result.current.handleQuantityChange({ target: { value: mockNewQuantity } });
    });

    expect(updateCartItemMock).toHaveBeenCalledWith(mockItemWithoutVariation.productId, null, mockNewQuantity);
  });
});
