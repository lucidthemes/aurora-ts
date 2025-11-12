import { renderHook, act } from '@testing-library/react';
import useEditForm from '../../hooks/addresses/useEditForm';

describe('useEditForm hook', () => {
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

  const handleShippingEditShowMock = vi.fn();

  const handleBillingEditShowMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('sets initial editFormData state to logged in user shipping address if set', () => {
    const { result } = renderHook(() => useEditForm(mockLoggedInUser, handleUserUpdateMock, handleShippingEditShowMock, handleBillingEditShowMock, 'shipping'));

    expect(result.current.editFormData.firstName).toBe('Matthew');
    expect(result.current.editFormData.lastName).toBe('James');
    expect(result.current.editFormData.country).toBe('GB');
    expect(result.current.editFormData.addressLine1).toBe('68 Rose Place');
    expect(result.current.editFormData.city).toBe('East Marybury');
    expect(result.current.editFormData.county).toBe('Highland');
    expect(result.current.editFormData.postcode).toBe('IV2 7EG');
    expect(result.current.editFormData.phone).toBe('01234567890');
  });

  test('sets initial editFormData state to logged in user billing address if set', () => {
    const { result } = renderHook(() => useEditForm(mockLoggedInUser, handleUserUpdateMock, handleShippingEditShowMock, handleBillingEditShowMock, 'billing'));

    expect(result.current.editFormData.firstName).toBe('Matthew');
    expect(result.current.editFormData.lastName).toBe('James');
    expect(result.current.editFormData.country).toBe('GB');
    expect(result.current.editFormData.addressLine1).toBe('68 Rose Place');
    expect(result.current.editFormData.city).toBe('East Marybury');
    expect(result.current.editFormData.county).toBe('Highland');
    expect(result.current.editFormData.postcode).toBe('IV2 7EG');
    expect(result.current.editFormData.phone).toBe('01234567890');
  });

  test('updates shipping form data on handleFormChange if data has changed', () => {
    const { result } = renderHook(() => useEditForm(mockLoggedInUser, handleUserUpdateMock, handleShippingEditShowMock, handleBillingEditShowMock, 'shipping'));

    act(() => {
      result.current.handleFormChange({ target: { name: 'firstName', value: 'James' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'lastName', value: 'Matthew' } });
    });

    expect(result.current.editFormData.lastName).toBe('Matthew');
    expect(result.current.editFormData.firstName).toBe('James');
  });

  test('updates billing form data on handleFormChange if data has changed', () => {
    const { result } = renderHook(() => useEditForm(mockLoggedInUser, handleUserUpdateMock, handleShippingEditShowMock, handleBillingEditShowMock, 'billing'));

    act(() => {
      result.current.handleFormChange({ target: { name: 'firstName', value: 'James' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'lastName', value: 'Matthew' } });
    });

    expect(result.current.editFormData.lastName).toBe('Matthew');
    expect(result.current.editFormData.firstName).toBe('James');
  });

  test('updates errors for missing fields', () => {
    const { result } = renderHook(() => useEditForm(mockLoggedInUser, handleUserUpdateMock, handleShippingEditShowMock, handleBillingEditShowMock, 'shipping'));

    act(() => {
      result.current.handleFormChange({ target: { name: 'firstName', value: '' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'lastName', value: '' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.editFormErrors.firstName).toBe('Please enter a first name');
    expect(result.current.editFormErrors.lastName).toBe('Please enter a last name');
  });

  test('does not update shipping address on form submission if address has not changed', () => {
    const { result } = renderHook(() => useEditForm(mockLoggedInUser, handleUserUpdateMock, handleShippingEditShowMock, handleBillingEditShowMock, 'shipping'));

    expect(result.current.editFormData.firstName).toBe('Matthew');
    expect(result.current.editFormData.lastName).toBe('James');

    act(() => {
      result.current.handleFormChange({ target: { name: 'firstName', value: 'Matthew' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'lastName', value: 'James' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.editFormData.firstName).toBe('Matthew');
    expect(result.current.editFormData.lastName).toBe('James');

    expect(handleUserUpdateMock).not.toHaveBeenCalled();
    expect(handleShippingEditShowMock).toHaveBeenCalled();
  });

  test('does not update billing address on form submission if address has not changed', () => {
    const { result } = renderHook(() => useEditForm(mockLoggedInUser, handleUserUpdateMock, handleShippingEditShowMock, handleBillingEditShowMock, 'billing'));

    expect(result.current.editFormData.firstName).toBe('Matthew');
    expect(result.current.editFormData.lastName).toBe('James');

    act(() => {
      result.current.handleFormChange({ target: { name: 'firstName', value: 'Matthew' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'lastName', value: 'James' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.editFormData.firstName).toBe('Matthew');
    expect(result.current.editFormData.lastName).toBe('James');

    expect(handleUserUpdateMock).not.toHaveBeenCalled();
    expect(handleBillingEditShowMock).toHaveBeenCalled();
  });

  test('updates shipping address on valid form submission if address has been changed', () => {
    const { result } = renderHook(() => useEditForm(mockLoggedInUser, handleUserUpdateMock, handleShippingEditShowMock, handleBillingEditShowMock, 'shipping'));

    expect(result.current.editFormData.firstName).toBe('Matthew');
    expect(result.current.editFormData.lastName).toBe('James');

    act(() => {
      result.current.handleFormChange({ target: { name: 'firstName', value: 'James' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'lastName', value: 'Matthew' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.editFormData.lastName).toBe('Matthew');
    expect(result.current.editFormData.firstName).toBe('James');

    expect(handleUserUpdateMock).toHaveBeenCalledWith('shipping', result.current.editFormData);
    expect(handleShippingEditShowMock).toHaveBeenCalled();
  });

  test('updates billing address on valid form submission if address has been changed', () => {
    const { result } = renderHook(() => useEditForm(mockLoggedInUser, handleUserUpdateMock, handleShippingEditShowMock, handleBillingEditShowMock, 'billing'));

    expect(result.current.editFormData.firstName).toBe('Matthew');
    expect(result.current.editFormData.lastName).toBe('James');

    act(() => {
      result.current.handleFormChange({ target: { name: 'firstName', value: 'James' } });
    });

    act(() => {
      result.current.handleFormChange({ target: { name: 'lastName', value: 'Matthew' } });
    });

    act(() => {
      result.current.handleFormSubmit({ preventDefault: () => {} });
    });

    expect(result.current.editFormData.lastName).toBe('Matthew');
    expect(result.current.editFormData.firstName).toBe('James');

    expect(handleUserUpdateMock).toHaveBeenCalledWith('billing', result.current.editFormData);
    expect(handleBillingEditShowMock).toHaveBeenCalled();
  });
});
