import Notification from '@components/Notification';
import Input from '@components/Form/Input';
import Button from '@components/UI/Button';

import useNewsletterForm from './useNewsletterForm';

interface NewsletterFormProps {
  layout?: string;
}

export default function NewsletterForm({ layout = 'page' }: NewsletterFormProps) {
  const { newsletterFormEmail, newsletterFormError, newsletterFormNotification, resetNewsletterFormNotification, handleFormChange, handleFormSubmit } =
    useNewsletterForm();

  const newsletterFormClasses = layout === 'widget' ? 'flex-col' : 'flex-col lg:flex-row';

  return (
    <div className="flex flex-col gap-y-5">
      {newsletterFormNotification.type !== '' && (
        <Notification
          type={newsletterFormNotification.type}
          message={newsletterFormNotification.message}
          duration={5000}
          onClose={() => resetNewsletterFormNotification()}
        />
      )}
      <form onSubmit={handleFormSubmit} className={`flex gap-6 ${newsletterFormClasses}`} aria-label="Newsletter subscribe" noValidate>
        <Input
          type="email"
          name="email"
          value={newsletterFormEmail}
          onChange={handleFormChange}
          placeholder="Email address"
          required={true}
          label="Email address"
          error={newsletterFormError}
        />
        <Button type="submit" className="max-h-12.5">
          Subscribe
        </Button>
      </form>
    </div>
  );
}
