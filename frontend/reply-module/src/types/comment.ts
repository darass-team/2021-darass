import { User } from "./user";

export interface Comment {
  id: number;
  content: string;
  user: User;
  createdAt: string;
}
