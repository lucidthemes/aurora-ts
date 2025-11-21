import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useSearchForm(term, location, headerSearchActive, handleHeaderSearchActive) {
  const [searchFormTerm, setSearchFormTerm] = useState('');
  const [searchFormError, setSearchFormError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!term) return;

    setSearchFormTerm(term);
  }, [term]);

  const handleFormChange = (e) => {
    const { value } = e.target;
    setSearchFormTerm(value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const trimmedSearchTerm = searchFormTerm.trim();

    if (trimmedSearchTerm) {
      setSearchFormTerm('');
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
