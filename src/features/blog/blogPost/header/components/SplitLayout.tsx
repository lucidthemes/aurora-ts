import type { ReactNode } from 'react';

import type { Post } from '@typings/posts/post';

interface SplitLayoutProps {
  post: Post;
  content: ReactNode;
}

export default function SplitLayout({ post, content }: SplitLayoutProps) {
  return (
    <div className="flex flex-col overflow-hidden rounded-sm md:h-125 md:flex-row">
      <div className="flex basis-1/2 flex-col items-start justify-center bg-white p-5 md:p-7.5 lg:basis-1/3 lg:p-10">{content}</div>
      <div className="min-h-40 basis-1/2 bg-cover bg-center bg-no-repeat lg:basis-2/3" style={{ backgroundImage: `url(${post.image})` }}></div>
    </div>
  );
}
