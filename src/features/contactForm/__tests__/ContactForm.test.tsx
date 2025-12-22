import { render, screen, fireEvent } from '@testing-library/react';

import ContactForm from '../ContactForm';

describe('ContactForm component', () => {
  test('renders input fields and submit button', () => {
    render(<ContactForm />);

    expect(screen.getByRole('form', { name: /contact us/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /subject/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('shows error messages for missing fields', () => {
    render(<ContactForm />);

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByText(/please enter a name/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter an email address/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a subject/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a message/i)).toBeInTheDocument();
  });

  test('shows error message for invalid email', () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'invalid-email' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
  });

  test('shows success notification for valid form submission', () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByRole('textbox', { name: /name/i }), {
      target: { value: 'John Doe' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'test@example.com' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: /subject/i }), {
      target: { value: 'Test subject' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: /message/i }), {
      target: { value: 'Test message' },
    });

    fireEvent.click(screen.getByRole('button', { name: /send message/i }));

    expect(screen.getByRole('status')).toHaveTextContent(/your message has successfully been sent/i);
  });
});
