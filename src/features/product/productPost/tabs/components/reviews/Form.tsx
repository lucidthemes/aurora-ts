import type { Dispatch, SetStateAction } from 'react';

import Textarea from '@components/Form/Textarea';
import Input from '@components/Form/Input';
import SectionHeading from '@components/UI/SectionHeading';
import Button from '@components/UI/Button';
import type { Product } from '@typings/products/product';
import type { Review } from '@typings/products/review';

import useForm from '../../hooks/reviews/useForm';
import FormStars from './FormStars';

interface FormProps {
  product: Product;
  reviews: Review[];
  setReviews: Dispatch<SetStateAction<Review[]>>;
}

export default function Form({ product, reviews, setReviews }: FormProps) {
  const { reviewFormData, reviewFormErrors, handleFormChange, handleFormKeyDown, handleFormSubmit } = useForm(product, reviews, setReviews);

  return (
    <div>
      <SectionHeading heading="Add a review" headingLevel="3" />
      <form onKeyDown={handleFormKeyDown} onSubmit={handleFormSubmit} className="flex flex-col gap-y-6" aria-label="Add review" noValidate>
        <FormStars rating={reviewFormData.rating} error={reviewFormErrors.rating} handleFormChange={handleFormChange} />
        <Textarea
          name="review"
          value={reviewFormData.review}
          onChange={handleFormChange}
          placeholder="Review"
          required={true}
          label="Review"
          error={reviewFormErrors.review}
        />
        <Input
          type="text"
          name="name"
          value={reviewFormData.name}
          onChange={handleFormChange}
          placeholder="Name"
          required={true}
          label="Name"
          error={reviewFormErrors.name}
        />
        <Button type="submit" className="max-w-fit">
          Post review
        </Button>
      </form>
    </div>
  );
}
