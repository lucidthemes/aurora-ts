import { useAuthContext } from '@contexts/AuthContext';
import Email from './Email';

export default function Details() {
  const { loggedInUser, handleUserUpdate } = useAuthContext();

  return (
    <div className="flex flex-col gap-y-10">
      <Email loggedInUser={loggedInUser} handleUserUpdate={handleUserUpdate} />
    </div>
  );
}
