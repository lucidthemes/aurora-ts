import { useState, useRef } from 'react';
import { Post } from '@typings/posts/post';

function paginatePosts(posts: Post[], currentPage: number, postsPerPage: number, showPagination: boolean) {
  if (!showPagination) return posts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  let paginated = [...posts];

  paginated = posts.slice(indexOfFirstPost, indexOfLastPost);

  return paginated;
}

function calculateTotalPages(posts: Post[], postsPerPage: number) {
  const perPage = postsPerPage && postsPerPage >= 1 ? postsPerPage : 9;
  const totalPosts = posts.length || 0;
  const totalPages = Math.ceil(totalPosts / perPage);

  return totalPages;
}

export default function usePagination(posts: Post[], showPagination: boolean, postsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedPosts = paginatePosts(posts, currentPage, postsPerPage, showPagination);

  const totalPages = calculateTotalPages(posts, postsPerPage);

  const postListRef = useRef<HTMLUListElement | null>(null);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    postListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return { paginatedPosts, currentPage, totalPages, postListRef, handlePageChange };
}
