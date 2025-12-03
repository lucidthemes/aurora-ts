import { useEffect, useState } from 'react';

export default function useNotification(duration: number, onClose: () => void) {
  const [notificationVisible, setNotificationVisible] = useState(false);

  useEffect(() => {
    const showNotification = () => {
      setNotificationVisible(true);
    };

    const hideNotification = setTimeout(() => {
      setNotificationVisible(false);
    }, duration - 300);

    const removeNotification = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      showNotification();
      clearTimeout(hideNotification);
      clearTimeout(removeNotification);
    };
  }, [duration, onClose]);

  return notificationVisible;
}
