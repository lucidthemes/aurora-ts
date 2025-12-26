interface PreviousProps {
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}

export default function Previous({ currentPage, handlePageChange }: PreviousProps) {
  return (
    <li className="h-11 w-11">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        className="h-full w-full cursor-pointer content-center justify-items-center rounded-full bg-transparent fill-shark transition-colors duration-300 ease-in-out hover:bg-black hover:fill-white focus:bg-black focus:fill-white"
        aria-label="Previous page"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" className="w-2.5">
          <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z"></path>
        </svg>
      </button>
    </li>
  );
}
