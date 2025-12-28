import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@server/products/getCategories', () => ({
  getCategories: vi.fn(),
}));

vi.mock('@server/products/getAttributes', () => ({
  getAttributesByType: vi.fn(),
}));

import { getCategories } from '@server/products/getCategories';
import { getAttributesByType } from '@server/products/getAttributes';
import type { ActiveFilters, FilterCounts, PriceFilterMinMax } from '@typings/products/filter';
import type { Category } from '@typings/products/category';
import type { Attribute } from '@typings/products/attribute';

import FilterCategory from '../../components/filters/FilterCategory';
import FilterAttribute from '../../components/filters/FilterAttribute';
import FilterRating from '../../components/filters/FilterRating';
import FilterStock from '../../components/filters/FilterStock';
import FilterPrice from '../../components/filters/FilterPrice';

describe('Filters components', () => {
  const mockActiveFilters: ActiveFilters = {
    category: [],
    colour: [],
    size: [],
    rating: [],
    stock: {},
    price: { minPrice: 0, maxPrice: 0 },
  };

  const mockFilterCounts: FilterCounts = {
    category: {
      1: 2,
      2: 1,
      3: 2,
      4: 1,
      5: 3,
      6: 1,
    },
    colour: {
      1: 2,
      2: 2,
      3: 2,
    },
    size: {
      4: 2,
      5: 2,
      6: 2,
    },
    rating: {
      1: 1,
      2: 2,
      3: 2,
      4: 2,
      5: 3,
    },
    stock: {
      in: 9,
      out: 1,
    },
  };

  const mockPriceFilterMinMax: PriceFilterMinMax = {
    minPrice: 10,
    maxPrice: 40,
  };

  const mockFilterCategories: Category[] = [
    {
      id: 1,
      name: 'Bags',
      slug: 'bags',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 2,
      name: 'Gloves',
      slug: 'gloves',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 3,
      name: 'Hats',
      slug: 'hats',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 4,
      name: 'Jeans',
      slug: 'jeans',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 5,
      name: 'Scarves',
      slug: 'scarves',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 6,
      name: 'Sweaters',
      slug: 'sweaters',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
  ];

  const mockFilterColours: Attribute[] = [
    {
      id: 1,
      name: 'Black',
      slug: 'black',
      type: 'colour',
    },
    {
      id: 2,
      name: 'Green',
      slug: 'green',
      type: 'colour',
    },
    {
      id: 3,
      name: 'Red',
      slug: 'red',
      type: 'colour',
    },
  ];

  const mockFilterSizes: Attribute[] = [
    {
      id: 4,
      name: 'Small',
      slug: 'small',
      type: 'size',
    },
    {
      id: 5,
      name: 'Medium',
      slug: 'medium',
      type: 'size',
    },
    {
      id: 6,
      name: 'Large',
      slug: 'large',
      type: 'size',
    },
  ];

  const handleFilterListToggleMock = vi.fn();

  const handleFilterListStockMock = vi.fn();

  const handleFilterListPricesMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders category filter when category data is fetched', async () => {
    vi.mocked(getCategories).mockResolvedValue(mockFilterCategories);

    render(
      <MemoryRouter>
        <FilterCategory activeFilters={mockActiveFilters} filterCounts={mockFilterCounts} handleFilterListToggle={handleFilterListToggleMock} />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { name: /filter by category/i });
    expect(heading).toBeInTheDocument();

    const categories = await screen.findAllByRole('listitem');
    expect(categories).toHaveLength(6);

    expect(screen.getByRole('checkbox', { name: /bags/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /gloves/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /hats/i })).toBeInTheDocument();
  });

  test('renders colour filter when attribute data is fetched', async () => {
    vi.mocked(getAttributesByType).mockResolvedValue(mockFilterColours);

    render(
      <MemoryRouter>
        <FilterAttribute
          attributeType="colour"
          activeFilters={mockActiveFilters}
          filterCounts={mockFilterCounts}
          handleFilterListToggle={handleFilterListToggleMock}
        />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { name: /filter by colour/i });
    expect(heading).toBeInTheDocument();

    const colours = await screen.findAllByRole('listitem');
    expect(colours).toHaveLength(3);

    expect(screen.getByRole('checkbox', { name: /black/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /green/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /red/i })).toBeInTheDocument();
  });

  test('renders size filter when attribute data is fetched', async () => {
    vi.mocked(getAttributesByType).mockResolvedValue(mockFilterSizes);

    render(
      <MemoryRouter>
        <FilterAttribute
          attributeType="size"
          activeFilters={mockActiveFilters}
          filterCounts={mockFilterCounts}
          handleFilterListToggle={handleFilterListToggleMock}
        />
      </MemoryRouter>
    );

    const heading = await screen.findByRole('heading', { name: /filter by size/i });
    expect(heading).toBeInTheDocument();

    const colours = await screen.findAllByRole('listitem');
    expect(colours).toHaveLength(3);

    expect(screen.getByRole('checkbox', { name: /small/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /medium/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /large/i })).toBeInTheDocument();
  });

  test('renders rating filter', () => {
    render(
      <MemoryRouter>
        <FilterRating activeFilters={mockActiveFilters} filterCounts={mockFilterCounts} handleFilterListToggle={handleFilterListToggleMock} />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { name: /filter by rating/i });
    expect(heading).toBeInTheDocument();

    expect(screen.getByRole('checkbox', { name: /5 out of 5 stars/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /4 out of 5 stars/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /3 out of 5 stars/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /2 out of 5 stars/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /1 out of 5 stars/i })).toBeInTheDocument();
  });

  test('renders stock status filter', () => {
    render(
      <MemoryRouter>
        <FilterStock activeFilters={mockActiveFilters} filterCounts={mockFilterCounts} handleFilterListStock={handleFilterListStockMock} />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { name: /filter by stock status/i });
    expect(heading).toBeInTheDocument();

    expect(screen.getByRole('checkbox', { name: /in stock/i })).toBeInTheDocument();
    expect(screen.getByRole('checkbox', { name: /out of stock/i })).toBeInTheDocument();
  });

  test('renders price filter', () => {
    render(
      <MemoryRouter>
        <FilterPrice priceFilterMinMax={mockPriceFilterMinMax} handleFilterListPrices={handleFilterListPricesMock} />
      </MemoryRouter>
    );

    const heading = screen.getByRole('heading', { name: /filter by price/i });
    expect(heading).toBeInTheDocument();

    expect(screen.getByRole('slider', { name: /change minimum price/i })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: /change minimum price/i })).toHaveValue('10');
    expect(screen.getByRole('slider', { name: /change maximum price/i })).toBeInTheDocument();
    expect(screen.getByRole('slider', { name: /change maximum price/i })).toHaveValue('40');

    expect(screen.getByRole('textbox', { name: /minimum price/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /minimum price/i })).toHaveValue('£10');
    expect(screen.getByRole('textbox', { name: /maximum price/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /maximum price/i })).toHaveValue('£40');
  });

  test('update active filters when filter checkbox clicked', async () => {
    vi.mocked(getCategories).mockResolvedValue(mockFilterCategories);

    render(
      <MemoryRouter>
        <FilterCategory activeFilters={mockActiveFilters} filterCounts={mockFilterCounts} handleFilterListToggle={handleFilterListToggleMock} />
      </MemoryRouter>
    );

    await screen.findAllByRole('listitem');

    fireEvent.click(screen.getByRole('checkbox', { name: /bags/i }));

    expect(handleFilterListToggleMock).toHaveBeenCalledWith('category', 1);
  });

  test('update active filters when filter price changed', async () => {
    render(
      <MemoryRouter>
        <FilterPrice priceFilterMinMax={mockPriceFilterMinMax} handleFilterListPrices={handleFilterListPricesMock} />
      </MemoryRouter>
    );

    const minPriceSlider = screen.getByRole('slider', { name: /change minimum price/i });
    const maxPriceSlider = screen.getByRole('slider', { name: /change maximum price/i });

    fireEvent.change(minPriceSlider, { target: { value: '20' } });
    fireEvent.change(maxPriceSlider, { target: { value: '30' } });

    // wait for price filter debounce
    await waitFor(() => {
      expect(handleFilterListPricesMock).toHaveBeenCalledWith(20, 30);
    });
  });
});
