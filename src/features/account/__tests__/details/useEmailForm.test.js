import { renderHook, act } from '@testing-library/react';
import useEmailForm from '../../hooks/Details/useEmailForm';

describe('useEmailForm hook', () => {
  const mockLoggedInUser = {
    id: 1,
    email: 'test@example.com',
    shipping: {
      firstName: 'Matthew',
      lastName: 'James',
      country: 'GB',
      addressLine1: '68 Rose Place',
      addressLine2: '',
      city: 'East Marybury',
      county: 'Highland',
      postcode: 'IV2 7EG',
      phone: '01234567890',
    },
    billing: {
      firstName: 'Matthew',
      lastName: 'James',
      country: 'GB',
      addressLine1: '68 Rose Place',
      addressLine2: '',
      city: 'East Marybury',
      county: 'Highland',
      postcode: 'IV2 7EG',
      phone: '01234567890',
    },
  };

  const handleUserUpdateMock = vi.fn();

  const handleEmailEditShowMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('sets initial emailFormData state to logged in user email', () => {
    const { result } = renderHook(() => useEmailForm(mockLoggedInUser, handleUserUpdateMock, handleEmailEditShowMock));

    expect(result.current.emailFormData).toBe('test@example.com');
  });

  test('updates email on handleFormChange if email has changed', () => {
    const { result } = renderHook(() => useEmailForm(mockLoggedInUser, handleUserUpdateMock, handleEmailEditShowMock));

    act(() => {
      result.current.handleFormChange({ target: { value: 'test2@example.com' } });
    });

    expect(result.current.emailFormData).toBe('test2@example.com');
  });

  test('updates error for missing email', () => {
    const { result } = renderHook(() => useEmailForm(mockLoggedInUser, handleUserUpdateMock, handleEmailEditShowMock));

    act(() => {
      result.current.handleFormChange({ target: { value: '' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.emailFormError).toBe('Please enter an email address');
  });

  test('updates error for invalid email', () => {
    const { result } = renderHook(() => useEmailForm(mockLoggedInUser, handleUserUpdateMock, handleEmailEditShowMock));

    act(() => {
      result.current.handleFormChange({ target: { value: 'invalid-email' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.emailFormError).toBe('Please enter a valid email address');
  });

  test('does not update user email on form submission if email has not changed', () => {
    const { result } = renderHook(() => useEmailForm(mockLoggedInUser, handleUserUpdateMock, handleEmailEditShowMock));

    expect(result.current.emailFormData).toBe('test@example.com');

    act(() => {
      result.current.handleFormChange({ target: { value: 'test@example.com' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.emailFormData).toBe('test@example.com');

    expect(handleUserUpdateMock).not.toHaveBeenCalled();
    expect(handleEmailEditShowMock).toHaveBeenCalled();
  });

  test('updates user email on valid form submission if email has been changed', () => {
    const { result } = renderHook(() => useEmailForm(mockLoggedInUser, handleUserUpdateMock, handleEmailEditShowMock));

    expect(result.current.emailFormData).toBe('test@example.com');

    act(() => {
      result.current.handleFormChange({ target: { value: 'test2@example.com' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.emailFormData).toBe('test2@example.com');

    expect(handleUserUpdateMock).toHaveBeenCalledWith('email', 'test2@example.com');
    expect(handleEmailEditShowMock).toHaveBeenCalled();
  });
});
