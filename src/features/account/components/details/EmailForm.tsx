import { Customer } from '@typings/shop/customer';
import useEmailForm from '../../hooks/details/useEmailForm';
import Input from '@components/Form/Input';
import Button from '@components/UI/Button';

interface EmailFormProps {
  loggedInUser: Customer | null;
  handleUserUpdate: <K extends 'email' | 'shipping' | 'billing'>(section: K, data: Customer[K]) => void;
  handleEmailEditShow: () => void;
}

export default function EmailForm({ loggedInUser, handleUserUpdate, handleEmailEditShow }: EmailFormProps) {
  const { emailFormData, emailFormError, handleFormChange, handleFormSubmit } = useEmailForm(loggedInUser, handleUserUpdate, handleEmailEditShow);

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-5" aria-label="Email address" noValidate>
      <Input
        type="email"
        name="email"
        value={emailFormData || ''}
        onChange={handleFormChange}
        placeholder="Email address"
        autoComplete="email"
        required={true}
        label="Email address"
        error={emailFormError}
      />
      <Button type="submit" className="max-w-fit">
        Save changes
      </Button>
    </form>
  );
}
