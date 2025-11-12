import { useState } from 'react';

export default function useForm(postId, commentsCount, replyTo, setCommentReplyId, handleNewComment) {
  const [commentFormData, setCommentFormData] = useState({
    comment: '',
    name: '',
  });

  const commentFormValidation = {
    comment: true,
    name: true,
  };

  const [commentFormErrors, setCommentFormErrors] = useState({
    comment: '',
    name: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setCommentFormData({
      ...commentFormData,
      [name]: value,
    });
  };

  const validateFormData = () => {
    let formErrors = { ...commentFormErrors };
    let formIsValid = true;

    for (let field in commentFormData) {
      const value = commentFormData[field];
      const required = commentFormValidation[field];

      if (!value && required) {
        formErrors[field] = `Please enter a ${field}`;
        formIsValid = false;
      } else {
        formErrors[field] = '';
      }
    }

    setCommentFormErrors(formErrors);

    return formIsValid;
  };

  const handleFormSubmit = (e) => {
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
