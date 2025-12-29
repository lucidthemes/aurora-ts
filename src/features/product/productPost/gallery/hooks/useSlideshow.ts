import { useEffect, useCallback } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

export default function useSlideshow(
  selectedSlideIndex: number,
  setSelectedSlideIndex: Dispatch<SetStateAction<number>>,
  setSelectedOverlayIndex: Dispatch<SetStateAction<number>>,
  overlay?: boolean
) {
  const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true, align: 'start' });
  const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({ active: false });

  const onThumbClick = useCallback(
    (index: number) => {
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
  }, [overlay, emblaMainApi, emblaThumbsApi, setSelectedSlideIndex, setSelectedOverlayIndex]);

  useEffect(() => {
    if (!emblaMainApi) return;
    onSelect();

    if (overlay) {
      (emblaMainApi.scrollTo(selectedSlideIndex), [emblaMainApi]);
      setSelectedOverlayIndex(emblaMainApi.selectedScrollSnap());
    }

    emblaMainApi.on('select', onSelect).on('reInit', onSelect);
  }, [overlay, emblaMainApi, onSelect, selectedSlideIndex, setSelectedOverlayIndex]);

  const scrollPrev = useCallback(() => emblaMainApi && emblaMainApi.scrollPrev(), [emblaMainApi]);
  const scrollNext = useCallback(() => emblaMainApi && emblaMainApi.scrollNext(), [emblaMainApi]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (overlay) {
        if (e.key === 'ArrowLeft') {
          scrollPrev();
        } else if (e.key === 'ArrowRight') {
          scrollNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [overlay, scrollPrev, scrollNext]);

  return { emblaMainRef, emblaThumbsRef, onThumbClick, scrollPrev, scrollNext };
}
