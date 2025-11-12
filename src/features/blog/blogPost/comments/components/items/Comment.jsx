import { dateTimeFormat } from '@utils/formatters';

export default function Comment({ comment, setCommentReplyId }) {
  const formattedDateTime = dateTimeFormat(comment.datetime);

  return (
    <div className="relative flex gap-x-5">
      <img src={comment.avatar} alt={comment.author} className="avatar max-h-19 max-w-19 rounded-full" />
      <div className="flex flex-col gap-y-6">
        <div className="flex flex-col gap-y-4">
          <p className="text-2xl text-shark">{comment.author}</p>
          {formattedDateTime && <time className="text-sm/5 tracking-xwide text-boulder uppercase">{formattedDateTime}</time>}
        </div>
        <p>{comment.comment}</p>
        <button
          className="reply static cursor-pointer rounded-md bg-pearl-bush px-2 py-1 text-sm text-xs/4 tracking-xwide text-shark uppercase transition-colors duration-300 ease-in-out hover:bg-shark hover:text-white focus:bg-shark focus:text-white lg:absolute lg:top-0 lg:right-0"
          onClick={() => setCommentReplyId(comment.id)}
        >
          Reply
        </button>
      </div>
    </div>
  );
}
