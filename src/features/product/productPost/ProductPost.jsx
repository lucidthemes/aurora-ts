import useProductPost from './useProductPost';
import useNotification from './notification/useNotification';
import Notification from './notification';
import Breadcrumb from './breadcrumb';
import Gallery from './gallery';
import Summary from './summary';
import Tabs from './tabs';
import Related from './related';

export default function ProductPost({ singleProduct }) {
  const { activeTab, setActiveTab, tabsRef } = useProductPost();
  const { addCartNotification, setAddCartNotification } = useNotification();

  return (
    <>
      <Notification addCartNotification={addCartNotification} />
      <div className="flex flex-col gap-y-4 rounded-md bg-white p-5 md:p-7.5 lg:p-10">
        <Breadcrumb singleProduct={singleProduct} />
        <div className="flex flex-col gap-10 lg:flex-row">
          <div className="lg:basis-[40%]">
            <Gallery singleProduct={singleProduct} />
          </div>
          <div className="lg:basis-[60%]">
            <Summary singleProduct={singleProduct} setActiveTab={setActiveTab} tabsRef={tabsRef} setAddCartNotification={setAddCartNotification} />
          </div>
        </div>
      </div>
      <Tabs singleProduct={singleProduct} activeTab={activeTab} setActiveTab={setActiveTab} tabsRef={tabsRef} />
      <Related singleProduct={singleProduct} />
    </>
  );
}
