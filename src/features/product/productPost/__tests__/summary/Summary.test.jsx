import { render, screen, waitFor } from '@testing-library/react';
import Summary from '../../summary';

vi.mock('@features/cart/CartContext', () => ({
  useCartContext: vi.fn(),
}));

vi.mock('@server/products/getCategory', () => ({
  getCategoryById: vi.fn(),
}));

vi.mock('@server/products/getTags', () => ({
  getTagsArray: vi.fn(),
}));

vi.mock('@server/products/getAttribute', () => ({
  getAttributeArray: vi.fn(),
}));

import { useCartContext } from '@features/cart/CartContext';
import { getCategoryById } from '@server/products/getCategory';
import { getTagsArray } from '@server/products/getTags';
import { getAttributeArray } from '@server/products/getAttribute';
import { MemoryRouter } from 'react-router-dom';

describe('Summary component', () => {
  const addCartItemMock = vi.fn();

  useCartContext.mockReturnValue({
    addCartItem: addCartItemMock,
  });

  const mockProduct = {
    id: 1,
    title: 'Cozy sweater',
    slug: 'cozy-sweater',
    date: '2025-09-10',
    category: 6,
    tags: [4, 5, 14],
    image: '/images/products/product-1.jpg',
    gallery: ['/images/products/product-1.jpg', '/images/products/product-2.jpg', '/images/products/product-3.jpg', '/images/products/product-4.jpg'],
    shortDescription:
      'Aenean sollicitudin, lorem quis biber idu auctor anisi consequat happ quam vel enim augue. Donec efficitur eget ligula at porta. Aenean impiet risus leifend magna. Aenean sollicitudin, lorem quis biber idu auctor anisi consequat happ quam vel enim augue. Donec efficitur eget ligula at porta. Aenean impiet risus leifend magna.',
    description: [
      {
        id: 1,
        type: 'paragraph',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est. Suspendisse eleifend dui odio, id volutpat quam iaculis eu. Nunc sit amet scelerisque mauris. Phasellus volutpat mauris ac sem tincidunt, in fringilla arcu ultrices. Phasellus scelerisque eros vel pulvinar gravida. Aenean suscipit felis orci, sed egestas libero dignissim at. Sed commodo malesuada ligula, nec vehicula risus fermentum sed.',
      },
      {
        id: 2,
        type: 'paragraph',
        text: 'Integer pretium posuere est. Ut interdum mollis ipsum, ac vehicula nisl laoreet et. Curabitur ac ipsum aliquam, varius purus at, lobortis purus. Maecenas quis sem dapibus, volutpat odio non, mattis dui. Nam eget urna nec mi tempor mollis vel nec felis. Cras tellus est, malesuada at leo vitae, lacinia pellentesque eros. Donec accumsan tincidunt velit.',
      },
      { id: 3, type: 'heading', level: 3, text: 'Varius purus' },
      {
        id: 4,
        type: 'paragraph',
        text: 'Nullam lobortis faucibus cursus. Sed aliquam semper mi sit amet interdum. Aliquam felis quam, ultrices ut elementum a, porta vel ex. Pellentesque at tempus magna. Vestibulum viverra lectus quis laoreet ullamcorper. Nunc finibus orci in luctus hendrerit. Ut dui mi, lacinia hendrerit elit ut, malesuada luctus enim.',
      },
      {
        id: 5,
        type: 'blockquote',
        text: 'Aliquam a malesuada elit. Aliquam sit amet augue nec diam lacinia tempus. Phasellus accumsan ac arcu ut fermentum. Curabitur volutpat, ex vel tincidunt sollicitudin, quam velit malesuada lorem. Vivamus varius aliquam enim at sagittis. Nulla facilisi.',
      },
      {
        id: 6,
        type: 'paragraph',
        text: 'Sed rhoncus, velit sit amet mollis cursus, velit urna congue orci, in dignissim elit magna eget ante. Mauris sem justo, volutpat in quam quis, vulputate luctus neque. Sed ultricies eget augue quis hendrerit. Nullam quis nisi sit amet velit pharetra lobortis ac eget magna. Phasellus varius turpis quis quam vulputate, sed ultricies ex gravida. Suspendisse leo ipsum, porttitor sed ullamcorper id, pretium vel urna. Donec sit amet mauris leo. Sed nibh odio, lacinia eu condimentum eu, accumsan id elit. Sed porttitor pretium ipsum, et lacinia quam faucibus fringilla. Vivamus a augue maximus, gravida ante eget, pulvinar est. Nulla laoreet feugiat elit, eu euismod mauris volutpat ut.',
      },
    ],
    price: 20.0,
    inStock: true,
    SKU: 'CS',
    variationAttributes: [
      {
        type: 'colour',
        options: [1, 2, 3],
      },
      {
        type: 'size',
        options: [4, 5, 6],
      },
    ],
    variations: [
      {
        id: 1001,
        colourId: 1,
        sizeId: 4,
        price: 20.0,
        stock: 5,
        SKU: 'CS-BLACK-S',
      },
      {
        id: 1002,
        colourId: 1,
        sizeId: 5,
        price: 22.5,
        stock: 15,
        SKU: 'CS-BLACK-M',
      },
      {
        id: 1003,
        colourId: 1,
        sizeId: 6,
        price: 25.0,
        stock: 15,
        SKU: 'CS-BLACK-L',
      },
      {
        id: 1004,
        colourId: 2,
        sizeId: 4,
        price: 20.0,
        stock: 5,
        SKU: 'CS-GREEN-S',
      },
      {
        id: 1005,
        colourId: 2,
        sizeId: 5,
        price: 22.5,
        stock: 5,
        SKU: 'CS-GREEN-M',
      },
      {
        id: 1006,
        colourId: 3,
        sizeId: 4,
        price: 20.0,
        stock: 5,
        SKU: 'CS-RED-S',
      },
    ],
    reviewCount: 2,
    averageReview: 5,
    relatedProducts: [10, 3, 2],
  };

  const mockCategory = {
    id: 6,
    name: 'Sweaters',
    slug: 'sweaters',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
  };

  const mockTags = [
    {
      id: 4,
      name: 'Clothing',
      slug: 'clothing',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 5,
      name: 'Cozy',
      slug: 'cozy',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
    {
      id: 14,
      name: 'Winter',
      slug: 'winter',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque nibh enim, quis euismod enim lacinia nec. Phasellus quam diam, semper in erat eu, efficitur molestie purus. Sed a elementum mi. Sed interdum mattis risus, sit amet eleifend ligula luctus ut. Sed ullamcorper lorem aliquam, tincidunt lorem et, ultrices est.',
    },
  ];

  const mockAttributes = [
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

  beforeEach(() => {
    vi.clearAllMocks();

    getCategoryById.mockResolvedValue(mockCategory);
    getTagsArray.mockResolvedValue(mockTags);
    getAttributeArray.mockResolvedValue(mockAttributes);
  });

  test('renders title', async () => {
    render(
      <MemoryRouter>
        <Summary singleProduct={mockProduct} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/product summary/i)).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: /cozy sweater/i })).toBeInTheDocument();
    });
  });

  test('renders rating', async () => {
    render(
      <MemoryRouter>
        <Summary singleProduct={mockProduct} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByLabelText(/5 out of 5 stars/i)).toBeInTheDocument();
    });
  });

  test('renders short description', async () => {
    render(
      <MemoryRouter>
        <Summary singleProduct={mockProduct} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/aenean sollicitudin/i)).toBeInTheDocument();
    });
  });

  test('renders price', async () => {
    render(
      <MemoryRouter>
        <Summary singleProduct={mockProduct} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('£20.00')).toBeInTheDocument();
    });
  });

  test('renders SKU', async () => {
    render(
      <MemoryRouter>
        <Summary singleProduct={mockProduct} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/SKU/i)).toBeInTheDocument();
    });
  });

  test('renders category when data is fetched', async () => {
    render(
      <MemoryRouter>
        <Summary singleProduct={mockProduct} />
      </MemoryRouter>
    );

    const category = await screen.findByText(/category/i);

    expect(category).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sweaters/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sweaters/i })).toHaveAttribute('href', '/product-category/sweaters');
  });

  test('renders tags when data is fetched', async () => {
    render(
      <MemoryRouter>
        <Summary singleProduct={mockProduct} />
      </MemoryRouter>
    );

    const tags = await screen.findByText(/tags/i);
    expect(tags).toBeInTheDocument();

    const tagsList = screen.getAllByRole('listitem');
    expect(tagsList).toHaveLength(3);
    expect(screen.getByRole('link', { name: /clothing/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /clothing/i })).toHaveAttribute('href', '/product-tag/clothing');
  });

  test('renders add to cart form for products in stock', async () => {
    render(
      <MemoryRouter>
        <Summary singleProduct={mockProduct} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByRole('form', { name: /add to cart/i })).toBeInTheDocument();
    });
  });

  test('renders out of stock message for products out of stock', async () => {
    const mockOutOfStock = { ...mockProduct, inStock: false };

    render(
      <MemoryRouter>
        <Summary singleProduct={mockOutOfStock} />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
    });
  });
});
