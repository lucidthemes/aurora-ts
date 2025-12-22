import { useState } from 'react';
import type { ChangeEventHandler, FormEventHandler } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useSearchForm(
  term: string,
  location: 'page' | 'widget' | 'header',
  headerSearchActive: boolean = false,
  handleHeaderSearchActive: () => void = () => {}
) {
  const [searchFormTerm, setSearchFormTerm] = useState(term || '');
  const [searchFormError, setSearchFormError] = useState('');
  const navigate = useNavigate();

  const handleFormChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.target;
    setSearchFormTerm(value);
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const trimmedSearchTerm = searchFormTerm.trim();

    if (trimmedSearchTerm) {
      setSearchFormError('');
      navigate(`/search/${trimmedSearchTerm}`);

      if (location === 'header' && headerSearchActive) {
        handleHeaderSearchActive();
      }
    } else {
      if (location !== 'header') {
        setSearchFormError('Please enter a search term');
      }
    }
  };

  return { searchFormTerm, searchFormError, handleFormChange, handleFormSubmit };
}
