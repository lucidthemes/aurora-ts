import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import SearchForm from '../SearchForm';

describe('SearchForm component', () => {
  test('renders form input in header location', () => {
    render(
      <MemoryRouter>
        <SearchForm location="header" />
      </MemoryRouter>
    );

    expect(screen.getByRole('form', { name: /search/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /type to search/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /search/i })).not.toBeInTheDocument();
  });

  test('renders form input and button in page location', () => {
    render(
      <MemoryRouter>
        <SearchForm location="page" />
      </MemoryRouter>
    );

    expect(screen.getByRole('textbox', { name: /type to search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('renders form input and button in widget location', () => {
    render(
      <MemoryRouter>
        <SearchForm location="widget" />
      </MemoryRouter>
    );

    expect(screen.getByRole('textbox', { name: /type to search/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('shows error message for missing search term', () => {
    render(
      <MemoryRouter>
        <SearchForm location="page" />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(screen.getByRole('alert')).toHaveTextContent(/please enter a search term/i);
  });
});
