import PageContent from '@components/UI/PageContent';

export default function Description({ activeTab, singleProduct }) {
  const tabVisibleClass = activeTab === 'description' ? 'block' : 'hidden';

  return (
    <div className={tabVisibleClass} role="tabpanel" aria-labelledby="description-tab">
      {singleProduct.description ? (
        <PageContent content={singleProduct.description} />
      ) : (
        <p className="rounded-sm bg-pampas p-5 text-center">No description found</p>
      )}
    </div>
  );
}
