import { renderHook, act } from '@testing-library/react';

import { createInputChangeEvent, createFormSubmitEvent } from '@utils/tests/events';

import useForm from '../../comments/hooks/useForm';

describe('useForm hook', () => {
  const mockPostId = 1;
  const mockCommentsCount = 5;
  const mockReplyTo = null;
  const setCommentReplyIdMock = vi.fn();
  const handleNewCommentMock = vi.fn();

  test('updates form data on handleFormChange', () => {
    const { result } = renderHook(() => useForm(mockPostId, mockCommentsCount, mockReplyTo, setCommentReplyIdMock, handleNewCommentMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('comment', 'New comment!'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('name', 'Lucid Themes'));
    });

    expect(result.current.commentFormData.comment).toBe('New comment!');
    expect(result.current.commentFormData.name).toBe('Lucid Themes');
  });

  test('updates form errors for missing fields', () => {
    const { result } = renderHook(() => useForm(mockPostId, mockCommentsCount, mockReplyTo, setCommentReplyIdMock, handleNewCommentMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('comment', ''));
    });
    act(() => {
      result.current.handleFormChange(createInputChangeEvent('name', ''));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(result.current.commentFormErrors.comment).toBe('Please enter a comment');
    expect(result.current.commentFormErrors.name).toBe('Please enter a name');
  });

  test('adds new comment and resets form data on valid form submission', () => {
    const { result } = renderHook(() => useForm(mockPostId, mockCommentsCount, mockReplyTo, setCommentReplyIdMock, handleNewCommentMock));

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('comment', 'New comment!'));
    });

    act(() => {
      result.current.handleFormChange(createInputChangeEvent('name', 'Lucid Themes'));
    });

    act(() => {
      result.current.handleFormSubmit(createFormSubmitEvent());
    });

    expect(handleNewCommentMock).toHaveBeenCalled();

    expect(result.current.commentFormData.comment).toBe('');
    expect(result.current.commentFormData.name).toBe('');

    expect(setCommentReplyIdMock).toHaveBeenCalledWith(null);
  });
});
