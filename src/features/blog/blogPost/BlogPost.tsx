import PageContent from '@components/UI/PageContent';
import type { Post } from '@typings/posts/post';
import type { Author as AuthorType } from '@typings/posts/author';

import Newsletter from './newsletter';
import Tags from './tags';
import Share from './share';
import Author from './author';
import Navigation from './navigation';
import Related from './related';
import Comments from './comments';

interface BlogPostProps {
  post: Post;
  author: AuthorType | null;
}

export default function BlogPost({ post, author }: BlogPostProps) {
  return (
    <>
      <PageContent content={post.content ?? []} />
      <Newsletter />
      <Tags post={post}></Tags>
      <Share></Share>
      <Author author={author}></Author>
      <Navigation post={post}></Navigation>
      <Related post={post}></Related>
      <Comments post={post}></Comments>
    </>
  );
}
