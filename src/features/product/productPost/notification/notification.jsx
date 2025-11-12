import Button from '@components/UI/Button';

export default function Notification({ addCartNotification }) {
  if (!addCartNotification) return null;

  return (
    <div className="flex items-center justify-between rounded-md bg-white p-10" role="status">
      <p>{addCartNotification}</p>
      <Button to={`/cart`}>View cart</Button>
    </div>
  );
}
