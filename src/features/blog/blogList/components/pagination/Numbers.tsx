interface NumbersProps {
  totalPages: number;
  currentPage: number;
  handlePageChange: (pageNumber: number) => void;
}

export default function Numbers({ totalPages, currentPage, handlePageChange }: NumbersProps) {
  return (
    <>
      {[...Array(totalPages)].map((_, i) => {
        const page = i + 1;
        const numberClasses = currentPage === page ? 'border-shark text-shark' : 'border-transparent';
        return (
          <li key={page}>
            <button
              onClick={() => handlePageChange(page)}
              className={`w-8 cursor-pointer border-b-1 p-2 text-center text-boulder transition-colors duration-300 ease-in-out hover:text-shark focus:text-shark ${numberClasses}`}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          </li>
        );
      })}
    </>
  );
}
