import { Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '@contexts/AuthContext';

export default function RequireAuth() {
  const { loggedInUser } = useAuthContext();

  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // Render child routes if authenticated
}
