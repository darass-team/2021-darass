import { Project } from "./project";
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

export type SortOption = "latest" | "oldest" | "like";

export interface GetCommentsOfProjectPerPageRequest {
  sortOption?: SortOption;
  projectKey?: Project["secretKey"];
  startDate: string;
  endDate: string;
  page: number;
  size: number;
  keyword: string;
}

export interface DeleteCommentRequestParameter {
  id: Comment["id"];
}

export type GetCommentCountOfProject = GetCommentsOfProjectPerPageRequest;

export interface GetAlarmResponse {
  id: number;
  commentAlarmType: "CREATE_COMMENT" | "CREATE_SUB_COMMENT" | "CREATE_COMMENT_LIKE";
  sender: User;
  receiver: User;
  comment: Comment;
  createdDate: string;
}
