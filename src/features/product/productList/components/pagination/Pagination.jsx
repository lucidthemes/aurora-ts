import Previous from './Previous';
import Next from './Next';
import Numbers from './Numbers';

export default function Pagination({ totalPages, currentPage, handlePageChange }) {
  return (
    <nav aria-label="Product pagination">
      <ul className="mt-10 flex justify-center gap-x-4">
        {currentPage !== 1 && <Previous currentPage={currentPage} handlePageChange={handlePageChange} />}
        <Numbers totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
        {currentPage !== totalPages && <Next currentPage={currentPage} handlePageChange={handlePageChange} />}
      </ul>
    </nav>
  );
}
