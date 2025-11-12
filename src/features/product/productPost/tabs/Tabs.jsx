import List from './components/List';
import Description from './components/description';
import Reviews from './components/reviews';

export default function Tabs({ singleProduct, activeTab, setActiveTab, tabsRef }) {
  return (
    <div className="flex flex-col gap-y-10 rounded-md bg-white p-5 md:p-7.5 lg:p-10" role="tablist" ref={tabsRef}>
      <List activeTab={activeTab} setActiveTab={setActiveTab} singleProduct={singleProduct} />
      <Description activeTab={activeTab} singleProduct={singleProduct} />
      <Reviews activeTab={activeTab} singleProduct={singleProduct} />
    </div>
  );
}
