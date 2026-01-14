import Button from '@components/UI/Button';

interface NotificationProps {
  addCartNotification: string;
}

export default function Notification({ addCartNotification }: NotificationProps) {
  if (!addCartNotification) return null;

  return (
    <div className="flex flex-col gap-y-5 rounded-md bg-white p-5 md:flex-row md:items-center md:justify-between md:p-7.5 lg:p-10" role="status">
      <p>{addCartNotification}</p>
      <Button to={`/cart`} className="text-center">
        View cart
      </Button>
    </div>
  );
}
