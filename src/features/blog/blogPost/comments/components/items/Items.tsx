import type { Dispatch, SetStateAction } from 'react';

import type { Comment as CommentType } from '@typings/posts/comment';

import Item from './Item';

interface ItemsProps {
  postId: number;
  comments: CommentType[];
  commentsCount: number;
  commentReplyId: number | null;
  setCommentReplyId: Dispatch<SetStateAction<number | null>>;
  handleNewComment: (newComment: CommentType) => void;
}

export default function Items({ postId, comments, commentsCount, commentReplyId, setCommentReplyId, handleNewComment }: ItemsProps) {
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
