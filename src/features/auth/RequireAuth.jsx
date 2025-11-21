import { useAuthContext } from '@contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function RequireAuth() {
  const { loggedInUser } = useAuthContext();

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Render child routes if authenticated
}
