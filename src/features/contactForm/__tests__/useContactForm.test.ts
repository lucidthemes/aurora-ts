import { renderHook, act } from '@testing-library/react';
import useContactForm from '../useContactForm';
import { createInputChangeEvent, createTextAreaChangeEvent, createFormSubmitEvent } from '@utils/tests/events';

describe('useContactForm hook', () => {
  test('updates form data on handleFormChange', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('name', 'John Doe'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'test@example.com'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('subject', 'Test subject'));
    });

    act(() => {
      result.current.handleFormChange(createTextAreaChangeEvent('message', 'Test message'));
    });

    expect(result.current.contactFormData.name).toBe('John Doe');
    expect(result.current.contactFormData.email).toBe('test@example.com');
    expect(result.current.contactFormData.subject).toBe('Test subject');
    expect(result.current.contactFormData.message).toBe('Test message');
  });

  test('updates form errors for missing fields', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('name', ''));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', ''));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('subject', ''));
    });

    act(() => {
      result.current.handleFormChange(createTextAreaChangeEvent('message', ''));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.contactFormErrors.name).toBe('Please enter a name');
    expect(result.current.contactFormErrors.email).toBe('Please enter an email address');
    expect(result.current.contactFormErrors.subject).toBe('Please enter a subject');
    expect(result.current.contactFormErrors.message).toBe('Please enter a message');
  });

  test('updates email form error for invalid email', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'invalid-email'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.contactFormErrors.email).toBe('Please enter a valid email address');
  });

  test('sets success notification type for valid form submission', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('name', 'John Doe'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('email', 'test@example.com'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('subject', 'Test subject'));
    });

    act(() => {
      result.current.handleFormChange(createTextAreaChangeEvent('message', 'Test message'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.contactFormNotification.type).toBe('success');
  });
});
