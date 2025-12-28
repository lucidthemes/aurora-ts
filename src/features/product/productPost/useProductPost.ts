import { useState, useRef } from 'react';

type ActiveTab = 'description' | 'reviews';

export default function useProductPost() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('description');
  const tabsRef = useRef<HTMLDivElement | null>(null);

  return { activeTab, setActiveTab, tabsRef };
}
