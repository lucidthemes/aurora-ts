import { Link } from 'react-router-dom';

import type { SummaryData } from '@typings/products/summary';

interface MetaProps {
  summaryData: SummaryData;
}

export default function Meta({ summaryData }: MetaProps) {
  return (
    <div className="flex flex-col gap-y-2.5">
      {summaryData.SKU && <p>SKU: {summaryData.SKU}</p>}
      {summaryData.category && (
        <p>
          Category:{' '}
          <Link to={`/product-category/${summaryData.category.slug}`} className="transition-colors duration-300 ease-in-out hover:text-shark focus:text-shark">
            {summaryData.category.name}
          </Link>
        </p>
      )}
      {Array.isArray(summaryData.tags) && summaryData.tags.length > 0 && (
        <div className="flex items-center gap-x-1">
          <p>Tags:</p>
          <ul className="flex gap-x-1" aria-label="Product tags">
            {summaryData.tags.map((tag) => (
              <li key={tag.id} className="after:text-boulder after:content-[','] last:after:content-['']">
                <Link
                  to={`/product-tag/${tag.slug}`}
                  className="text-lg text-boulder transition-colors duration-300 ease-in-out hover:text-shark focus:text-shark"
                >
                  {tag.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
