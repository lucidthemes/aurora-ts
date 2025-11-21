import { renderHook, act } from '@testing-library/react';
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
      result.current.handleFormChange({ target: { name: 'comment', value: 'New comment!' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'name', value: 'Lucid Themes' } });
    });

    expect(result.current.commentFormData.comment).toBe('New comment!');
    expect(result.current.commentFormData.name).toBe('Lucid Themes');
  });

  test('updates form errors for missing fields', () => {
    const { result } = renderHook(() => useForm(mockPostId, mockCommentsCount, mockReplyTo, setCommentReplyIdMock, handleNewCommentMock));

    act(() => {
      result.current.handleFormChange({ target: { name: 'comment', value: '' } });
    });
    act(() => {
      result.current.handleFormChange({ target: { name: 'name', value: '' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.commentFormErrors.comment).toBe('Please enter a comment');
    expect(result.current.commentFormErrors.name).toBe('Please enter a name');
  });

  test('adds new comment and resets form data on valid form submission', () => {
    const { result } = renderHook(() => useForm(mockPostId, mockCommentsCount, mockReplyTo, setCommentReplyIdMock, handleNewCommentMock));

    act(() => {
      result.current.handleFormChange({ target: { name: 'comment', value: 'New comment!' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'name', value: 'Lucid Themes' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(handleNewCommentMock).toHaveBeenCalled();

    expect(result.current.commentFormData.comment).toBe('');
    expect(result.current.commentFormData.name).toBe('');

    expect(setCommentReplyIdMock).toHaveBeenCalledWith(null);
  });
});
