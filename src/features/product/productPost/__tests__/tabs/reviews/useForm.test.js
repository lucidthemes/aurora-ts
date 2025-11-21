import { renderHook, act } from '@testing-library/react';
import useForm from '../../../tabs/hooks/reviews/useForm';

describe('useForm hook', () => {
  const mockProduct = {
    id: 1,
    title: 'Cozy sweater',
    reviewCount: 2,
    averageReview: 5,
  };

  const mockReviews = [
    {
      id: 1,
      productId: 1,
      rating: 5,
      date: '2025-09-18',
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris.',
      name: 'Lucid Themes',
      status: 'approved',
    },
    {
      id: 2,
      productId: 1,
      rating: 5,
      date: '2025-09-17',
      review:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tempus tortor et facilisis lobortis. Donec auctor aliquam libero nec ullamcorper. In hac habitasse platea dictumst. Nullam nec eros scelerisque, auctor mauris at, vehicula mauris. Sed ac mollis magna, in tempus eros. Duis et nibh in sapien finibus posuere at ut libero.',
      name: 'Lucid Themes',
      status: 'approved',
    },
  ];

  const setReviewsMock = vi.fn();

  test('updates form data on handleFormChange', () => {
    const { result } = renderHook(() => useForm(mockProduct, mockReviews, setReviewsMock));

    act(() => {
      result.current.handleFormChange({ target: { name: 'rating', value: 4 } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'review', value: 'New review!' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'name', value: 'Lucid Themes' } });
    });

    expect(result.current.reviewFormData.rating).toBe(4);
    expect(result.current.reviewFormData.review).toBe('New review!');
    expect(result.current.reviewFormData.name).toBe('Lucid Themes');
  });

  test('updates form errors for missing fields', () => {
    const { result } = renderHook(() => useForm(mockProduct, mockReviews, setReviewsMock));

    act(() => {
      result.current.handleFormChange({ target: { name: 'rating', value: '' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'review', value: '' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'name', value: '' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.reviewFormErrors.rating).toBe('Please enter a rating');
    expect(result.current.reviewFormErrors.review).toBe('Please enter a review');
    expect(result.current.reviewFormErrors.name).toBe('Please enter a name');
  });

  test('adds new review and resets form data on valid form submission', () => {
    const { result } = renderHook(() => useForm(mockProduct, mockReviews, setReviewsMock));

    act(() => {
      result.current.handleFormChange({ target: { name: 'rating', value: 4 } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'review', value: 'New review!' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'name', value: 'Lucid Themes' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(setReviewsMock).toHaveBeenCalled();

    expect(result.current.reviewFormData.rating).toBe('');
    expect(result.current.reviewFormData.review).toBe('');
    expect(result.current.reviewFormData.name).toBe('');
  });
});
