import { useState, useEffect } from 'react';

import { getCommentsById } from '@server/posts/getComments';
import type { Comment as CommentType } from '@typings/posts/comment';

interface CommentsState {
  list: CommentType[];
  count: number;
}

export default function useComments(postId: number) {
  const [comments, setComments] = useState<CommentsState>({
    list: [],
    count: 0,
  });

  const [commentReplyId, setCommentReplyId] = useState<number | null>(null);

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      try {
        const postComments = await getCommentsById(postId);
        if (!postComments) return;

        const commentsCount = postComments.length;

        const commentReplies = (parentId: number): CommentType[] => {
          return postComments
            .filter((comment) => comment.replyTo === parentId)
            .map((comment) => ({
              ...comment,
              replies: commentReplies(comment.id),
            }));
        };

        const commentsList = postComments
          .filter((comment) => comment.replyTo === null)
          .map((comment) => ({
            ...comment,
            replies: commentReplies(comment.id),
          }));

        if (commentsList) {
          setComments({
            list: commentsList,
            count: commentsCount,
          });

          setCommentReplyId(null);
        }
      } catch (error) {
        console.error('Failed to fetch comments.', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleNewComment = (newComment: CommentType) => {
    const insertReply = (comments: CommentType[]): CommentType[] => {
      return comments.map((comment): CommentType => {
        if (comment.id === newComment.replyTo) {
          return {
            ...comment,
            replies: [...(comment.replies ?? []), newComment],
          };
        } else if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: insertReply(comment.replies),
          };
        }
        return comment;
      });
    };

    const updatedComments = newComment.replyTo === null ? [...comments.list, newComment] : insertReply(comments.list);

    setComments({
      list: updatedComments,
      count: comments.count + 1,
    });
  };

  return { comments, commentReplyId, setCommentReplyId, handleNewComment };
}
