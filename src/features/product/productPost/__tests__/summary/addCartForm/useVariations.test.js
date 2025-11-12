import { renderHook, act, waitFor } from '@testing-library/react';
import useVariations from '../../../summary/hooks/addCartForm/useVariations';

vi.mock('@server/products/getAttribute', () => ({
  getAttributeArray: vi.fn(),
}));

import { getAttributeArray } from '@server/products/getAttribute';

describe('useVariations hook', () => {
  const mockSingleProduct = {
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

  const mockAddCartFormData = {
    variationId: '',
    quantity: 2,
  };

  const setAddCartFormDataMock = vi.fn();

  const mockAttributes = [
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

  test('fetches variation attributes data and sets attributeArray state', async () => {
    getAttributeArray.mockResolvedValue(mockAttributes);

    let result;

    await act(async () => {
      result = renderHook(() => useVariations(mockSingleProduct, mockAddCartFormData, setAddCartFormDataMock)).result;
    });

    const mockAttributeIds = mockSingleProduct.variationAttributes.flatMap((variation) => variation.options).filter(Boolean);

    expect(getAttributeArray).toHaveBeenCalledWith(mockAttributeIds);
  });

  test('shows all variations when selectedVariations is empty', async () => {
    getAttributeArray.mockResolvedValue(mockAttributes);

    const { result } = renderHook(() => useVariations(mockSingleProduct, mockAddCartFormData, setAddCartFormDataMock));

    const mockAttributeIds = mockSingleProduct.variationAttributes.flatMap((variation) => variation.options).filter(Boolean);

    expect(getAttributeArray).toHaveBeenCalledWith(mockAttributeIds);

    const mockFilteredVariations = [
      {
        type: 'colour',
        options: [
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
        ],
      },
      {
        type: 'size',
        options: [
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
        ],
      },
    ];

    await waitFor(() => {
      expect(result.current.productVariations).toEqual(mockFilteredVariations);
    });
  });

  test('updates size variations when selectedVariations has a colour varation set', async () => {
    getAttributeArray.mockResolvedValue(mockAttributes);

    const { result } = renderHook(() => useVariations(mockSingleProduct, mockAddCartFormData, setAddCartFormDataMock));

    const mockAttributeIds = mockSingleProduct.variationAttributes.flatMap((variation) => variation.options).filter(Boolean);

    expect(getAttributeArray).toHaveBeenCalledWith(mockAttributeIds);

    act(() => {
      result.current.handleProductVariationChange({ target: { name: 'colour', value: '3' } });
    });

    // selected colour red which only has 1 size variation
    const mockFilteredVariations = [
      {
        type: 'colour',
        options: [
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
        ],
      },
      {
        type: 'size',
        options: [
          {
            id: 4,
            name: 'Small',
            slug: 'small',
            type: 'size',
          },
        ],
      },
    ];

    await waitFor(() => {
      expect(result.current.productVariations).toEqual(mockFilteredVariations);
    });
  });

  test('updates colour variations when selectedVariations has a size varation set', async () => {
    getAttributeArray.mockResolvedValue(mockAttributes);

    const { result } = renderHook(() => useVariations(mockSingleProduct, mockAddCartFormData, setAddCartFormDataMock));

    const mockAttributeIds = mockSingleProduct.variationAttributes.flatMap((variation) => variation.options).filter(Boolean);

    expect(getAttributeArray).toHaveBeenCalledWith(mockAttributeIds);

    act(() => {
      result.current.handleProductVariationChange({ target: { name: 'size', value: '6' } });
    });

    // selected size large which only has 1 colour variation
    const mockFilteredVariations = [
      {
        type: 'colour',
        options: [
          {
            id: 1,
            name: 'Black',
            slug: 'black',
            type: 'colour',
          },
        ],
      },
      {
        type: 'size',
        options: [
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
        ],
      },
    ];

    await waitFor(() => {
      expect(result.current.productVariations).toEqual(mockFilteredVariations);
    });
  });

  test('updates selectedVariations using handleProductVariationChange for both colour and size', async () => {
    let result;

    await act(async () => {
      result = renderHook(() => useVariations(mockSingleProduct, mockAddCartFormData, setAddCartFormDataMock)).result;
    });

    act(() => {
      result.current.handleProductVariationChange({ target: { name: 'colour', value: '1' } });
    });

    act(() => {
      result.current.handleProductVariationChange({ target: { name: 'size', value: '4' } });
    });
  });

  test('get the variationId of the selected variations and update addCartFormData', async () => {
    let result;

    await act(async () => {
      result = renderHook(() => useVariations(mockSingleProduct, mockAddCartFormData, setAddCartFormDataMock)).result;
    });

    act(() => {
      result.current.handleProductVariationChange({ target: { name: 'colour', value: '1' } });
    });

    act(() => {
      result.current.handleProductVariationChange({ target: { name: 'size', value: '4' } });
    });

    expect(setAddCartFormDataMock).toHaveBeenCalled();
  });
});
