import { renderHook, act } from '@testing-library/react';
import useNewsletterForm from '../useNewsletterForm';
import { createInputChangeEvent, createFormSubmitEvent } from '@utils/tests/events';

describe('useNewsletterForm hook', () => {
  test('updates email on handleFormChange', () => {
    const { result } = renderHook(() => useNewsletterForm());

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'test@example.com'));
    });

    expect(result.current.newsletterFormEmail).toBe('test@example.com');
  });

  test('updates error for missing email', () => {
    const { result } = renderHook(() => useNewsletterForm());

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', ''));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.newsletterFormError).toBe('Please enter an email address');
  });

  test('updates error for invalid email', () => {
    const { result } = renderHook(() => useNewsletterForm());

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'invalid-email'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.newsletterFormError).toBe('Please enter a valid email address');
  });

  test('sets success notification type for valid form submission', () => {
    const { result } = renderHook(() => useNewsletterForm());

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'test@example.com'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.newsletterFormNotification.type).toBe('success');
  });
});
