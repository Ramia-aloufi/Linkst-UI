export type PostComment = {
  id: string;
  comment: string;
  user: {
    id: string;
    fullName: string;
  }};