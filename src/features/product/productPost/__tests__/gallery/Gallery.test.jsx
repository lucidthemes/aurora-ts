import { render, screen, fireEvent } from '@testing-library/react';
import Gallery from '../../gallery';
import { MemoryRouter } from 'react-router-dom';

vi.mock('embla-carousel-react', () => ({
  __esModule: true,
  default: () => [
    // emblaRef
    vi.fn(),
    // emblaApi
    {
      scrollNext: vi.fn(),
      scrollPrev: vi.fn(),
      selectedScrollSnap: vi.fn(),
      scrollTo: vi.fn(),
      on: vi.fn().mockReturnThis(),
    },
  ],
}));

describe('Gallery component', () => {
  const mockProduct = {
    id: 1,
    title: 'Cozy sweater',
    image: '/images/products/product-1.jpg',
    gallery: ['/images/products/product-1.jpg', '/images/products/product-2.jpg', '/images/products/product-3.jpg', '/images/products/product-4.jpg'],
  };

  test('renders gallery images', () => {
    render(
      <MemoryRouter>
        <Gallery singleProduct={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/product gallery/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/open gallery overlay/i)).toBeInTheDocument();
  });

  test('renders gallery zoom overlay when open icon clicked', () => {
    render(
      <MemoryRouter>
        <Gallery singleProduct={mockProduct} />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/product gallery/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/open gallery overlay/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /open gallery overlay/i }));

    expect(screen.getByLabelText(/gallery zoom overlay/i)).toBeInTheDocument();
  });
});
