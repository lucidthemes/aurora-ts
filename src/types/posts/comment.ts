export interface Comment {
  id: number;
  postId: number;
  replyTo?: boolean;
  author: string;
  avatar?: string;
  datetime: string;
  comment: string;
  status: string;
}
