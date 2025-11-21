import React from 'react';
import useSlideshow from './useSlideshow';
import Previous from './components/button/Previous';
import Next from './components/button/Next';
import Dot from './components/button/Dot';

export function Slideshow({ children, height = 500, loop = true, autoplay = false, multiSlide = '', navPosition = 'outside' }) {
  const { emblaRef, scrollSnaps, selectedIndex, scrollPrev, scrollNext, scrollTo } = useSlideshow(loop, autoplay);

  const heightClasses = height === 500 ? 'md:h-125' : height === 600 ? 'md:h-150' : 'md:h-125';
  const multiSlideClass = multiSlide ? '-mr-10' : '';

  // clone and inject props into each child
  const childrenWithProps = React.Children.map(children, (child) =>
    React.isValidElement(child) ? React.cloneElement(child, { multiSlide, heightClasses }) : child
  );

  return (
    <div className="embla-carousel relative">
      <div className={`embla-navigation static left-0 h-full w-full md:absolute md:top-0 md:bottom-0 ${heightClasses}`}>
        <Previous scrollPrev={scrollPrev} navPosition={navPosition} />
        <Next scrollNext={scrollNext} navPosition={navPosition} />
      </div>
      <div className="embla overflow-hidden rounded-sm" ref={emblaRef}>
        <div className={`embla__container ${multiSlideClass} flex ${heightClasses}`}>{childrenWithProps}</div>
      </div>
      <div className="embla__dots mt-10 flex items-center justify-center gap-x-4">
        {scrollSnaps.map((_, index) => (
          <Dot key={index} selected={index === selectedIndex} onClick={() => scrollTo(index)} />
        ))}
      </div>
    </div>
  );
}
