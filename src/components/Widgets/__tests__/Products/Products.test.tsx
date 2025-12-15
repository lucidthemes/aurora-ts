import { render, screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@server/products/getProducts', () => ({
  getProducts: vi.fn(),
}));

import { getProducts } from '@server/products/getProducts';
import type { Product } from '@typings/products/product';

import ProductsWidget from '../../Products/Products';

describe('ProductsWidget component', () => {
  const mockLimit = 3;

  const mockProducts: Partial<Product>[] = [
    {
      id: 1,
      title: 'Cozy sweater',
      slug: 'cozy-sweater',
      date: '2025-09-10',
      image: '/images/products/product-1.jpg',
      price: 20.0,
      averageReview: 5,
    },
    {
      id: 2,
      title: 'Autumn beanie',
      slug: 'autumn-beanie',
      date: '2025-09-09',
      image: '/images/products/product-5.jpg',
      price: 20.0,
      averageReview: 4,
    },
    {
      id: 3,
      title: 'Baby mittens',
      slug: 'baby-mittens',
      date: '2025-09-08',
      image: '/images/products/product-7.jpg',
      price: 10.0,
      averageReview: 4.67,
    },
  ];
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders products widget when products data is fetched', async () => {
    vi.mocked(getProducts).mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductsWidget title="Latest products" limit={mockLimit} />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { name: /latest products/i });
    expect(heading).toBeInTheDocument();

    const products = await screen.findAllByRole('listitem');
    expect(products).toHaveLength(3);
  });

  test('renders product information', async () => {
    vi.mocked(getProducts).mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductsWidget title="Latest products" limit={mockLimit} />
      </MemoryRouter>
    );

    const productsList = await screen.findByRole('list', { name: /widget products/i });
    expect(productsList).toBeInTheDocument();

    const firstListItem = productsList.querySelector(':scope > li:first-child') as HTMLElement;
    expect(firstListItem).toBeInTheDocument();

    expect(within(firstListItem).getByRole('img', { name: /cozy sweater/i })).toBeInTheDocument();

    expect(within(firstListItem).getByRole('heading', { name: /cozy sweater/i })).toBeInTheDocument();

    expect(within(firstListItem).getByText(/£20.00/i)).toBeInTheDocument();

    expect(within(firstListItem).getByLabelText(/5 out of 5 stars/i)).toBeInTheDocument();
  });

  test('renders error message if no products found', async () => {
    vi.mocked(getProducts).mockResolvedValue([]);

    render(
      <MemoryRouter>
        <ProductsWidget title="Latest products" limit={mockLimit} />
      </MemoryRouter>
    );

    const message = await screen.findByText(/no products found/i);
    expect(message).toBeInTheDocument();
  });
});
