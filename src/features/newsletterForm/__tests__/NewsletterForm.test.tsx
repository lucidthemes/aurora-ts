import { render, screen, fireEvent } from '@testing-library/react';
import NewsletterForm from '../NewsletterForm';

describe('NewsletterForm component', () => {
  test('renders input and button', () => {
    render(<NewsletterForm />);

    expect(screen.getByRole('form', { name: /newsletter subscribe/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument();
  });

  test('shows error message for missing email', () => {
    render(<NewsletterForm />);

    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/please enter an email address/i);
  });

  test('shows error message for invalid email', () => {
    render(<NewsletterForm />);

    fireEvent.change(screen.getByRole('textbox', { name: /email address/i }), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/please enter a valid email address/i);
  });

  test('shows success notification for valid form submission', () => {
    render(<NewsletterForm />);

    fireEvent.change(screen.getByRole('textbox', { name: /email address/i }), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByRole('button', { name: /subscribe/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/subscribed/i);
  });
});
