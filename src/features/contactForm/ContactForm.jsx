import useContactForm from './useContactForm';
import Notification from '@components/notification';
import Input from '@components/Form/Input';
import Textarea from '@components/Form/Textarea';
import Button from '@components/UI/Button';

export default function ContactForm() {
  const { contactFormData, contactFormErrors, contactFormNotification, resetContactFormNotification, handleFormChange, handleFormKeyDown, handleFormSubmit } =
    useContactForm();

  return (
    <div className="mt-10 flex flex-col gap-y-10 rounded-md bg-white p-5 md:p-7.5 lg:p-10">
      {contactFormNotification.type !== '' && (
        <Notification
          type={contactFormNotification.type}
          message={contactFormNotification.message}
          duration={5000}
          onClose={() => resetContactFormNotification()}
        />
      )}
      <form onKeyDown={handleFormKeyDown} onSubmit={handleFormSubmit} className="flex flex-col gap-y-6" aria-label="Contact us" noValidate>
        <Input
          type="text"
          name="name"
          value={contactFormData.name}
          onChange={handleFormChange}
          placeholder="Name"
          required={true}
          label="Name"
          error={contactFormErrors.name}
        />
        <Input
          type="email"
          name="email"
          value={contactFormData.email}
          onChange={handleFormChange}
          placeholder="Email address"
          required={true}
          label="Email address"
          error={contactFormErrors.email}
        />
        <Input
          type="text"
          name="subject"
          value={contactFormData.subject}
          onChange={handleFormChange}
          placeholder="Subject"
          required={true}
          label="Subject"
          error={contactFormErrors.subject}
        />
        <Textarea
          name="message"
          value={contactFormData.message}
          onChange={handleFormChange}
          placeholder="Message"
          required={true}
          label="Message"
          error={contactFormErrors.message}
        />
        <Button type="submit" className="max-w-fit">
          Send message
        </Button>
      </form>
    </div>
  );
}
