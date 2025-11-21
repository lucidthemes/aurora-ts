import useForm from '../../hooks/reviews/useForm';
import SectionHeading from '@components/UI/SectionHeading';
import FormStars from './FormStars';
import Textarea from '@components/Form/Textarea';
import Input from '@components/Form/Input';
import Button from '@components/UI/Button';

export default function Form({ singleProduct, reviews, setReviews }) {
  const { reviewFormData, reviewFormErrors, handleFormChange, handleFormKeyDown, handleFormSubmit } = useForm(singleProduct, reviews, setReviews);

  return (
    <div>
      <SectionHeading heading="Add a review" headingLevel={3} />
      <form onKeyDown={handleFormKeyDown} onSubmit={handleFormSubmit} className="flex flex-col gap-y-6" aria-label="Add review" noValidate>
        <FormStars reviewFormData={reviewFormData} error={reviewFormErrors.rating} handleFormChange={handleFormChange} />
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
