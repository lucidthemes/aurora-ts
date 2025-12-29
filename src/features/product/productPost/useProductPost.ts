import { useState, useRef } from 'react';

import type { ActiveTab } from '@typings/products/tab';

export default function useProductPost() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('description');
  const tabsRef = useRef<HTMLDivElement | null>(null);

  return { activeTab, setActiveTab, tabsRef };
}
