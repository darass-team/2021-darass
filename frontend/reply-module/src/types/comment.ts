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
  guestNickName?: string;
  guestPassword?: string;
}

export interface GetRequestParams {
  url: string | null;
  projectKey?: string | null;
}

export interface EditCommentRequestData extends Pick<Comment, "content"> {
  guestUserId?: number;
  guestUserPassword?: string;
}

export interface EditCommentParameter extends Pick<Comment, "id" | "content"> {
  guestUserId?: number;
  guestUserPassword?: string;
}
