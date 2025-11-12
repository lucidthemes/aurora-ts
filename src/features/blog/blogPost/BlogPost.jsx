import PageContent from '@components/UI/PageContent';
import Newsletter from './newsletter';
import Tags from './tags';
import Share from './share';
import Author from './author';
import Navigation from './navigation';
import Related from './related';
import Comments from './comments';

export default function BlogPost({ singlePost, author }) {
  return (
    <>
      <PageContent content={singlePost.content} />
      <Newsletter />
      <Tags singlePost={singlePost}></Tags>
      <Share></Share>
      <Author author={author}></Author>
      <Navigation singlePost={singlePost}></Navigation>
      <Related singlePost={singlePost}></Related>
      <Comments singlePost={singlePost}></Comments>
    </>
  );
}
