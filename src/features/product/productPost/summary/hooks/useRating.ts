import type { Dispatch, SetStateAction, RefObject } from 'react';

import type { ActiveTab } from '@typings/products/tab';

export default function useRating(setActiveTab: Dispatch<SetStateAction<ActiveTab>>, tabsRef: RefObject<HTMLDivElement | null>) {
  const handleSummaryRatingClick = () => {
    setActiveTab('reviews');
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return handleSummaryRatingClick;
}
