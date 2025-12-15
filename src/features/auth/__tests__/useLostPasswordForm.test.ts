import { renderHook, act } from '@testing-library/react';

import { createInputChangeEvent, createFormSubmitEvent } from '@utils/tests/events';

import useLostPasswordForm from '../hooks/useLostPasswordForm';

describe('useLostPasswordForm hook', () => {
  test('updates form email on handleFormChange', () => {
    const { result } = renderHook(() => useLostPasswordForm());

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'test@example.com'));
    });

    expect(result.current.lostPasswordFormEmail).toBe('test@example.com');
  });

  test('updates form error for missing email', () => {
    const { result } = renderHook(() => useLostPasswordForm());

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', ''));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.lostPasswordFormError).toBe('Please enter an email address');
  });

  test('updates form error for invalid email', () => {
    const { result } = renderHook(() => useLostPasswordForm());

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'invalid-email'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.lostPasswordFormError).toBe('Please enter a valid email address');
  });

  test('resets form data and shows notification on valid form submission', () => {
    const { result } = renderHook(() => useLostPasswordForm());

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'test@example.com'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.lostPasswordFormEmail).toBe('');
    expect(result.current.lostPasswordFormNotification.type).toBe('success');
    expect(result.current.lostPasswordFormNotification.message).toBe('Password reset email sent. Please check your inbox.');
  });
});
