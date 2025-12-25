import { useParams, Navigate } from 'react-router-dom';

import Container from '@components/Layout/Container';
import { PageLayout, PageSidebarLayout } from '@components/Layout/PageLayout';
import { Sidebar } from '@components/Layout/Sidebar';
import useSinglePost from '@features/blog/blogPost/useSinglePost';
import Header from '@features/blog/blogPost/header';
import BlogPost from '@features/blog/blogPost';

export default function SinglePost() {
  const { slug } = useParams();
  const { singlePost, categoryMap, author } = useSinglePost(slug);

  if (singlePost.status === 'not-found') return <Navigate to="/404" replace />;

  if (singlePost.status === 'loading')
    return (
      <Container>
        <p className="rounded-sm bg-white p-5 text-center">Post loading</p>
      </Container>
    );

  if (singlePost.status !== 'loaded') return null;

  const { post } = singlePost;

  const postSidebar = post.postSidebar || 'right';
  const postHeaderBesideSidebar = post.postHeader?.besideSidebar || false;

  return (
    <article id={`post-${post.id}`} className="flex flex-col gap-y-10">
      {postSidebar === 'hidden' && (
        <>
          <Header post={post} categoryMap={categoryMap} author={author} />
          <PageLayout>
            <div className="flex flex-col gap-y-10">
              <BlogPost post={post} author={author} />
            </div>
          </PageLayout>
        </>
      )}
      {(postSidebar === 'right' || postSidebar === 'left') && (
        <>
          {!postHeaderBesideSidebar && <Header post={post} categoryMap={categoryMap} author={author} />}
          <PageSidebarLayout
            content={
              <div className="flex flex-col gap-y-10">
                {postHeaderBesideSidebar && <Header post={post} categoryMap={categoryMap} author={author} />}
                <BlogPost post={post} author={author} />
              </div>
            }
            sidebar={<Sidebar />}
            sidebarPosition={postSidebar}
          />
        </>
      )}
    </article>
  );
}
