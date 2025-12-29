import { render, screen, within, fireEvent, waitFor } from '@testing-library/react';

vi.mock('@server/products/getReviews', () => ({
  getReviewsById: vi.fn(),
}));

import { getReviewsById } from '@server/products/getReviews';
import type { Product } from '@typings/products/product';
import type { Review } from '@typings/products/review';

import Reviews from '../../../tabs/components/reviews/Reviews';

describe('Reviews component', () => {
  const mockProduct: Partial<Product> = {
    id: 1,
    title: 'Cozy sweater',
    reviewCount: 2,
    averageReview: 5,
  };

  const mockReviews: Review[] = [
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

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders reviews list when data is fetched', async () => {
    vi.mocked(getReviewsById).mockResolvedValue(mockReviews);

    render(<Reviews product={mockProduct as Product} activeTab="reviews" />);

    const reviewsList = await screen.findByRole('list', { name: /reviews/i });
    expect(reviewsList).toBeInTheDocument();

    const reviewItems = await screen.findAllByRole('listitem');
    expect(reviewItems).toHaveLength(2);
  });

  test('renders form input fields and submit button', async () => {
    render(<Reviews product={mockProduct as Product} activeTab="reviews" />);

    await waitFor(() => {
      expect(screen.getByRole('form', { name: /add review/i })).toBeInTheDocument();
      expect(screen.getByRole('radio', { name: /rate 5/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /review/i })).toBeInTheDocument();
      expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /post review/i })).toBeInTheDocument();
    });
  });

  test('adds new review when form successfully submitted', async () => {
    vi.mocked(getReviewsById).mockResolvedValue(mockReviews);

    render(<Reviews product={mockProduct as Product} activeTab="reviews" />);

    const reviewsList = await screen.findByRole('list', { name: /reviews/i });
    expect(reviewsList).toBeInTheDocument();

    const originalReviewItems = await screen.findAllByRole('listitem');
    expect(originalReviewItems).toHaveLength(2);

    const reviewsForm = screen.getByRole('form', { name: /add review/i });

    fireEvent.click(within(reviewsForm).getByLabelText('Rate 4 out of 5'));

    fireEvent.change(within(reviewsForm).getByRole('textbox', { name: /review/i }), {
      target: { value: 'New review!' },
    });

    fireEvent.change(within(reviewsForm).getByRole('textbox', { name: /name/i }), {
      target: { value: 'Lucid Themes' },
    });

    fireEvent.click(within(reviewsForm).getByRole('button', { name: /post review/i }));

    const updatedReviewItems = await screen.findAllByRole('listitem');
    expect(updatedReviewItems).toHaveLength(3);
  });

  test('shows form error messages for missing fields', async () => {
    render(<Reviews product={mockProduct as Product} activeTab="reviews" />);

    await waitFor(() => {
      expect(screen.getByRole('form', { name: /add review/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /post review/i }));

    expect(screen.getByText(/please enter a rating/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a review/i)).toBeInTheDocument();
    expect(screen.getByText(/please enter a name/i)).toBeInTheDocument();
  });
});
