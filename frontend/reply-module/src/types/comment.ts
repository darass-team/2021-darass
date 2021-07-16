import { User } from "./user";

export interface Comment {
  id: number;
  content: string;
  user: User;
  createdDate: string;
  modifiedDate: string;
}

export interface CreateCommentRequestData {
  url: string | null;
  projectSecretKey: string | null;
  content: string;
}
