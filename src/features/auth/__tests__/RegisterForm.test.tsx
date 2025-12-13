import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '../RegisterForm';

vi.mock('@contexts/AuthContext', () => ({
  useAuthContext: vi.fn(),
}));

vi.mock('@server/shop/getCustomer', () => ({
  getCustomerByEmail: vi.fn(),
}));

import { useAuthContext } from '@contexts/AuthContext';
import { getCustomerByEmail } from '@server/shop/getCustomer';

describe('RegisterForm component', () => {
  const handleRegisterMock = vi.fn();

  vi.mocked(useAuthContext).mockReturnValue({
    handleRegister: handleRegisterMock,
  });

  test('renders input fields and submit button', () => {
    render(<RegisterForm />);

    expect(screen.getByRole('form', { name: /register/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByLabelText('Confirm password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
  });

  test('renders show password button for password field', () => {
    render(<RegisterForm />);

    expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument();
  });

  test('renders show password button for confirm password field', () => {
    render(<RegisterForm />);

    expect(screen.getByRole('button', { name: /show confirm password/i })).toBeInTheDocument();
  });

  test('reveals password when show password button is clicked', () => {
    render(<RegisterForm />);

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const showPassword = screen.getByRole('button', { name: /show password/i });
    expect(showPassword).toBeInTheDocument();

    fireEvent.click(showPassword);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('reveals confirm password when show password button is clicked', () => {
    render(<RegisterForm />);

    const confirmPasswordInput = screen.getByLabelText('Confirm password');
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');

    const showPassword = screen.getByRole('button', { name: /show confirm password/i });
    expect(showPassword).toBeInTheDocument();

    fireEvent.click(showPassword);
    expect(confirmPasswordInput).toHaveAttribute('type', 'text');
  });

  test('shows error messages for missing fields', () => {
    render(<RegisterForm />);

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByText(/please enter an email address/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a password/i)).toBeInTheDocument();
    expect(screen.getByText(/please confirm the password/i)).toBeInTheDocument();
  });

  test('shows error message for invalid email', () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test('shows error message for password less than 8 characters', () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'pass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByText(/password needs to be longer than 8 characters/i)).toBeInTheDocument();
  });

  test('shows error message for passwords that do not match', () => {
    render(<RegisterForm />);

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password1' },
    });

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'password2' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    expect(screen.getByText(/passwords do no match/i)).toBeInTheDocument();
  });

  test('shows error notification for user that already exists on form submission', async () => {
    vi.mocked(getCustomerByEmail).mockResolvedValue({ id: 1, email: 'test@example.com' });

    render(<RegisterForm />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(getCustomerByEmail).toHaveBeenCalledWith('test@example.com');
      expect(handleRegisterMock).not.toHaveBeenCalled();
      expect(screen.getByText(/an account with this email address already exists/i)).toBeInTheDocument();
    });
  });

  test('register user on valid form submission', async () => {
    vi.mocked(getCustomerByEmail).mockResolvedValue(null);

    render(<RegisterForm />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });

    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /register/i }));

    await waitFor(() => {
      expect(getCustomerByEmail).toHaveBeenCalledWith('test@example.com');
      expect(handleRegisterMock).toHaveBeenCalledWith({ id: 1, email: 'test@example.com' });
    });
  });
});
