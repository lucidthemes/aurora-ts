import { renderHook, act } from '@testing-library/react';
import useSearchForm from '../useSearchForm';

// mock useNavigate
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
    const { result } = renderHook(() => useSearchForm());

    act(() => {
      result.current.handleFormChange({ target: { value: 'term' } });
    });

    expect(result.current.searchFormTerm).toBe('term');
  });

  test('updates error for missing search term', () => {
    const { result } = renderHook(() => useSearchForm());

    act(() => {
      result.current.handleFormChange({ target: { value: '' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: vi.fn() });
    });

    expect(result.current.searchFormError).toBe('Please enter a search term');
  });

  test('navigates to search page for valid form submission', () => {
    const { result } = renderHook(() => useSearchForm());

    act(() => {
      result.current.handleFormChange({ target: { value: 'term' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: vi.fn() });
    });

    expect(result.current.searchFormTerm).toBe('');
    expect(result.current.searchFormError).toBe('');
    expect(mockNavigate).toHaveBeenCalledWith('/search/term');
  });
});
