interface NextProps {
  scrollNext: () => void | undefined;
  navPosition?: 'inside' | 'outside';
}

export default function Next({ scrollNext, navPosition }: NextProps) {
  const navPositionClasses = navPosition === 'outside' ? 'md:-right-16' : 'md:right-10';
  return (
    <button
      className={`absolute right-2 bottom-15 fill-shark transition-colors duration-300 ease-in-out md:top-1/2 ${navPositionClasses} z-2 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full md:-translate-y-1/2 md:bg-transparent md:fill-boulder md:hover:bg-shark md:hover:fill-white`}
      onClick={scrollNext}
      aria-label="Next slide"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" className="h-5.25">
        <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"></path>
      </svg>
    </button>
  );
}
