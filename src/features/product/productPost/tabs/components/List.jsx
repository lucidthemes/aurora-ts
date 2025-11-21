import ListItem from './ListItem';

export default function List({ activeTab, setActiveTab, singleProduct }) {
  return (
    <ul className="flex w-full flex-col overflow-hidden rounded-md md:w-max md:flex-row">
      <ListItem tabName="description" activeTab={activeTab} setActiveTab={setActiveTab} />
      <ListItem tabName="reviews" activeTab={activeTab} setActiveTab={setActiveTab} singleProduct={singleProduct} />
    </ul>
  );
}
