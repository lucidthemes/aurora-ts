import { Link } from 'react-router-dom';

import type { Post } from '@typings/posts/post';

interface NextProps {
  nextPost: Post;
}

export default function Next({ nextPost }: NextProps) {
  return (
    <div className="flex basis-full flex-col items-end gap-y-1 text-right">
      <Link
        to={`/blog/${nextPost.slug}`}
        className="fill-boulder text-boulder transition-colors duration-300 ease-in-out hover:fill-shark hover:text-shark focus:fill-shark focus:text-shark"
      >
        <p className="flex gap-x-2.5 text-current">
          Next post
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="mt-1 w-2">
            <path d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"></path>
          </svg>
        </p>
      </Link>
      <h3>
        <Link to={`/blog/${nextPost.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
          {nextPost.title}
        </Link>
      </h3>
    </div>
  );
}
