import { render, screen, within, fireEvent } from '@testing-library/react';
import ProductList from '../ProductList';

vi.mock('@server/products/getProducts', () => ({
  getProducts: vi.fn(),
  getProductsMinMaxPrices: vi.fn(),
}));

vi.mock('@server/products/getCategories', () => ({
  getCategories: vi.fn(),
}));

vi.mock('@server/products/getAttributes', () => ({
  getAttributesByType: vi.fn(),
}));

import { getProducts, getProductsMinMaxPrices } from '@server/products/getProducts';
import { getCategories } from '@server/products/getCategories';
import { getAttributesByType } from '@server/products/getAttributes';
import { MemoryRouter } from 'react-router-dom';

Element.prototype.scrollIntoView = vi.fn();

describe('ProductList component', () => {
  const mockProducts = [
    {
      id: 1,
      title: 'Cozy sweater',
      slug: 'cozy-sweater',
      date: '2025-09-10',
      category: 6,
      image: '/images/products/product-1.jpg',
      price: 20,
      reviewCount: 2,
      averageReview: 5,
    },
    {
      id: 2,
      title: 'Autumn beanie',
      slug: 'autumn-beanie',
      date: '2025-09-09',
      category: 3,
      image: '/images/products/product-5.jpg',
      price: 20,
      reviewCount: 1,
      averageReview: 4,
    },
    {
      id: 3,
      title: 'Baby mittens',
      slug: 'baby-mittens',
      date: '2025-09-08',
      category: 2,
      image: '/images/products/product-7.jpg',
      price: 10,
      reviewCount: 3,
      averageReview: 4.67,
    },
    {
      id: 4,
      title: 'Handmade bonnet',
      slug: 'handmade-bonnet',
      date: '2025-09-07',
      category: 3,
      image: '/images/products/product-10.jpg',
      price: 20,
      reviewCount: 2,
      averageReview: 3.5,
    },
    {
      id: 5,
      title: 'Knitted bag',
      slug: 'knitted-bag',
      date: '2025-09-06',
      category: 1,
      image: '/images/products/product-13.jpg',
      price: 15,
      reviewCount: 1,
      averageReview: 5,
    },
    {
      id: 6,
      title: 'Scarf knitwear',
      slug: 'scarf-knitwear',
      date: '2025-09-05',
      category: 5,
      image: '/images/products/product-6.jpg',
      price: 15,
      reviewCount: 2,
      averageReview: 3.5,
    },
    {
      id: 7,
      title: 'Sewn handbag',
      slug: 'sewn-handbag',
      date: '2025-09-04',
      category: 1,
      image: '/images/products/product-12.jpg',
      price: 10,
      reviewCount: 2,
      averageReview: 2.5,
    },
    {
      id: 8,
      title: 'Stylish jeans',
      slug: 'stylish-jeans',
      date: '2025-09-03',
      category: 4,
      image: '/images/products/product-8.jpg',
      price: 40,
      reviewCount: 2,
      averageReview: 2,
    },
    {
      id: 9,
      title: 'Wool scarf',
      slug: 'wool-scarf',
      date: '2025-09-02',
      category: 5,
      image: '/images/products/product-9.jpg',
      price: 20,
      reviewCount: 2,
      averageReview: 5,
    },
    {
      id: 10,
      title: 'Yarn scarf',
      slug: 'yarn-scarf',
      date: '2025-09-01',
      category: 5,
      image: '/images/products/product-14.jpg',
      price: 15,
      reviewCount: 1,
      averageReview: 1,
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    //getProducts.mockResolvedValue(mockProducts);
  });

  test('renders list when post data is fetched', async () => {
    getProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    const productList = await screen.findByRole('list', { name: /products/i });
    expect(productList).toBeInTheDocument();

    const listItems = productList.querySelectorAll(':scope > li');
    expect(listItems).toHaveLength(9);
  });

  test('renders product information', async () => {
    getProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    const productList = await screen.findByRole('list', { name: /products/i });
    expect(productList).toBeInTheDocument();

    const firstListItem = productList.querySelector(':scope > li:first-child');
    expect(firstListItem).toBeInTheDocument();

    expect(within(firstListItem).getByRole('img', { name: /cozy sweater/i })).toBeInTheDocument();

    expect(within(firstListItem).getByRole('heading', { name: /cozy sweater/i })).toBeInTheDocument();

    expect(within(firstListItem).getByText(/£20.00/i)).toBeInTheDocument();

    expect(within(firstListItem).getByLabelText(/5 out of 5 stars/i)).toBeInTheDocument();
  });

  test('renders pagination when product data is fetched', async () => {
    getProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    const pagination = await screen.findByLabelText(/product pagination/i);
    expect(pagination).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 1/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /page 2/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /next page/i })).toBeInTheDocument();
  });

  test('updates list when pagination link is clicked', async () => {
    getProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    const productList = await screen.findByRole('list', { name: /products/i });
    expect(productList).toBeInTheDocument();

    const originalListItems = productList.querySelectorAll(':scope > li');
    expect(originalListItems).toHaveLength(9);

    const pagination = await screen.findByLabelText(/product pagination/i);
    expect(pagination).toBeInTheDocument();

    fireEvent.click(within(pagination).getByRole('button', { name: /next page/i }));

    const updatedListItems = productList.querySelectorAll(':scope > li');
    expect(updatedListItems).toHaveLength(1);

    expect(within(pagination).getByRole('button', { name: /previous page/i })).toBeInTheDocument();
  });

  test('hides pagination when showPagination is set to false', async () => {
    getProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductList showPagination={false} />
      </MemoryRouter>
    );

    await screen.findByRole('list', { name: /products/i });

    const pagination = screen.queryByLabelText(/product pagination/i);
    expect(pagination).not.toBeInTheDocument();
  });

  test('renders results count when product data is fetched', async () => {
    getProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    await screen.findByRole('list', { name: /products/i });

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent(/showing/i);
    expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
  });

  test('hides results count when showResults is set to false', async () => {
    getProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductList showResults={false} />
      </MemoryRouter>
    );

    await screen.findByRole('list', { name: /products/i });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  test('renders sort dropdown when product data is fetched', async () => {
    getProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    await screen.findByRole('list', { name: /products/i });

    expect(screen.getByRole('combobox', { name: /sort/i })).toBeInTheDocument();
  });

  test('hides sort dropdown when showSort is set to false', async () => {
    getProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductList showSort={false} />
      </MemoryRouter>
    );

    await screen.findByRole('list', { name: /products/i });

    expect(screen.queryByRole('combobox', { name: /sort/i })).not.toBeInTheDocument();
  });

  test('renders filters when product data is fetched', async () => {
    getProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductList />
      </MemoryRouter>
    );

    await screen.findByRole('list', { name: /products/i });

    expect(screen.getByRole('complementary', { name: /filters/i })).toBeInTheDocument();
  });

  test('hides filters when showFilter is set to false', async () => {
    getProducts.mockResolvedValue(mockProducts);

    render(
      <MemoryRouter>
        <ProductList showFilter={false} />
      </MemoryRouter>
    );

    await screen.findByRole('list', { name: /products/i });

    expect(screen.queryByRole('complementary', { name: /filters/i })).not.toBeInTheDocument();
  });
});
