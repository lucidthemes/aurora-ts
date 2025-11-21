import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

export default function useSlideshow(loop, autoplay) {
  const autoplayOptions =
    autoplay === true
      ? Autoplay({ delay: 5000, stopOnMouseEnter: true, stopOnInteraction: false }, (emblaRoot) => emblaRoot.parentElement)
      : Autoplay({ playOnInit: false, stopOnInteraction: true });

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: loop, align: 'start' }, [autoplayOptions]);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
  }, [emblaApi, setScrollSnaps, onSelect]);

  return { emblaRef, scrollSnaps, selectedIndex, scrollPrev, scrollNext, scrollTo };
}
