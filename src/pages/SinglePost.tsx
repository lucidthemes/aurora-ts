import { useParams, Navigate } from 'react-router-dom';
import useSinglePost from '@features/blog/blogPost/useSinglePost';
import Header from '@features/blog/blogPost/header';
import { PageLayout, PageSidebarLayout } from '@components/Layout/PageLayout';
import BlogPost from '@features/blog/blogPost';
import { Sidebar } from '@components/Layout/Sidebar';

export default function SinglePost() {
  const { slug } = useParams();
  const { singlePost, categoryMap, author } = useSinglePost(slug);

  if (singlePost === null) return null;
  if (singlePost === false) return <Navigate to="/404" replace />;

  const postSidebar = singlePost.postSidebar || 'right';
  const postHeaderBesideSidebar = singlePost.postHeader?.besideSidebar || false;

  return (
    <article id={`post-${singlePost.id}`} className="flex flex-col gap-y-10">
      {postSidebar === 'hidden' && (
        <>
          <Header singlePost={singlePost} categoryMap={categoryMap} author={author} />
          <PageLayout>
            <div className="flex flex-col gap-y-10">
              <BlogPost singlePost={singlePost} author={author} />
            </div>
          </PageLayout>
        </>
      )}
      {(postSidebar === 'right' || postSidebar === 'left') && (
        <>
          {!postHeaderBesideSidebar && <Header singlePost={singlePost} categoryMap={categoryMap} author={author} />}
          <PageSidebarLayout
            content={
              <div className="flex flex-col gap-y-10">
                {postHeaderBesideSidebar && <Header singlePost={singlePost} categoryMap={categoryMap} author={author} />}
                <BlogPost singlePost={singlePost} author={author} />
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
