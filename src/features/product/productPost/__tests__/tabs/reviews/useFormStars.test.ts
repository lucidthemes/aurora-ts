import { renderHook, act } from '@testing-library/react';

import useFormStars from '../../../tabs/hooks/reviews/useFormStars';

describe('useFormStars hook', () => {
  test('updates hoveredRating state when form star rating icon hovered over', () => {
    const { result } = renderHook(() => useFormStars());

    expect(result.current.hoveredRating).toEqual(0);

    act(() => {
      result.current.handleMouseEnter(4);
    });

    expect(result.current.hoveredRating).toBe(4);
  });

  test('resets hoveredRating state when form star rating icon stops being hovered over', () => {
    const { result } = renderHook(() => useFormStars());

    expect(result.current.hoveredRating).toEqual(0);

    act(() => {
      result.current.handleMouseLeave();
    });

    expect(result.current.hoveredRating).toBe(0);
  });
});
