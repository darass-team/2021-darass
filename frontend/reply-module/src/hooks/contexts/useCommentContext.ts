import { Comment } from "@/types";
import { createContext, useContext } from "react";

export const CommentContext = createContext(
  {} as {
    refetchAllComment: () => void;
    setComments: (comments: Comment[]) => void;
    comments: Comment[];
  }
);

export const useCommentContext = () => useContext(CommentContext);
