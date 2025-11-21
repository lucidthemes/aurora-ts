import { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function useSlideshow(selectedSlideIndex, setSelectedSlideIndex, setSelectedOverlayIndex, overlay) {
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({ active: false });

  const onThumbClick = useCallback(
    (index) => {
      if (!emblaMainApi || !emblaThumbsApi) return;
      emblaMainApi.scrollTo(index);
    },
    [emblaMainApi, emblaThumbsApi]
  );

  const onSelect = useCallback(() => {
    if (!overlay) {
      if (!emblaMainApi || !emblaThumbsApi) return;
      setSelectedSlideIndex(emblaMainApi.selectedScrollSnap());
      emblaThumbsApi.scrollTo(emblaMainApi.selectedScrollSnap());
    } else {
      if (!emblaMainApi) return;
      setSelectedOverlayIndex(emblaMainApi.selectedScrollSnap());
    }
  }, [emblaMainApi, emblaThumbsApi, setSelectedSlideIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    if (overlay) {
      (emblaMainApi.scrollTo(selectedSlideIndex), [emblaMainApi]);
      setSelectedOverlayIndex(emblaMainApi.selectedScrollSnap());
    }

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [emblaMainApi, onSelect]);

  const scrollPrev = useCallback(() => emblaMainApi && emblaMainApi.scrollPrev(), [emblaMainApi]);
  const scrollNext = useCallback(() => emblaMainApi && emblaMainApi.scrollNext(), [emblaMainApi]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (overlay) {
        if (event.key === 'ArrowLeft') {
          scrollPrev();
        } else if (event.key === 'ArrowRight') {
          scrollNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scrollPrev, scrollNext]);

  return { emblaMainRef, emblaThumbsRef, onThumbClick, scrollPrev, scrollNext };
}
