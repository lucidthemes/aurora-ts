import { render, screen } from '@testing-library/react';
import Related from '../../related';

vi.mock('@server/products/getProduct', () => ({
  getProductArray: vi.fn(),
}));

import { getProductArray } from '@server/products/getProduct';
import { MemoryRouter } from 'react-router-dom';

describe('Related component', () => {
  const mockProduct = {
    id: 1,
    relatedProducts: [10, 3, 2],
  };

  const mockRelated = [
    { id: 10, title: 'Yarn scarf', price: 15.0 },
    { id: 3, title: 'Baby mittens', price: 10.0 },
    { id: 2, title: 'Autumn beanie', price: 20.0 },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders related products when product data is fetched', async () => {
    getProductArray.mockResolvedValue(mockRelated);

    render(
      <MemoryRouter>
        <Related singleProduct={mockProduct} />
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
        <Related singleProduct={productWithoutRelated} />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
