import { useState } from 'react';
import { dateFormat } from '@utils/formatters';

export default function useForm(singleProduct, reviews, setReviews) {
  const [reviewFormData, setReviewFormData] = useState({
    rating: '',
    review: '',
    name: '',
  });

  const reviewFormValidation = {
    rating: true,
    review: true,
    name: true,
  };

  const [reviewFormErrors, setReviewFormErrors] = useState({
    rating: '',
    review: '',
    name: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setReviewFormData({
      ...reviewFormData,
      [name]: value,
    });
  };

  const handleFormKeyDown = (e) => {
    const tag = e.target.tagName.toLowerCase();

    if (e.key === 'Enter' && !(tag === 'textarea' || tag === 'select' || (tag === 'button' && type === 'submit'))) {
      e.preventDefault();
    }
  };

  const validateFormData = () => {
    let formErrors = { ...reviewFormErrors };
    let formIsValid = true;

    for (let field in reviewFormData) {
      const value = reviewFormData[field];
      const required = reviewFormValidation[field];

      if (!value && required) {
        formErrors[field] = `Please enter a ${field}`;
        formIsValid = false;
      } else {
        formErrors[field] = '';
      }
    }

    setReviewFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const isFormValid = validateFormData();

    if (isFormValid) {
      const newReview = {
        id: reviews.length + 1,
        productId: singleProduct.id,
        rating: reviewFormData.rating,
        date: dateFormat(new Date()),
        review: reviewFormData.review,
        name: reviewFormData.name,
      };

      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);

      setReviewFormData({
        rating: '',
        review: '',
        name: '',
      });
    }
  };

  return { reviewFormData, reviewFormErrors, handleFormChange, handleFormKeyDown, handleFormSubmit };
}
