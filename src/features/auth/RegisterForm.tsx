import Notification from '@components/Notification';
import Input from '@components/Form/Input';
import Password from '@components/Form/Password';
import Button from '@components/UI/Button';
import { useAuthContext } from '@contexts/AuthContext';

import useRegisterForm from './hooks/useRegisterForm';

export default function RegisterForm() {
  const { handleRegister } = useAuthContext();

  const { registerFormData, registerFormErrors, registerFormNotification, resetRegisterFormNotification, handleFormChange, handleFormSubmit } =
    useRegisterForm(handleRegister);

  return (
    <div className="flex flex-col gap-y-5">
      {registerFormNotification.type !== '' && (
        <Notification
          type={registerFormNotification.type}
          message={registerFormNotification.message}
          duration={10000}
          onClose={() => resetRegisterFormNotification()}
        />
      )}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-6" aria-label="Register" noValidate>
        <Input
          type="email"
          name="email"
          value={registerFormData.email}
          onChange={handleFormChange}
          placeholder="Email address"
          required={true}
          label="Email address"
          error={registerFormErrors.email}
        />
        <Password
          name="password"
          value={registerFormData.password}
          onChange={handleFormChange}
          placeholder="Password"
          required={true}
          label="Password"
          error={registerFormErrors.password}
        />
        <Password
          name="confirmPassword"
          value={registerFormData.confirmPassword}
          onChange={handleFormChange}
          placeholder="Confirm password"
          required={true}
          label="Confirm password"
          error={registerFormErrors.confirmPassword}
        />
        <Button type="submit" className="max-w-fit">
          Register
        </Button>
      </form>
    </div>
  );
}
