import Select from '@components/Form/Select';

export default function Sort({ sortOption, handleSortChange }) {
  const sortOptions = [
    { value: 'date', text: 'Sort by latest' },
    { value: 'rating-desc', text: 'Sort by rating: High to low' },
    { value: 'rating-asc', text: 'Sort by rating: low to high' },
    { value: 'price-desc', text: 'Sort by price: High to low' },
    { value: 'price-asc', text: 'Sort by price: low to high' },
  ];

  return (
    <div>
      <Select name="sort" options={sortOptions} value={sortOption} onChange={handleSortChange} autoComplete="off" required={false} label="Sort products" />
    </div>
  );
}
