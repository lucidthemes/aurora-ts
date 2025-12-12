import { render, screen, fireEvent } from '@testing-library/react';
import EmailForm from '../../components/details/EmailForm';
import { Customer } from '@typings/shop/customer';

describe('EmailForm component', () => {
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

  const handleUserUpdateMock = vi.fn();

  const handleEmailEditShowMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders input fields and submit button', () => {
    render(<EmailForm loggedInUser={mockLoggedInUser} handleUserUpdate={handleUserUpdateMock} handleEmailEditShow={handleEmailEditShowMock} />);

    expect(screen.getByRole('form', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument();
  });

  test('shows error message for missing email', () => {
    render(<EmailForm loggedInUser={mockLoggedInUser} handleUserUpdate={handleUserUpdateMock} handleEmailEditShow={handleEmailEditShowMock} />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: '' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(screen.getByText(/please enter an email address/i)).toBeInTheDocument();
  });

  test('shows error message for invalid email', () => {
    render(<EmailForm loggedInUser={mockLoggedInUser} handleUserUpdate={handleUserUpdateMock} handleEmailEditShow={handleEmailEditShowMock} />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test('updates user email on valid form submission if email has been changed', () => {
    render(<EmailForm loggedInUser={mockLoggedInUser} handleUserUpdate={handleUserUpdateMock} handleEmailEditShow={handleEmailEditShowMock} />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test2@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /save changes/i }));

    expect(handleUserUpdateMock).toHaveBeenCalledWith('email', 'test2@example.com');
    expect(handleEmailEditShowMock).toHaveBeenCalled();
  });
});
