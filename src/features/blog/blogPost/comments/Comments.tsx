import SectionHeading from '@components/UI/SectionHeading';
import type { Post } from '@typings/posts/post';

import useComments from './hooks/useComments';
import Items from './components/items';
import Form from './components/Form';

interface CommentsProps {
  post: Post;
}

export default function Comments({ post }: CommentsProps) {
  const postId = post.id;
  const { comments, commentReplyId, setCommentReplyId, handleNewComment } = useComments(postId);

  return (
    <section className="rounded-md bg-white p-5 md:p-7.5 lg:p-10">
      <SectionHeading heading={`Comments (${comments.count})`} headingLevel="3" />
      <div className="flex flex-col gap-y-10">
        {comments.count > 0 ? (
          <Items
            postId={postId}
            comments={comments.list}
            commentsCount={comments.count}
            commentReplyId={commentReplyId}
            setCommentReplyId={setCommentReplyId}
            handleNewComment={handleNewComment}
          />
        ) : (
          <p className="rounded-sm bg-pampas p-5 text-center">No comments found</p>
        )}
        {commentReplyId === null && (
          <Form postId={postId} commentsCount={comments.count} setCommentReplyId={setCommentReplyId} handleNewComment={handleNewComment} />
        )}
      </div>
    </section>
  );
}
