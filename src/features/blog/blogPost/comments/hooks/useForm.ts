import { useState } from 'react';
import type { Dispatch, SetStateAction, ChangeEventHandler, FormEventHandler } from 'react';

import type { Comment as CommentType } from '@typings/posts/comment';

interface CommentFormData {
  comment: string;
  name: string;
}

type CommentFormValidation = {
  [K in keyof CommentFormData]: boolean;
};

type CommentFormErrors = {
  [K in keyof CommentFormData]: string;
};

export default function useForm(
  postId: number,
  commentsCount: number,
  replyTo: number | null,
  setCommentReplyId: Dispatch<SetStateAction<number | null>>,
  handleNewComment: (newComment: CommentType) => void
) {
  const [commentFormData, setCommentFormData] = useState<CommentFormData>({
    comment: '',
    name: '',
  });

  const commentFormValidation: CommentFormValidation = {
    comment: true,
    name: true,
  };

  const [commentFormErrors, setCommentFormErrors] = useState<CommentFormErrors>({
    comment: '',
    name: '',
  });

  const handleFormChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setCommentFormData({
      ...commentFormData,
      [name]: value,
    });
  };

  const validateFormData = () => {
    let formErrors = { ...commentFormErrors };
    let formIsValid = true;

    for (const field in commentFormData) {
      const key = field as keyof CommentFormData;

      const value = commentFormData[key];
      const required = commentFormValidation[key];

      if (!value && required) {
        formErrors[key] = `Please enter a ${key}`;
        formIsValid = false;
      } else {
        formErrors[key] = '';
      }
    }

    setCommentFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const isFormValid = validateFormData();

    if (isFormValid) {
      const newComment = {
        id: commentsCount + 1,
        postId,
        replyTo,
        author: commentFormData.name,
        avatar: '/images/author.jpg',
        datetime: new Date().toISOString(),
        comment: commentFormData.comment,
        status: 'approved',
        replies: [],
      };

      handleNewComment(newComment);

      setCommentFormData({
        comment: '',
        name: '',
      });

      setCommentReplyId(null);
    }
  };

  return { commentFormData, commentFormErrors, handleFormChange, handleFormSubmit };
}
