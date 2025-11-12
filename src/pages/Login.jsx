import { useLocation, Navigate } from 'react-router-dom';
import { useAuthContext } from '@contexts/AuthContext';
import Container from '@components/Layout/Container';
import LoginForm from '@features/auth/LoginForm';
import RegisterForm from '@features/auth/RegisterForm';

export default function Login() {
  const location = useLocation();
  const { loggedInUser } = useAuthContext();

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/account';

  if (loggedInUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-10 md:flex-row">
        <div className="flex max-h-fit basis-1/2 flex-col gap-y-5 rounded-md bg-white p-5 md:p-7.5 lg:p-10">
          <h2>Login</h2>
          <LoginForm />
        </div>
        <div className="flex max-h-fit basis-1/2 flex-col gap-y-5 rounded-md bg-white p-5 md:p-7.5 lg:p-10">
          <h2>Register</h2>
          <RegisterForm />
        </div>
      </div>
    </Container>
  );
}
