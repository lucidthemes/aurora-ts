import { render, screen, within, fireEvent } from '@testing-library/react';
import AddCartForm from '../../../summary/components/addCartForm';

vi.mock('@features/cart/CartContext', () => ({
  useCartContext: vi.fn(),
}));

vi.mock('@server/products/getAttribute', () => ({
  getAttributeArray: vi.fn(),
}));

import { useCartContext } from '@features/cart/CartContext';
import { getAttributeArray } from '@server/products/getAttribute';
import { MemoryRouter } from 'react-router-dom';

describe('AddCartForm component', () => {
  const mockProductWithVariations = {
    id: 1,
    title: 'Cozy sweater',
    price: 20,
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
        price: 20,
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
        price: 25,
        stock: 15,
        SKU: 'CS-BLACK-L',
      },
      {
        id: 1004,
        colourId: 2,
        sizeId: 4,
        price: 20,
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
        price: 20,
        stock: 5,
        SKU: 'CS-RED-S',
      },
    ],
  };

  const mockProductVariations = [
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

  const mockupSummaryDataForProductWithVariations = {
    price: 20,
    SKU: 'CS',
  };

  const mockProductNoVariations = {
    id: 4,
    title: 'Handmade bonnet',
    price: 20,
    inStock: true,
    stock: 5,
    SKU: 'HB',
  };

  const mockupSummaryDataForProductNoVariations = {
    price: 20,
    maxQuantity: 5,
    SKU: 'HB',
  };

  const setSummaryDataMock = vi.fn();

  const setAddCartNotificationMock = vi.fn();

  const addCartItemMock = vi.fn();

  useCartContext.mockReturnValue({
    addCartItem: addCartItemMock,
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders form with select fields for variations when variation data is fetched', async () => {
    getAttributeArray.mockResolvedValue(mockProductVariations);

    render(
      <MemoryRouter>
        <AddCartForm singleProduct={mockProductWithVariations} summaryData={mockupSummaryDataForProductWithVariations} setSummaryData={setSummaryDataMock} />
      </MemoryRouter>
    );

    const form = await screen.findByRole('form', { name: /add to cart/i });
    expect(form).toBeInTheDocument();

    const colourVariation = await screen.findByRole('combobox', { name: /colour/i });
    expect(colourVariation).toBeInTheDocument();
    expect(colourVariation).toHaveLength(4);
    expect(within(colourVariation).getByText(/black/i)).toBeInTheDocument();
    expect(within(colourVariation).getByText(/green/i)).toBeInTheDocument();
    expect(within(colourVariation).getByText(/red/i)).toBeInTheDocument();

    const sizeVariation = await screen.findByRole('combobox', { name: /size/i });
    expect(sizeVariation).toBeInTheDocument();
    expect(sizeVariation).toHaveLength(4);
    expect(within(sizeVariation).getByText(/small/i)).toBeInTheDocument();
    expect(within(sizeVariation).getByText(/medium/i)).toBeInTheDocument();
    expect(within(sizeVariation).getByText(/large/i)).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /decrease quantity/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /product quantity/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /increase quantity/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).toHaveClass('cursor-not-allowed!');
  });

  test('renders form with no variations', async () => {
    render(
      <MemoryRouter>
        <AddCartForm singleProduct={mockProductNoVariations} summaryData={mockupSummaryDataForProductNoVariations} setSummaryData={setSummaryDataMock} />
      </MemoryRouter>
    );

    await screen.findByRole('form', { name: /add to cart/i });

    expect(screen.queryByRole('combobox', { name: /colour/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('combobox', { name: /size/i })).not.toBeInTheDocument();

    expect(screen.getByRole('button', { name: /decrease quantity/i })).toBeInTheDocument();
    expect(screen.getByRole('spinbutton', { name: /product quantity/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /increase quantity/i })).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add to cart/i })).not.toHaveClass('cursor-not-allowed!');
  });

  test('adds product with variation to the cart', async () => {
    getAttributeArray.mockResolvedValue(mockProductVariations);

    render(
      <MemoryRouter>
        <AddCartForm
          singleProduct={mockProductWithVariations}
          summaryData={mockupSummaryDataForProductNoVariations}
          setSummaryData={setSummaryDataMock}
          setAddCartNotification={setAddCartNotificationMock}
        />
      </MemoryRouter>
    );

    await screen.findByRole('form', { name: /add to cart/i });

    const colourVariation = await screen.findByRole('combobox', { name: /colour/i });
    expect(colourVariation).toBeInTheDocument();
    fireEvent.change(colourVariation, { target: { value: '1' } });

    const sizeVariation = await screen.findByRole('combobox', { name: /size/i });
    expect(sizeVariation).toBeInTheDocument();
    fireEvent.change(sizeVariation, { target: { value: '4' } });

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    // singleProduct.id, addCartFormData.variationId, addCartFormData.quantity
    expect(addCartItemMock).toHaveBeenCalledWith(1, 1001, 1);

    expect(setAddCartNotificationMock).toHaveBeenCalledWith('Cozy sweater has been added to the cart');
  });

  test('adds product without variation to the cart', async () => {
    render(
      <MemoryRouter>
        <AddCartForm
          singleProduct={mockProductNoVariations}
          summaryData={mockupSummaryDataForProductNoVariations}
          setSummaryData={setSummaryDataMock}
          setAddCartNotification={setAddCartNotificationMock}
        />
      </MemoryRouter>
    );

    await screen.findByRole('form', { name: /add to cart/i });

    fireEvent.click(screen.getByRole('button', { name: /add to cart/i }));

    // singleProduct.id, null (no variation), addCartFormData.quantity
    expect(addCartItemMock).toHaveBeenCalledWith(4, null, 1);

    expect(setAddCartNotificationMock).toHaveBeenCalledWith('Handmade bonnet has been added to the cart');
  });
});
