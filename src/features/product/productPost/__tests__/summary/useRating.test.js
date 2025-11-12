import { renderHook, act } from '@testing-library/react';
import useRating from '../../summary/hooks/useRating';

describe('useRating hook', () => {
  const setActiveTabMock = vi.fn();

  const tabsRefMock = { current: { scrollIntoView: vi.fn() } };

  test('sets active tab to reviews on handleSummaryRatingClick', () => {
    const { result } = renderHook(() => useRating(setActiveTabMock, tabsRefMock));

    act(() => {
      result.current();
    });

    expect(setActiveTabMock).toHaveBeenCalledWith('reviews');
    expect(tabsRefMock.current.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'start',
    });
  });
});
