import type { Dispatch, SetStateAction, RefObject } from 'react';

import type { Product } from '@typings/products/product';
import type { ActiveTab } from '@typings/products/tab';

import List from './components/List';
import Description from './components/Description';
import Reviews from './components/reviews';

interface TabsProps {
  product: Product;
  activeTab: ActiveTab;
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
  tabsRef: RefObject<HTMLDivElement | null>;
}

export default function Tabs({ product, activeTab, setActiveTab, tabsRef }: TabsProps) {
  return (
    <div className="flex flex-col gap-y-10 rounded-md bg-white p-5 md:p-7.5 lg:p-10" role="tablist" ref={tabsRef}>
      <List product={product} activeTab={activeTab} setActiveTab={setActiveTab} />
      <Description product={product} activeTab={activeTab} />
      <Reviews product={product} activeTab={activeTab} />
    </div>
  );
}
