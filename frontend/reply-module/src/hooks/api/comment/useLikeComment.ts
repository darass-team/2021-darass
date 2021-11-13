import { useMessageChannelFromReplyModuleContext } from "@/hooks";
import { useCommentContext } from "@/hooks/contexts/useCommentContext";
import { LikeCommentParameter } from "@/types/comment";
import { likeComment as makeLikeComment } from "@/utils/api";
import { useEffect } from "react";
import { useMutation } from "simple-react-query";

export const useLikeComment = () => {
  const { refetchAllComment } = useCommentContext();
  const { openAlert } = useMessageChannelFromReplyModuleContext();

  const {
    isLoading,
    error,
    mutation: likeComment
  } = useMutation<LikeCommentParameter, void>({
    query: ({ commentId }: LikeCommentParameter) => makeLikeComment(commentId),
    onSuccess: () => {
      refetchAllComment();
    }
  });

  useEffect(() => {
    if (error) {
      openAlert(error.message);
    }
  }, [error]);

  return { likeComment, isLoading, error };
};
