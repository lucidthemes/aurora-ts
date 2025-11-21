import { useEffect, useState } from 'react';

export default function useNotification(duration, onClose) {
  const [notificationVisible, setNotificationVisible] = useState(false);

  useEffect(() => {
    setNotificationVisible(true);

    const hideNotification = setTimeout(() => {
      setNotificationVisible(false);
    }, duration - 300);

    const removeNotification = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(hideNotification);
      clearTimeout(removeNotification);
    };
  }, [duration, onClose]);

  return notificationVisible;
}
