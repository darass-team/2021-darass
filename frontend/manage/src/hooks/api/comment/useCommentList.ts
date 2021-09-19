import { useState } from "react";
import { Comment } from "@/types/comment";

export const useCommentList = (comments: Comment[]) => {
  const [checkedCommentIds, setCheckedCommentIds] = useState<Comment["id"][]>([]);
  const [isCheckingAllCommentsInCurrentPage, setIsCheckingAllCommentsInCurrentPage] = useState<boolean>(false);

  const updateCheckedCommentId = (commentId: Comment["id"]) => {
    const isAlreadyChecked = checkedCommentIds.find(id => id === commentId);

    if (isAlreadyChecked) {
      setCheckedCommentIds(ids => ids.filter(id => id !== commentId));
      setIsCheckingAllCommentsInCurrentPage(false);
    } else {
      setCheckedCommentIds(ids => ids.concat(commentId));
    }
  };

  const onToggleIsCheckingAllComments = () => {
    if (isCheckingAllCommentsInCurrentPage) {
      setCheckedCommentIds([]);
      setIsCheckingAllCommentsInCurrentPage(false);
    } else {
      setCheckedCommentIds(comments.map(({ id }) => id));
      setIsCheckingAllCommentsInCurrentPage(true);
    }
  };

  return {
    checkedCommentIds,
    setCheckedCommentIds,
    isCheckingAllCommentsInCurrentPage,
    setIsCheckingAllCommentsInCurrentPage,
    updateCheckedCommentId,
    onToggleIsCheckingAllComments
  };
};
