import { Comment } from "@/types/comment";
import { guestUser, socialLoginUser, socialLoginUser2 } from "./user";

export const comments: Comment[] = [].sort(() => Math.random() - 0.5);
