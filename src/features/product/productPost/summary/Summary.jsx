import useSummary from './hooks/useSummary';
import Rating from './components/Rating';
import AddCartForm from './components/addCartForm';
import Meta from './components/Meta';

export default function Summary({ singleProduct, setActiveTab, tabsRef, setAddCartNotification }) {
  const { summaryData, setSummaryData } = useSummary(singleProduct, setActiveTab);

  return (
    <div className="flex flex-col gap-y-5 rounded-md bg-pampas p-5 md:p-7.5 lg:p-10" role="region" aria-label="Product summary">
      <h1>{singleProduct.title}</h1>
      {singleProduct.averageReview && <Rating singleProduct={singleProduct} setActiveTab={setActiveTab} tabsRef={tabsRef} />}
      {singleProduct.shortDescription && <p>{singleProduct.shortDescription}</p>}
      {summaryData.price && <span className="text-xl text-boulder">£{summaryData.price.toFixed(2)}</span>}
      {singleProduct.inStock ? (
        <AddCartForm singleProduct={singleProduct} summaryData={summaryData} setSummaryData={setSummaryData} setAddCartNotification={setAddCartNotification} />
      ) : (
        <p className="rounded-sm bg-pearl-bush p-5 text-center">This product is currently out of stock</p>
      )}
      <Meta summaryData={summaryData} />
    </div>
  );
}
