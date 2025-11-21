export default function ListItem({ tabName, activeTab, setActiveTab, singleProduct }) {
  const activeBgColorClass = activeTab === tabName ? 'bg-pearl-bush' : 'bg-pampas hover:bg-pearl-bush';

  return (
    <li>
      <button
        role="tab"
        aria-selected={activeTab === tabName}
        aria-controls={`${tabName}-panel`}
        className={`flex cursor-pointer gap-x-2 px-7.5 py-4 transition-colors duration-300 ease-in-out ${activeBgColorClass}`}
        onClick={() => setActiveTab(tabName)}
      >
        <span className="flex gap-x-1 text-xs tracking-xwide text-shark uppercase">
          {tabName}
          {tabName === 'reviews' && <span>({singleProduct.reviewCount || 0})</span>}
        </span>
      </button>
    </li>
  );
}
