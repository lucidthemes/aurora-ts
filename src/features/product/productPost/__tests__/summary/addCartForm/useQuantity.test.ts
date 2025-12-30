import { renderHook, act } from '@testing-library/react';

import type { SummaryData, AddCartFormData } from '@typings/products/summary';
import { createInputChangeEvent, createMouseClickEvent } from '@utils/tests/events';

import useQuantity from '../../../summary/hooks/addCartForm/useQuantity';

describe('useQuantity hook', () => {
  const mockSummaryData: SummaryData = {
    price: 20,
    SKU: 'CS',
    category: {
      id: 6,
      name: 'Sweaters',
      slug: 'sweaters',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    tags: [
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
    ],
  };

  const mockAddCartFormData: AddCartFormData = {
    quantity: 2,
  };

  const setAddCartFormDataMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('decrease quantity input value', () => {
    const { result } = renderHook(() => useQuantity(mockSummaryData, mockAddCartFormData, setAddCartFormDataMock));

    act(() => {
      result.current.handleQuantityDecrease(createMouseClickEvent());
    });

    expect(setAddCartFormDataMock).toHaveBeenCalled();
  });

  test('increase quantity input value', () => {
    const { result } = renderHook(() => useQuantity(mockSummaryData, mockAddCartFormData, setAddCartFormDataMock));

    act(() => {
      result.current.handleQuantityIncrease(createMouseClickEvent());
    });

    expect(setAddCartFormDataMock).toHaveBeenCalled();
  });

  test('change quantity input value', () => {
    const { result } = renderHook(() => useQuantity(mockSummaryData, mockAddCartFormData, setAddCartFormDataMock));

    act(() => {
      result.current.handleQuantityChange(createInputChangeEvent('quantity', 3));
    });

    expect(setAddCartFormDataMock).toHaveBeenCalled();
  });
});
