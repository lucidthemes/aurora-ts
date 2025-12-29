import { useState } from 'react';
import type { Dispatch, SetStateAction, ChangeEventHandler, KeyboardEventHandler, FormEventHandler } from 'react';

import type { Product } from '@typings/products/product';
import type { Review } from '@typings/products/review';
import { dateFormat } from '@utils/formatters';

interface ReviewFormData {
  rating: number;
  review: string;
  name: string;
}

type ReviewFormValidation = {
  [K in keyof ReviewFormData]: boolean;
};

type ReviewFormErrors = {
  [K in keyof ReviewFormData]: string;
};

export default function useForm(product: Product, reviews: Review[], setReviews: Dispatch<SetStateAction<Review[]>>) {
  const [reviewFormData, setReviewFormData] = useState<ReviewFormData>({
    rating: 0,
    review: '',
    name: '',
  });

  const reviewFormValidation: ReviewFormValidation = {
    rating: true,
    review: true,
    name: true,
  };

  const [reviewFormErrors, setReviewFormErrors] = useState<ReviewFormErrors>({
    rating: '',
    review: '',
    name: '',
  });

  const handleFormChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setReviewFormData({
      ...reviewFormData,
      [name]: value,
    });
  };

  const handleFormKeyDown: KeyboardEventHandler<HTMLFormElement> = (e) => {
    const target = e.target as HTMLElement;
    const tag = target.tagName.toLowerCase();

    if (e.key === 'Enter' && !(tag === 'textarea' || tag === 'select' || (tag === 'button' && (target as HTMLButtonElement).type === 'submit'))) {
      e.preventDefault();
    }
  };

  const validateFormData = () => {
    let formErrors = { ...reviewFormErrors };
    let formIsValid = true;

    for (const field in reviewFormData) {
      const key = field as keyof ReviewFormData;

      const value = reviewFormData[key];
      const required = reviewFormValidation[key];

      if (!value && required) {
        formErrors[key] = `Please enter a ${key}`;
        formIsValid = false;
      } else {
        formErrors[key] = '';
      }
    }

    setReviewFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const isFormValid = validateFormData();

    if (isFormValid) {
      const newReview: Review = {
        id: reviews.length + 1,
        productId: product.id,
        rating: reviewFormData.rating,
        date: dateFormat(new Date().toISOString()),
        review: reviewFormData.review,
        name: reviewFormData.name,
        status: 'approved',
      };

      const updatedReviews: Review[] = [...reviews, newReview];

      setReviews(updatedReviews);

      setReviewFormData({
        rating: 0,
        review: '',
        name: '',
      });
    }
  };

  return { reviewFormData, reviewFormErrors, handleFormChange, handleFormKeyDown, handleFormSubmit };
}
