import type { Dispatch, SetStateAction, RefObject } from 'react';

import type { Product } from '@typings/products/product';
import type { ActiveTab } from '@typings/products/tab';

import useSummary from './hooks/useSummary';
import Rating from './components/Rating';
import AddCartForm from './components/addCartForm';
import Meta from './components/Meta';

interface SummaryProps {
  product: Product;
  setActiveTab: Dispatch<SetStateAction<ActiveTab>>;
  tabsRef: RefObject<HTMLDivElement | null>;
  setAddCartNotification: Dispatch<SetStateAction<string>>;
}

export default function Summary({ product, setActiveTab, tabsRef, setAddCartNotification }: SummaryProps) {
  const { summaryData, setSummaryData } = useSummary(product);

  return (
    <div className="flex flex-col gap-y-5 rounded-md bg-pampas p-5 md:p-7.5 lg:p-10" role="region" aria-label="Product summary">
      <h1>{product.title}</h1>
      {product.averageReview && <Rating product={product} setActiveTab={setActiveTab} tabsRef={tabsRef} />}
      {product.shortDescription && <p>{product.shortDescription}</p>}
      {summaryData.price && <span className="text-xl text-boulder">£{summaryData.price.toFixed(2)}</span>}
      {product.inStock ? (
        <AddCartForm product={product} summaryData={summaryData} setSummaryData={setSummaryData} setAddCartNotification={setAddCartNotification} />
      ) : (
        <p className="rounded-sm bg-pearl-bush p-5 text-center">This product is currently out of stock</p>
      )}
      <Meta summaryData={summaryData} />
    </div>
  );
}
