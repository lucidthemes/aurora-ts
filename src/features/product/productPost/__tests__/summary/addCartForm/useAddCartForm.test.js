import { renderHook, act } from '@testing-library/react';
import useAddCartForm from '../../../summary/hooks/addCartForm/useAddCartForm';

describe('useAddCartForm hook', () => {
  const addCartItemMock = vi.fn();

  const mockProductWithVariations = {
    id: 1,
    title: 'Cozy sweater',
    price: 20,
    inStock: true,
    SKU: 'CS',
    variationAttributes: [
      {
        type: 'colour',
        options: [1, 2, 3],
      },
      {
        type: 'size',
        options: [4, 5, 6],
      },
    ],
    variations: [
      {
        id: 1001,
        colourId: 1,
        sizeId: 4,
        price: 20,
        stock: 5,
        SKU: 'CS-BLACK-S',
      },
      {
        id: 1002,
        colourId: 1,
        sizeId: 5,
        price: 22.5,
        stock: 15,
        SKU: 'CS-BLACK-M',
      },
      {
        id: 1003,
        colourId: 1,
        sizeId: 6,
        price: 25,
        stock: 15,
        SKU: 'CS-BLACK-L',
      },
      {
        id: 1004,
        colourId: 2,
        sizeId: 4,
        price: 20,
        stock: 5,
        SKU: 'CS-GREEN-S',
      },
      {
        id: 1005,
        colourId: 2,
        sizeId: 5,
        price: 22.5,
        stock: 5,
        SKU: 'CS-GREEN-M',
      },
      {
        id: 1006,
        colourId: 3,
        sizeId: 4,
        price: 20,
        stock: 5,
        SKU: 'CS-RED-S',
      },
    ],
  };

  const mockProductNoVariations = {
    id: 4,
    title: 'Handmade bonnet',
    price: 20,
    inStock: true,
    stock: 5,
    SKU: 'HB',
  };

  const setSummaryDataMock = vi.fn();

  const setAddCartNotificationMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('updates summaryData and addCartFormData when variationId is set or changed', () => {
    const { result } = renderHook(() => useAddCartForm(addCartItemMock, mockProductWithVariations, setSummaryDataMock, setAddCartNotificationMock));

    act(() => {
      result.current.setAddCartFormData({ variationId: 1001, quantity: 1 });
    });

    expect(setSummaryDataMock).toHaveBeenCalled();

    expect(result.current.addCartFormData).toEqual({ variationId: 1001, quantity: 1 });
  });

  test('adds product with variation to the cart', () => {
    const { result } = renderHook(() => useAddCartForm(addCartItemMock, mockProductWithVariations, setSummaryDataMock, setAddCartNotificationMock));

    act(() => {
      result.current.setAddCartFormData({ variationId: 1001, quantity: 1 });
    });

    expect(result.current.addCartFormData.variationId).toBe(1001);

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    // singleProduct.id, addCartFormData.quantity, addCartFormData.variationId
    expect(addCartItemMock).toHaveBeenCalledWith(1, 1, 1001);

    expect(setAddCartNotificationMock).toHaveBeenCalledWith('Cozy sweater has been added to the cart');
  });

  test('adds product without variation to the cart', () => {
    const { result } = renderHook(() => useAddCartForm(addCartItemMock, mockProductNoVariations, setSummaryDataMock, setAddCartNotificationMock));

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    // singleProduct.id, addCartFormData.quantity
    expect(addCartItemMock).toHaveBeenCalledWith(4, 1);

    expect(setAddCartNotificationMock).toHaveBeenCalledWith('Handmade bonnet has been added to the cart');
  });
});
