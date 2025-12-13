import { renderHook, act, waitFor } from '@testing-library/react';
import useRegisterForm from '../hooks/useRegisterForm';
import { createInputChangeEvent, createFormSubmitEvent } from '@utils/tests/events';

vi.mock('@server/shop/getCustomer', () => ({
  getCustomerByEmail: vi.fn(),
}));

import { getCustomerByEmail } from '@server/shop/getCustomer';

describe('useRegisterForm hook', () => {
  const handleRegisterMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('updates form data on handleFormChange', () => {
    const { result } = renderHook(() => useRegisterForm(handleRegisterMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'test@example.com'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('password', 'password'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('confirmPassword', 'password'));
    });

    expect(result.current.registerFormData.email).toBe('test@example.com');
    expect(result.current.registerFormData.password).toBe('password');
    expect(result.current.registerFormData.confirmPassword).toBe('password');
  });

  test('updates form errors for missing fields', () => {
    const { result } = renderHook(() => useRegisterForm(handleRegisterMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', ''));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('password', ''));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('confirmPassword', ''));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.registerFormErrors.email).toBe('Please enter an email address');
    expect(result.current.registerFormErrors.password).toBe('Please enter a password');
    expect(result.current.registerFormErrors.confirmPassword).toBe('Please confirm the password');
  });

  test('updates form errors for invalid email', () => {
    const { result } = renderHook(() => useRegisterForm(handleRegisterMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'invalid-email'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.registerFormErrors.email).toBe('Please enter a valid email address');
  });

  test('updates form errors for password less than 8 characters', () => {
    const { result } = renderHook(() => useRegisterForm(handleRegisterMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('password', 'pass'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.registerFormErrors.password).toBe('Password needs to be longer than 8 characters');
  });

  test('updates form errors for passwords that do no match', () => {
    const { result } = renderHook(() => useRegisterForm(handleRegisterMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('password', 'password1'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('confirmPassword', 'password2'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.registerFormErrors.confirmPassword).toBe('Passwords do no match');
  });

  test('updates form notification for user that already exists on form submission', async () => {
    vi.mocked(getCustomerByEmail).mockResolvedValue({ id: 1, email: 'test@example.com' });

    const { result } = renderHook(() => useRegisterForm(handleRegisterMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'test@example.com'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('password', 'password'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('confirmPassword', 'password'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    await waitFor(() => {
      expect(getCustomerByEmail).toHaveBeenCalledWith('test@example.com');
      expect(handleRegisterMock).not.toHaveBeenCalled();
      expect(result.current.registerFormNotification.type).toBe('error');
      expect(result.current.registerFormNotification.message).toBe('An account with this email address already exists');
    });
  });

  test('calls handleRegister and resets form data on valid form submission', async () => {
    vi.mocked(getCustomerByEmail).mockResolvedValue(null);

    const { result } = renderHook(() => useRegisterForm(handleRegisterMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'test@example.com'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('password', 'password'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('confirmPassword', 'password'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    await waitFor(() => {
      expect(getCustomerByEmail).toHaveBeenCalledWith('test@example.com');
      expect(handleRegisterMock).toHaveBeenCalled();
      expect(result.current.registerFormData.email).toBe('');
      expect(result.current.registerFormData.password).toBe('');
      expect(result.current.registerFormData.confirmPassword).toBe('');
    });
  });
});
