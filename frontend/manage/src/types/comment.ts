import { User } from "./user";

export interface Comment {
  id: number;
  content: string;
  user: User;
  likingUsers: User[];
  createdDate: string;
  modifiedDate: string;
}
