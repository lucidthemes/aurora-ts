import type { Product } from '@typings/products/product';

import useProductPost from './useProductPost';
import useNotification from './notification/useNotification';
import Notification from './notification';
import Breadcrumb from './breadcrumb';
import Gallery from './gallery';
import Summary from './summary';
import Tabs from './tabs';
import Related from './related';

interface ProductPostProps {
  product: Product;
}

export default function ProductPost({ product }: ProductPostProps) {
  const { activeTab, setActiveTab, tabsRef } = useProductPost();
  const { addCartNotification, setAddCartNotification } = useNotification();

  return (
    <>
      <Notification addCartNotification={addCartNotification} />
      <div className="flex flex-col gap-y-4 rounded-md bg-white p-5 md:p-7.5 lg:p-10">
        <Breadcrumb product={product} />
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="lg:basis-[40%]">
            <Gallery singleProduct={product} />
          </div>
          <div className="lg:basis-[60%]">
            <Summary singleProduct={product} setActiveTab={setActiveTab} tabsRef={tabsRef} setAddCartNotification={setAddCartNotification} />
          </div>
        </div>
      </div>
      <Tabs singleProduct={product} activeTab={activeTab} setActiveTab={setActiveTab} tabsRef={tabsRef} />
      <Related singleProduct={product} />
    </>
  );
}
