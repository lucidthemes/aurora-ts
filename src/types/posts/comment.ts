export interface Comment {
  id: number;
  postId: number;
  replyTo?: number | null;
  author: string;
  avatar?: string;
  datetime: string;
  comment: string;
  status: string;
  replies: Comment[];
}
