import Item from './Item';

export default function Items({ postId, comments, commentsCount, commentReplyId, setCommentReplyId, handleNewComment }) {
  return (
    <ul className="flex flex-col gap-y-10" aria-label="Comments">
      {comments.map((comment) => (
        <Item
          key={comment.id}
          postId={postId}
          commentsCount={commentsCount}
          comment={comment}
          replies={comment.replies}
          commentReplyId={commentReplyId}
          setCommentReplyId={setCommentReplyId}
          handleNewComment={handleNewComment}
        />
      ))}
    </ul>
  );
}
