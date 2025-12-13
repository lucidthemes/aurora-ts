import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../LoginForm';

vi.mock('@contexts/AuthContext', () => ({
  useAuthContext: vi.fn(),
}));

vi.mock('@server/shop/getCustomer', () => ({
  getCustomerByEmail: vi.fn(),
}));

import { useAuthContext } from '@contexts/AuthContext';
import { getCustomerByEmail } from '@server/shop/getCustomer';
import { MemoryRouter } from 'react-router-dom';

describe('LoginForm component', () => {
  const mockCustomer = {
    id: 1,
    email: 'test@example.com',
  };

  const handleLoginMock = vi.fn();

  vi.mocked(useAuthContext).mockReturnValue({
    handleLogin: handleLoginMock,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders input fields and submit button', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByRole('form', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('renders show password button', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: /show password/i })).toBeInTheDocument();
  });

  test('renders lost password link', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /lost your password/i })).toBeInTheDocument();
  });

  test('reveals password when show password button is clicked', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    const passwordInput = screen.getByLabelText('Password');
    expect(passwordInput).toHaveAttribute('type', 'password');

    const showPassword = screen.getByRole('button', { name: /show password/i });
    expect(showPassword).toBeInTheDocument();

    fireEvent.click(showPassword);
    expect(passwordInput).toHaveAttribute('type', 'text');
  });

  test('shows error messages for missing fields', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/please enter an email address/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a password/i)).toBeInTheDocument();
  });

  test('shows error message for invalid email', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test('shows error message for password less than 8 characters', () => {
    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'pass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    expect(screen.getByText(/password needs to be longer than 8 characters/i)).toBeInTheDocument();
  });

  test('show error notification for user that does not exist on form submission', async () => {
    vi.mocked(getCustomerByEmail).mockResolvedValue(null);

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(getCustomerByEmail).toHaveBeenCalledWith('test@example.com');
      expect(handleLoginMock).not.toHaveBeenCalledWith();
      expect(screen.getByText(/no account found with those details/i)).toBeInTheDocument();
    });
  });

  test('log user in on valid form submission', async () => {
    vi.mocked(getCustomerByEmail).mockResolvedValue(mockCustomer);

    render(
      <MemoryRouter>
        <LoginForm />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(getCustomerByEmail).toHaveBeenCalledWith('test@example.com');
      expect(handleLoginMock).toHaveBeenCalledWith(mockCustomer);
    });
  });
});
