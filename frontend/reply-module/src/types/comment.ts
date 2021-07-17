import { User } from "./user";

export interface Comment {
  id: number;
  content: string;
  user: User;
  createdDate: string;
  modifiedDate: string;
}

export interface GuestUserInfo {
  guestUserId?: number;
  guestNickName?: string;
  guestUserPassword?: string;
}

export interface CreateCommentRequestData extends Omit<GuestUserInfo, "guestUserId"> {
  url: string | null;
  projectSecretKey: string | null;
  content: string;
}

export interface GetRequestParams {
  url: string | null;
  projectKey?: string | null;
}

export type EditCommentRequestData = Pick<Comment, "content"> & Omit<GuestUserInfo, "guestNickName">;

export type EditCommentParameter = Pick<Comment, "id" | "content"> & Omit<GuestUserInfo, "guestNickName">;

export type DeleteCommentRequestParameter = Pick<Comment, "id"> & Omit<GuestUserInfo, "guestNickName">;
