import SectionHeading from '@components/UI/SectionHeading';
import type { Post } from '@typings/posts/post';

import useRelated from './useRelated';
import Item from './Item';

interface RelatedProps {
  post: Post;
}

export default function Related({ post }: RelatedProps) {
  const relatedPosts = useRelated(post);
  if (!Array.isArray(relatedPosts) || relatedPosts.length === 0) return null;

  return (
    <section className="rounded-md bg-white p-5 md:p-7.5 lg:p-10">
      <SectionHeading heading="You may also like" headingLevel="3" />
      <ul className="grid grid-cols-1 gap-x-7.5 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((related) => (
          <Item key={related.id} related={related} />
        ))}
      </ul>
    </section>
  );
}
