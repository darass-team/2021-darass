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
  sortOption: SortOption;
  projectKey?: Project["secretKey"];
  startDate: string | null;
  endDate: string | null;
  page: number;
  size: number;
}

export interface DeleteCommentRequestParameter {
  id: Comment["id"];
}

export interface GetCommentCountOfProject {
  projectKey?: Project["secretKey"];
}
