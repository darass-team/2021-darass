import { Comment } from "@/types";
import { createContext, useContext } from "react";

export const CommentContext = createContext<{
  refetchAllComment?: () => void;
  setComments?: (comments: Comment[]) => void;
  comments: Comment[];
}>({
  refetchAllComment: undefined,
  setComments: undefined,
  comments: []
});

export const useCommentContext = () => useContext(CommentContext);
