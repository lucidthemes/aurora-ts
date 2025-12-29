import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@server/products/getProduct', () => ({
  getProductArray: vi.fn(),
}));

import { getProductArray } from '@server/products/getProduct';
import type { Product } from '@typings/products/product';

import Related from '../../related';

describe('Related component', () => {
  const mockProduct: Partial<Product> = {
    id: 1,
    relatedProducts: [10, 3, 2],
  };

  const mockRelated: Partial<Product>[] = [
    { id: 10, title: 'Yarn scarf', price: 15.0 },
    { id: 3, title: 'Baby mittens', price: 10.0 },
    { id: 2, title: 'Autumn beanie', price: 20.0 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders related products when product data is fetched', async () => {
    vi.mocked(getProductArray).mockResolvedValue(mockRelated);

    render(
      <MemoryRouter>
        <Related product={mockProduct as Product} />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { name: /related products/i });
    expect(heading).toBeInTheDocument();

    const items = await screen.findAllByRole('listitem');
    expect(items).toHaveLength(3);
  });

  test('renders nothing if product does not have related products', () => {
    const productWithoutRelated = { id: 1 };

    const { container } = render(
      <MemoryRouter>
        <Related product={productWithoutRelated as Product} />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
