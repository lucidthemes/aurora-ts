import useSearch from './useSearch';
import SearchForm from '@features/searchForm';

export default function Search({ headerSearchActive, handleHeaderSearchActive }) {
  if (!headerSearchActive) return null;

  const overlayInputRef = useSearch(headerSearchActive);

  return (
    <div className="fixed top-0 left-0 z-10 h-full w-full bg-black">
      <div className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 lg:w-fit">
        <SearchForm
          location="header"
          overlayInputRef={overlayInputRef}
          headerSearchActive={headerSearchActive}
          handleHeaderSearchActive={handleHeaderSearchActive}
        />
      </div>
      <button className="absolute top-15 right-15 cursor-pointer p-2.5" onClick={handleHeaderSearchActive} aria-label="Close search overlay">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-5 fill-white">
          <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path>
        </svg>
      </button>
    </div>
  );
}
