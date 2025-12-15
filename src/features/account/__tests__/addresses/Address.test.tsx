import { render, screen } from '@testing-library/react';

import type { Customer } from '@typings/shop/customer';

import Address from '../../components/addresses/Address';

describe('Address component', () => {
  const mockLoggedInUser: Customer = {
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

  const mockLoggedInUserNoAddress: Customer = {
    id: 1,
    email: 'test@example.com',
  };

  test('renders shipping address', () => {
    render(<Address loggedInUser={mockLoggedInUser} section="shipping" />);

    expect(screen.getByText(/Matthew James/i)).toBeInTheDocument();
    expect(screen.getByText(/68 Rose Place/i)).toBeInTheDocument();
    expect(screen.getByText(/East Marybury/i)).toBeInTheDocument();
    expect(screen.getByText(/Highland/i)).toBeInTheDocument();
    expect(screen.getByText(/IV2 7EG/i)).toBeInTheDocument();
    expect(screen.getByText(/United Kingdom/i)).toBeInTheDocument();
    expect(screen.getByText(/01234567890/i)).toBeInTheDocument();
  });

  test('renders message if no shipping address set', () => {
    render(<Address loggedInUser={mockLoggedInUserNoAddress} section="shipping" />);

    expect(screen.getByText(/You have not set up a shipping address yet/i)).toBeInTheDocument();
  });

  test('renders billing address', () => {
    render(<Address loggedInUser={mockLoggedInUser} section="billing" />);

    expect(screen.getByText(/Matthew James/i)).toBeInTheDocument();
    expect(screen.getByText(/68 Rose Place/i)).toBeInTheDocument();
    expect(screen.getByText(/East Marybury/i)).toBeInTheDocument();
    expect(screen.getByText(/Highland/i)).toBeInTheDocument();
    expect(screen.getByText(/IV2 7EG/i)).toBeInTheDocument();
    expect(screen.getByText(/United Kingdom/i)).toBeInTheDocument();
    expect(screen.getByText(/01234567890/i)).toBeInTheDocument();
  });

  test('renders message if no billing address set', () => {
    render(<Address loggedInUser={mockLoggedInUserNoAddress} section="billing" />);

    expect(screen.getByText(/You have not set up a billing address yet/i)).toBeInTheDocument();
  });
});
