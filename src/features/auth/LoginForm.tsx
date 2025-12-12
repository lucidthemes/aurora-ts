import { Link } from 'react-router-dom';
import { useAuthContext } from '@contexts/AuthContext';
import useLoginForm from './hooks/useLoginForm';
import Notification from '@components/Notification';
import Input from '@components/Form/Input';
import Password from '@components/Form/Password';
import Button from '@components/UI/Button';

export default function LoginForm() {
  const { handleLogin } = useAuthContext();

  const { loginFormData, loginFormErrors, loginFormNotification, resetLoginFormNotification, handleFormChange, handleFormSubmit } = useLoginForm(handleLogin);

  return (
    <div className="flex flex-col gap-y-5">
      {loginFormNotification.type !== '' && (
        <Notification type={loginFormNotification.type} message={loginFormNotification.message} duration={10000} onClose={() => resetLoginFormNotification()} />
      )}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-6" aria-label="Login" noValidate>
        <Input
          type="email"
          name="email"
          value={loginFormData.email}
          onChange={handleFormChange}
          placeholder="Email address"
          required={true}
          label="Email address"
          error={loginFormErrors.email}
        />
        <Password
          name="password"
          value={loginFormData.password}
          onChange={handleFormChange}
          placeholder="Password"
          required={true}
          label="Password"
          error={loginFormErrors.password}
        />
        <Button type="submit" className="max-w-fit">
          Login
        </Button>
      </form>
      <Link to="/lost-password" className="max-w-fit text-boulder underline transition-colors duration-300 ease-in-out hover:text-shark">
        Lost your password?
      </Link>
    </div>
  );
}
