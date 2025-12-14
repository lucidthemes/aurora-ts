import type { Dispatch, SetStateAction } from 'react';

import type { Comment as CommentType } from '@typings/posts/comment';

import Comment from './Comment';
import Form from '../Form';

interface ItemProps {
  postId: number;
  commentsCount: number;
  comment: CommentType;
  replies?: CommentType[];
  commentReplyId: number | null;
  setCommentReplyId: Dispatch<SetStateAction<number | null>>;
  handleNewComment: (newComment: CommentType) => void;
}

export default function Item({ postId, commentsCount, comment, replies = [], commentReplyId, setCommentReplyId, handleNewComment }: ItemProps) {
  return (
    <li className="flex flex-col gap-y-10">
      <Comment comment={comment} setCommentReplyId={setCommentReplyId} />

      {commentReplyId === comment.id && (
        <Form postId={postId} commentsCount={commentsCount} replyTo={comment.id} setCommentReplyId={setCommentReplyId} handleNewComment={handleNewComment} />
      )}

      {replies.length > 0 && (
        <ul className="flex flex-col gap-y-10 pl-10">
          {replies.map((reply) => (
            <Item
              key={reply.id}
              postId={postId}
              commentsCount={commentsCount}
              comment={reply}
              replies={reply.replies}
              commentReplyId={commentReplyId}
              setCommentReplyId={setCommentReplyId}
              handleNewComment={handleNewComment}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
