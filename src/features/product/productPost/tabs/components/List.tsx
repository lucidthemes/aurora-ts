import type { Dispatch, SetStateAction } from 'react';

import type { Product } from '@typings/products/product';
import type { ActiveTab } from '@typings/products/tab';

import ListItem from './ListItem';

interface ListProps {
  product: Product;
  activeTab: ActiveTab;
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
}

export default function List({ product, activeTab, setActiveTab }: ListProps) {
  return (
    <ul className="flex w-full flex-col overflow-hidden rounded-md md:w-max md:flex-row">
      <ListItem tabName="description" activeTab={activeTab} setActiveTab={setActiveTab} />
      <ListItem tabName="reviews" activeTab={activeTab} setActiveTab={setActiveTab} product={product} />
    </ul>
  );
}
