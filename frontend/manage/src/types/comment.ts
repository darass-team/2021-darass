import { Project } from "./project";
import { User } from "./user";

export interface Comment {
  id: number;
  content: string;
  user: User;
  likingUsers: User[];
  createdDate: string;
  modifiedDate: string;
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
}

export interface DeleteCommentRequestParameter {
  id: Comment["id"];
}

export type GetCommentCountOfProject = GetCommentsOfProjectPerPageRequest;
