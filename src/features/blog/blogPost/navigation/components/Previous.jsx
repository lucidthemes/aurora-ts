import { Link } from 'react-router-dom';

export default function Previous({ previousPost }) {
  return (
    <div className="flex basis-full flex-col items-start gap-y-1 text-left">
      <Link
        to={`/blog/${previousPost.slug}`}
        className="fill-boulder text-boulder transition-colors duration-300 ease-in-out hover:fill-shark hover:text-shark focus:fill-shark focus:text-shark"
      >
        <p className="flex gap-x-2.5 text-current">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="mt-0.5 w-2">
            <path d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"></path>
          </svg>
          Previous post
        </p>
      </Link>
      <h3>
        <Link to={`/blog/${previousPost.slug}`} className="transition-colors duration-300 ease-in-out hover:text-boulder focus:text-boulder">
          {previousPost.title}
        </Link>
      </h3>
    </div>
  );
}
