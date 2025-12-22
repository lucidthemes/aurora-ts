import { renderHook, act } from '@testing-library/react';

import { createInputChangeEvent, createFormSubmitEvent } from '@utils/tests/events';

import useSearchForm from '../useSearchForm';

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('useSearchForm hook', () => {
  test('updates search term on handleFormChange', () => {
    const { result } = renderHook(() => useSearchForm('term', 'page'));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('search', 'term'));
    });

    expect(result.current.searchFormTerm).toBe('term');
  });

  test('updates error for missing search term', () => {
    const { result } = renderHook(() => useSearchForm('', 'page'));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('search', ''));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.searchFormError).toBe('Please enter a search term');
  });

  test('navigates to search page for valid form submission', () => {
    const { result } = renderHook(() => useSearchForm('term', 'page'));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('search', 'term'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(mockNavigate).toHaveBeenCalledWith('/search/term');
  });
});
