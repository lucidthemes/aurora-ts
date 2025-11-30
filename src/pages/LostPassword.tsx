import { useLocation, Navigate } from 'react-router-dom';
import { useAuthContext } from '@contexts/AuthContext';
import Container from '@components/Layout/Container';
import LostPasswordForm from '@features/auth/LostPasswordForm';

export default function LostPassword() {
  const location = useLocation();
  const { loggedInUser } = useAuthContext();

  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get('redirect') || '/account';

  if (loggedInUser) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <Container>
      <div className="flex flex-col gap-y-5 rounded-md bg-white p-5 md:p-7.5 lg:p-10">
        <h2>Lost password</h2>
        <p>Lost your password? Please enter your email address and you will receive a link to create a new password.</p>
        <LostPasswordForm />
      </div>
    </Container>
  );
}
