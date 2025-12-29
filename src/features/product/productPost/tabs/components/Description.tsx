import PageContent from '@components/UI/PageContent';
import type { Product } from '@typings/products/product';
import type { ActiveTab } from '@typings/products/tab';

interface DescriptionProps {
  product: Product;
  activeTab: ActiveTab;
}

export default function Description({ product, activeTab }: DescriptionProps) {
  const tabVisibleClass = activeTab === 'description' ? 'block' : 'hidden';

  return (
    <div className={tabVisibleClass} role="tabpanel" aria-labelledby="description-tab">
      {product.description ? <PageContent content={product.description} /> : <p className="rounded-sm bg-pampas p-5 text-center">No description found</p>}
    </div>
  );
}
