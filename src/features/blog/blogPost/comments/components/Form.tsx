import type { Dispatch, SetStateAction } from 'react';

import Textarea from '@components/Form/Textarea';
import Input from '@components/Form/Input';
import Button from '@components/UI/Button';
import type { Comment as CommentType } from '@typings/posts/comment';

import useForm from '../hooks/useForm';

interface FormProps {
  postId: number;
  commentsCount: number;
  replyTo?: number | null;
  setCommentReplyId: Dispatch<SetStateAction<number | null>>;
  handleNewComment: (newComment: CommentType) => void;
}

export default function Form({ postId, commentsCount, replyTo = null, setCommentReplyId, handleNewComment }: FormProps) {
  const { commentFormData, commentFormErrors, handleFormChange, handleFormSubmit } = useForm(
    postId,
    commentsCount,
    replyTo,
    setCommentReplyId,
    handleNewComment
  );

  return (
    <div id="comment-respond" className="post-comments-form flex flex-col gap-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-sm tracking-xwide text-shark uppercase after:mt-2.5 after:block after:h-0.25 after:w-10 after:bg-shark">Leave a comment</h3>
        <button
          className={`${replyTo === null ? 'hidden' : 'cursor-pointer'} fill-shark transition-colors duration-300 ease-in-out hover:fill-boulder`}
          onClick={() => setCommentReplyId(null)}
          aria-label="Cancel reply"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" className="w-3">
            <path d="M310.6 361.4c12.5 12.5 12.5 32.75 0 45.25C304.4 412.9 296.2 416 288 416s-16.38-3.125-22.62-9.375L160 301.3L54.63 406.6C48.38 412.9 40.19 416 32 416S15.63 412.9 9.375 406.6c-12.5-12.5-12.5-32.75 0-45.25l105.4-105.4L9.375 150.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L160 210.8l105.4-105.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-105.4 105.4L310.6 361.4z"></path>
          </svg>
        </button>
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-y-6" aria-label="Add comment" noValidate>
        <Textarea
          name="comment"
          value={commentFormData.comment}
          onChange={handleFormChange}
          placeholder="Comment"
          required={true}
          label="Comment"
          error={commentFormErrors.comment}
        />
        <Input
          type="text"
          name="name"
          value={commentFormData.name}
          onChange={handleFormChange}
          placeholder="Name"
          required={true}
          label="Name"
          error={commentFormErrors.name}
        />
        <Button type="submit" className="max-w-fit">
          Post comment
        </Button>
      </form>
    </div>
  );
}
