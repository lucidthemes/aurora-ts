import { renderHook, act, waitFor } from '@testing-library/react';

import useEmail from '../../hooks/details/useEmail';

describe('useEmail hook', () => {
  test('changes email edit form to be shown when edit button is clicked', async () => {
    const { result } = renderHook(() => useEmail());

    expect(result.current.emailEditShow).toEqual(false);

    act(() => {
      result.current.handleEmailEditShow();
    });

    await waitFor(() => {
      expect(result.current.emailEditShow).toEqual(true);
    });
  });
});
