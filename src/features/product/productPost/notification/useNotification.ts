import { useState } from 'react';

export default function useNotification() {
  const [addCartNotification, setAddCartNotification] = useState('');

  return { addCartNotification, setAddCartNotification };
}
