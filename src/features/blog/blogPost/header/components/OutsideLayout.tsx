import type { ReactNode } from 'react';

import type { Post } from '@typings/posts/post';

interface OutsideLayoutProps {
  post: Post;
  content: ReactNode;
  layout: 'outside-above' | 'outside-below' | 'split-narrow' | 'split-wide' | 'split-full' | 'overlay-narrow' | 'overlay-wide' | 'overlay-full';
}

export default function OutsideLayout({ post, content, layout }: OutsideLayoutProps) {
  return (
    <div className="flex flex-col gap-y-10">
      {layout === 'outside-above' && content}
      {post.image && <img src={post.image} alt={post.title} className="rounded-md" />}
      {layout === 'outside-below' && content}
    </div>
  );
}
