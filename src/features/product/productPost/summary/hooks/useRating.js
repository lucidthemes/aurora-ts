export default function useRating(setActiveTab, tabsRef) {
  const handleSummaryRatingClick = () => {
    setActiveTab('reviews');
    if (tabsRef.current) {
      tabsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return handleSummaryRatingClick;
}
