import { renderHook, act, waitFor } from '@testing-library/react';
import useLoginForm from '../hooks/useLoginForm';
import { createInputChangeEvent, createFormSubmitEvent } from '@utils/tests/events';

vi.mock('@server/shop/getCustomer', () => ({
  getCustomerByEmail: vi.fn(),
}));

import { getCustomerByEmail } from '@server/shop/getCustomer';

describe('useLoginForm hook', () => {
  const handleLoginMock = vi.fn();

  const mockCustomer = {
    id: 1,
    email: 'test@example.com',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('updates form data on handleFormChange', () => {
    const { result } = renderHook(() => useLoginForm(handleLoginMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'test@example.com'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('password', 'password'));
    });

    expect(result.current.loginFormData.email).toBe('test@example.com');
    expect(result.current.loginFormData.password).toBe('password');
  });

  test('updates form errors for missing fields', () => {
    const { result } = renderHook(() => useLoginForm(handleLoginMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', ''));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('password', ''));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.loginFormErrors.email).toBe('Please enter an email address');
    expect(result.current.loginFormErrors.password).toBe('Please enter a password');
  });

  test('updates form errors for invalid email', () => {
    const { result } = renderHook(() => useLoginForm(handleLoginMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'invalid-email'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.loginFormErrors.email).toBe('Please enter a valid email address');
  });

  test('updates form errors for password less than 8 characters', () => {
    const { result } = renderHook(() => useLoginForm(handleLoginMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('password', 'pass'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.loginFormErrors.password).toBe('Password needs to be longer than 8 characters');
  });

  test('updates form notification for user that does not exist on form submission', async () => {
    vi.mocked(getCustomerByEmail).mockResolvedValue(null);

    const { result } = renderHook(() => useLoginForm(handleLoginMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'test@example.com'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('password', 'password'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    await waitFor(() => {
      expect(getCustomerByEmail).toHaveBeenCalledWith('test@example.com');
      expect(handleLoginMock).not.toHaveBeenCalled();
      expect(result.current.loginFormNotification.type).toBe('error');
      expect(result.current.loginFormNotification.message).toBe('No account found with those details');
    });
  });

  test('calls handleLogin and resets form data on valid form submission', async () => {
    vi.mocked(getCustomerByEmail).mockResolvedValue(mockCustomer);

    const { result } = renderHook(() => useLoginForm(handleLoginMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'test@example.com'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('password', 'password'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    await waitFor(() => {
      expect(getCustomerByEmail).toHaveBeenCalledWith('test@example.com');
      expect(handleLoginMock).toHaveBeenCalledWith(mockCustomer);
      expect(result.current.loginFormData.email).toBe('');
      expect(result.current.loginFormData.password).toBe('');
    });
  });
});
