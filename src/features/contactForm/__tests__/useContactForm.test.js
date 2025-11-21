import { renderHook, act } from '@testing-library/react';
import useContactForm from '../useContactForm';

describe('useContactForm hook', () => {
  test('updates form data on handleFormChange', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleFormChange({ target: { name: 'name', value: 'John Doe' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'email', value: 'test@example.com' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'subject', value: 'Test subject' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'message', value: 'Test message' } });
    });

    expect(result.current.contactFormData.name).toBe('John Doe');
    expect(result.current.contactFormData.email).toBe('test@example.com');
    expect(result.current.contactFormData.subject).toBe('Test subject');
    expect(result.current.contactFormData.message).toBe('Test message');
  });

  test('updates form errors for missing fields', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleFormChange({ target: { name: 'name', value: '' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'email', value: '' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'subject', value: '' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'message', value: '' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.contactFormErrors.name).toBe('Please enter a name');
    expect(result.current.contactFormErrors.email).toBe('Please enter an email address');
    expect(result.current.contactFormErrors.subject).toBe('Please enter a subject');
    expect(result.current.contactFormErrors.message).toBe('Please enter a message');
  });

  test('updates email form error for invalid email', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleFormChange({ target: { name: 'email', value: 'invalid-email' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.contactFormErrors.email).toBe('Please enter a valid email address');
  });

  test('sets success notification type for valid form submission', () => {
    const { result } = renderHook(() => useContactForm());

    act(() => {
      result.current.handleFormChange({ target: { name: 'name', value: 'John Doe' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'email', value: 'test@example.com' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'subject', value: 'Test subject' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'message', value: 'Test message' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.contactFormNotification.type).toBe('success');
  });
});
