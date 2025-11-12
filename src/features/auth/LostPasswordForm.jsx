import useLostPasswordForm from './hooks/useLostPasswordForm';
import Notification from '@components/notification';
import Input from '@components/Form/Input';
import Button from '@components/UI/Button';

export default function LostPasswordForm() {
  const { lostPasswordFormEmail, lostPasswordFormError, lostPasswordFormNotification, resetLostPasswordFormNotification, handleFormChange, handleFormSubmit } =
    useLostPasswordForm();

  return (
    <div className="flex flex-col gap-y-5">
      {lostPasswordFormNotification.type !== '' && (
        <Notification
          type={lostPasswordFormNotification.type}
          message={lostPasswordFormNotification.message}
          duration={10000}
          onClose={() => resetLostPasswordFormNotification()}
        />
      )}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-6" aria-label="Lost password" noValidate>
        <Input
          type="email"
          name="email"
          value={lostPasswordFormEmail}
          onChange={handleFormChange}
          placeholder="Email address"
          required={true}
          label="Email address"
          error={lostPasswordFormError}
        />

        <Button type="submit" className="max-w-fit">
          Reset password
        </Button>
      </form>
    </div>
  );
}
