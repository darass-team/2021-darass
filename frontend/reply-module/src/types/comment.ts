import { User } from "./user";

export interface Comment {
  id: number;
  content: string;
  user: User;
  likingUsers: User[];
  subComments: Comment[];
  createdDate: string;
  modifiedDate: string;
  secret: boolean;
  readable: boolean;
  url: string;
}

export interface GuestUserInfo {
  guestUserId?: User["id"];
  guestNickName?: User["nickName"];
  guestUserPassword?: string;
}

export type GuestUserConfirmInfo = Omit<GuestUserInfo, "guestNickName">;

export interface ScriptInfo {
  url: string | null;
  projectSecretKey: string | null;
}

export interface CreateCommentRequestData extends Omit<GuestUserInfo, "guestUserId">, ScriptInfo {
  content: string;
  parentId?: Comment["id"];
  secret: boolean;
}

export interface GetCommentsRequestParams extends ScriptInfo {
  sortOption?: string;
}

export interface GetCommentsResponse {
  totalComment: number;
  totalPage: number;
  comments: Comment[];
}

export interface GetAlarmResponse {
  id: number;
  commentAlarmType: "CREATE_COMMENT" | "CREATE_SUB_COMMENT" | "CREATE_COMMENT_LIKE";
  sender: User;
  receiver: User;
  comment: Comment;
  createdDate: string;
}

export type GetProjectRequestParams = Pick<ScriptInfo, "projectSecretKey">;

export type EditCommentRequestData = Pick<Comment, "content" | "secret"> & Omit<GuestUserInfo, "guestNickName">;

export type EditCommentParameter = Pick<Comment, "id" | "content" | "secret"> & Omit<GuestUserInfo, "guestNickName">;

export type DeleteCommentRequestParameter = Pick<Comment, "id"> & Omit<GuestUserInfo, "guestNickName">;

export type LikeCommentParameter = { commentId: Comment["id"] };
