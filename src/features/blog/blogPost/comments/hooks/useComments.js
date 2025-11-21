import { useState, useEffect } from 'react';
import { getCommentsById } from '@server/posts/getComments';

export default function useComments(postId) {
  const [comments, setComments] = useState({
    list: [],
    count: 0,
  });

  const [commentReplyId, setCommentReplyId] = useState(null);

  useEffect(() => {
    if (!postId) return;

    const fetchComments = async () => {
      try {
        const postComments = await getCommentsById(postId);
        if (!postComments) return;

        const commentsCount = postComments.length;

        const commentReplies = (parentId) => {
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

  const handleNewComment = (newComment) => {
    let updatedComments;

    if (!newComment.replyTo) {
      updatedComments = [...comments.list, newComment];
    } else {
      const insertReply = (comments) => {
        return comments.map((comment) => {
          if (comment.id === newComment.replyTo) {
            return {
              ...comment,
              replies: [...(comment.replies || []), newComment],
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

      updatedComments = insertReply(comments.list);
    }

    setComments({
      list: updatedComments,
      count: comments.count + 1,
    });
  };

  return { comments, commentReplyId, setCommentReplyId, handleNewComment };
}
