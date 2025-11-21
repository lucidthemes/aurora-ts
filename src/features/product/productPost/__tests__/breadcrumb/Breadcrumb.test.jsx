import { render, screen } from '@testing-library/react';
import Breadcrumb from '../../breadcrumb';

vi.mock('@server/products/getCategory', () => ({
  getCategoryById: vi.fn(),
}));

import { getCategoryById } from '@server/products/getCategory';
import { MemoryRouter } from 'react-router-dom';

describe('Breadcrumb component', () => {
  const mockProduct = {
    id: 1,
    title: 'Cozy sweater',
    category: 6,
  };

  const mockCategory = {
    id: 6,
    name: 'Sweaters',
    slug: 'sweaters',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders breadcrumb when category data is fetched', async () => {
    getCategoryById.mockResolvedValue(mockCategory);

    render(
      <MemoryRouter>
        <Breadcrumb singleProduct={mockProduct} />
      </MemoryRouter>
    );

    const breadcrumbNav = await screen.findByRole('navigation', { name: /breadcrumb/i });

    expect(breadcrumbNav).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /shop/i })).toHaveAttribute('href', '/shop');

    expect(screen.getByRole('link', { name: /sweaters/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sweaters/i })).toHaveAttribute('href', '/product-category/sweaters');

    expect(screen.getByText(/cozy sweater/i)).toBeInTheDocument();
  });
});
