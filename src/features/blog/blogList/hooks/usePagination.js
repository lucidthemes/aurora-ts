import { useState, useRef } from 'react';

export default function usePagination(blogPosts, postsPerPage) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPosts = blogPosts.length;
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  const postListRef = useRef();

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    postListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return { totalPages, currentPage, currentPosts, postListRef, handlePageChange };
}
