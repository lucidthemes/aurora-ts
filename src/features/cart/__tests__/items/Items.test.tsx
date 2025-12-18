import { render, screen, within, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@features/cart/CartContext', () => ({
  useCartContext: vi.fn(),
}));

vi.mock('@server/products/getAttribute', () => ({
  getAttributeMap: vi.fn(),
}));

import { useCartContext } from '@features/cart/CartContext';
import { getAttributeMap } from '@server/products/getAttribute';
import type { Item } from '@typings/cart/item';
import type { Attribute } from '@typings/products/attribute';

import Items from '../../components/items';

describe('Items component', () => {
  const updateCartItemMock = vi.fn();
  const removeCartItemMock = vi.fn();

  vi.mocked(useCartContext).mockReturnValue({
    updateCartItem: updateCartItemMock,
    removeCartItem: removeCartItemMock,
  });

  const mockItems: Item[] = [
    {
      productId: 1,
      title: 'Cozy sweater',
      slug: 'cozy-sweater',
      image: '/images/products/product-1.jpg',
      price: 20,
      variation: {
        id: 1001,
        colourId: 1,
        sizeId: 4,
        price: 20,
        stock: 5,
        SKU: 'CS-BLACK-S',
      },
      quantity: 1,
    },
    {
      productId: 2,
      title: 'Autumn beanie',
      slug: 'autumn-beanie',
      image: '/images/products/product-5.jpg',
      price: 20,
      variation: {
        id: 2002,
        colourId: 2,
        price: 20,
        stock: 5,
        SKU: 'AB-GREEN',
      },
      quantity: 1,
    },
    {
      productId: 4,
      title: 'Handmade bonnet',
      slug: 'handmade-bonnet',
      image: '/images/products/product-10.jpg',
      stock: 5,
      price: 20,
      quantity: 1,
    },
  ];

  const mockAttributeMap: Record<number, Attribute> = {
    1: {
      id: 1,
      name: 'Black',
      slug: 'black',
      type: 'colour',
    },
    2: {
      id: 2,
      name: 'Green',
      slug: 'green',
      type: 'colour',
    },
    4: {
      id: 4,
      name: 'Small',
      slug: 'small',
      type: 'size',
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders items', async () => {
    vi.mocked(getAttributeMap).mockResolvedValue(mockAttributeMap);

    render(
      <MemoryRouter>
        <Items items={mockItems} updateCartItem={updateCartItemMock} removeCartItem={removeCartItemMock} />
      </MemoryRouter>
    );

    const itemList = await screen.findByRole('list', { name: /cart items/i });
    expect(itemList).toBeInTheDocument();

    const listItems = itemList.querySelectorAll(':scope > li');
    expect(listItems).toHaveLength(3);
  });

  test('renders item information', async () => {
    vi.mocked(getAttributeMap).mockResolvedValue(mockAttributeMap);

    render(
      <MemoryRouter>
        <Items items={mockItems} updateCartItem={updateCartItemMock} removeCartItem={removeCartItemMock} />
      </MemoryRouter>
    );

    const itemList = await screen.findByRole('list', { name: /cart items/i });
    expect(itemList).toBeInTheDocument();

    const firstListItem = itemList.querySelector(':scope > li:first-child') as HTMLElement;
    expect(firstListItem).toBeInTheDocument();

    expect(within(firstListItem).getByRole('img', { name: /cozy sweater/i })).toBeInTheDocument();

    expect(within(firstListItem).getByRole('heading', { name: /cozy sweater/i })).toBeInTheDocument();

    expect(within(firstListItem).getByText(/£20.00/i)).toBeInTheDocument();

    const variations = await within(firstListItem).findByRole('list', { name: /selected variations/i });
    expect(variations).toBeInTheDocument();
    expect(within(variations).getByText(/colour/i)).toBeInTheDocument();
    expect(within(variations).getByText(/black/i)).toBeInTheDocument();
    expect(within(variations).getByText(/size/i)).toBeInTheDocument();
    expect(within(variations).getByText(/small/i)).toBeInTheDocument();

    expect(within(firstListItem).getByRole('button', { name: /decrease quantity/i })).toBeInTheDocument();
    expect(within(firstListItem).getByRole('spinbutton', { name: /quantity/i })).toBeInTheDocument();
    expect(within(firstListItem).getByRole('button', { name: /increase quantity/i })).toBeInTheDocument();

    expect(within(firstListItem).getByRole('button', { name: /remove item/i })).toBeInTheDocument();
  });

  test('updates item quantity when quantity button clicked', async () => {
    vi.mocked(getAttributeMap).mockResolvedValue(mockAttributeMap);

    render(
      <MemoryRouter>
        <Items items={mockItems} updateCartItem={updateCartItemMock} removeCartItem={removeCartItemMock} />
      </MemoryRouter>
    );

    const itemList = await screen.findByRole('list', { name: /cart items/i });
    expect(itemList).toBeInTheDocument();

    const firstListItem = itemList.querySelector(':scope > li:first-child') as HTMLElement;
    expect(firstListItem).toBeInTheDocument();

    fireEvent.click(within(firstListItem).getByRole('button', { name: /increase quantity/i }));

    // productId, quantity, variationId
    expect(updateCartItemMock).toHaveBeenCalledWith(1, 2, 1001);
  });

  test('removes item when remove button clicked', async () => {
    vi.mocked(getAttributeMap).mockResolvedValue(mockAttributeMap);

    render(
      <MemoryRouter>
        <Items items={mockItems} updateCartItem={updateCartItemMock} removeCartItem={removeCartItemMock} />
      </MemoryRouter>
    );

    const itemList = await screen.findByRole('list', { name: /cart items/i });
    expect(itemList).toBeInTheDocument();

    const firstListItem = itemList.querySelector(':scope > li:first-child') as HTMLElement;
    expect(firstListItem).toBeInTheDocument();

    fireEvent.click(within(firstListItem).getByRole('button', { name: /remove item/i }));

    // productId, variationId
    expect(removeCartItemMock).toHaveBeenCalledWith(1, 1001);
  });
});
