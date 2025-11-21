export default function ScrollTop() {
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <button
      className="flex h-11 w-11 cursor-pointer items-center justify-center self-center rounded-full bg-shark fill-white opacity-100 transition-colors duration-300 ease-in-out lg:fixed lg:right-11 lg:bottom-11 lg:opacity-60 lg:hover:opacity-100 lg:focus:opacity-100"
      onClick={handleScrollTop}
      aria-label="Return to top of page"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="h-5.25">
        <path d="M352 352c-8.188 0-16.38-3.125-22.62-9.375L192 205.3l-137.4 137.4c-12.5 12.5-32.75 12.5-45.25 0s-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25C368.4 348.9 360.2 352 352 352z"></path>
      </svg>
    </button>
  );
}
