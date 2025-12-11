import { useState, useRef } from 'react';

function paginatePosts(posts, currentPage, postsPerPage, showPagination) {
  if (!showPagination) return posts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  let paginated = [...posts];

  paginated = posts.slice(indexOfFirstPost, indexOfLastPost);

  return paginated;
}

function calculateTotalPages(posts, postsPerPage) {
  const perPage = postsPerPage && postsPerPage >= 1 ? postsPerPage : 9;
  const totalPosts = posts.length || 0;
  const totalPages = Math.ceil(totalPosts / perPage);

  return totalPages;
}

export default function usePagination(posts, showPagination, postsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedPosts = paginatePosts(posts, currentPage, postsPerPage, showPagination);

  const totalPages = calculateTotalPages(posts, postsPerPage);

  const postListRef = useRef();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    postListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return { paginatedPosts, currentPage, totalPages, postListRef, handlePageChange };
}
