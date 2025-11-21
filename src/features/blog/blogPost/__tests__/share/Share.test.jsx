import { render, screen } from '@testing-library/react';
import Share from '../../share/Share';

describe('Share component', () => {
  test('renders Facebook share icon', () => {
    render(<Share />);

    expect(screen.getByRole('link', { name: /share on facebook/i })).toBeInTheDocument();
  });

  test('renders X share icon', () => {
    render(<Share />);

    expect(screen.getByRole('link', { name: /share on x/i })).toBeInTheDocument();
  });

  test('renders Pinterest share icon', () => {
    render(<Share />);

    expect(screen.getByRole('link', { name: /share on pinterest/i })).toBeInTheDocument();
  });

  test('renders Linkedin share icon', () => {
    render(<Share />);

    expect(screen.getByRole('link', { name: /share on linkedin/i })).toBeInTheDocument();
  });
});
