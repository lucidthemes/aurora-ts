interface PreviousProps {
  scrollPrev: () => void | undefined;
  navPosition?: 'inside' | 'outside';
}

export default function Previous({ scrollPrev, navPosition }: PreviousProps) {
  const navPositionClasses = navPosition === 'outside' ? 'md:-left-16' : 'md:left-10';
  return (
    <button
      className={`absolute bottom-15 left-2 fill-shark transition-colors duration-300 ease-in-out md:top-1/2 ${navPositionClasses} z-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full md:-translate-y-1/2 md:bg-transparent md:fill-boulder md:hover:bg-shark md:hover:fill-white`}
      onClick={scrollPrev}
      aria-label="Previous slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" className="h-5.25">
        <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"></path>
      </svg>
    </button>
  );
}
