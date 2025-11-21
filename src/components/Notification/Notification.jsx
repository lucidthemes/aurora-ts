import useNotification from './useNotification';

export default function Notification({ type = '', message = '', duration = 5000, onClose }) {
  const notificationVisible = useNotification(duration, onClose);
  const notificationVisibleClass = notificationVisible ? 'opacity-100' : 'opacity-0';
  const notificationColorClass = type === 'success' ? 'bg-green-100' : type === 'error' ? 'bg-red-100' : 'bg-gray-100';
  const notificationRole = type === 'success' ? 'status' : 'alert';

  return (
    <div className={`rounded-sm p-3 transition-opacity duration-300 ${notificationVisibleClass} ${notificationColorClass} `} role={notificationRole}>
      <p className="text-center text-shark">{message}</p>
    </div>
  );
}
