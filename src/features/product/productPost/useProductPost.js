import { useState, useRef } from 'react';

export default function useProductPost() {
  const [activeTab, setActiveTab] = useState('description');
  const tabsRef = useRef(null);

  return { activeTab, setActiveTab, tabsRef };
}
