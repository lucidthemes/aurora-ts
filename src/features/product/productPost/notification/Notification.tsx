import Button from '@components/UI/Button';

interface NotificationProps {
  addCartNotification: string;
}

export default function Notification({ addCartNotification }: NotificationProps) {
  if (!addCartNotification) return null;

  return (
    <div className="flex items-center justify-between rounded-md bg-white p-10" role="status">
      <p>{addCartNotification}</p>
      <Button to={`/cart`}>View cart</Button>
    </div>
  );
}
