import { useState } from "react";
import { Comment } from "../types/comment";

export const useCommentList = (comments: Comment[]) => {
  const [checkedCommentIds, setCheckedCommentIds] = useState<Comment["id"][]>([]);
  const [checkingAllCommentInCurrentPage, setCheckingAllCommentInCurrentPage] = useState<boolean>(false);

  const updateCheckedCommentId = (commentId: Comment["id"]) => {
    const isAlreadyChecked = checkedCommentIds.find(id => id === commentId);

    if (isAlreadyChecked) {
      setCheckedCommentIds(ids => ids.filter(id => id !== commentId));
      setCheckingAllCommentInCurrentPage(false);
    } else {
      setCheckedCommentIds(ids => ids.concat(commentId));
    }
  };

  const onToggleCheckingAllComments = () => {
    if (checkingAllCommentInCurrentPage) {
      setCheckedCommentIds([]);
      setCheckingAllCommentInCurrentPage(false);
    } else {
      setCheckedCommentIds(comments.map(({ id }) => id));
      setCheckingAllCommentInCurrentPage(true);
    }
  };

  return {
    checkedCommentIds,
    setCheckedCommentIds,
    checkingAllCommentInCurrentPage,
    setCheckingAllCommentInCurrentPage,
    updateCheckedCommentId,
    onToggleCheckingAllComments
  };
};
