import useSearchForm from './useSearchForm';
import Input from '@components/Form/Input';
import Button from '@components/UI/Button';

export default function SearchForm({ term = '', location = 'page', overlayInputRef = null, headerSearchActive = null, handleHeaderSearchActive = null }) {
  const { searchFormTerm, searchFormError, handleFormChange, handleFormSubmit } = useSearchForm(term, location, headerSearchActive, handleHeaderSearchActive);

  const searchFormClasses = location === 'page' ? 'justify-between' : location === 'widget' ? 'flex-col' : '';
  const searchInputClasses = location === 'header' ? 'bg-transparent! !border-0 !text-4xl !text-white text-center placeholder:text-white' : '';

  return (
    <form onSubmit={handleFormSubmit} className={`flex gap-6 ${searchFormClasses}`} aria-label="Search" noValidate>
      <Input
        type="text"
        name="search"
        value={searchFormTerm}
        onChange={handleFormChange}
        placeholder="Type to search..."
        required={true}
        ref={overlayInputRef}
        className={searchInputClasses}
        label="Type to search..."
        error={searchFormError}
      />
      {location !== 'header' && (
        <Button type="submit" className="max-h-12.5">
          Search
        </Button>
      )}
    </form>
  );
}
