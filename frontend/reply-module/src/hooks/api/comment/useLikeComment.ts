import { useCommentContext } from "@/hooks/contexts/useCommentContext";
import { LikeCommentParameter } from "@/types/comment";
import { likeComment as makeLikeComment } from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export const useLikeComment = () => {
  const queryClient = useQueryClient();
  const { refetchAllComment } = useCommentContext();

  const likeMutation = useMutation<void, Error, LikeCommentParameter>(({ commentId }) => makeLikeComment(commentId), {
    onSuccess: () => {
      refetchAllComment?.();
    }
  });

  const isLoading = likeMutation.isLoading;
  const error = likeMutation.error;

  const likeComment = async (params: LikeCommentParameter) => {
    return await likeMutation.mutateAsync(params);
  };

  return { likeComment, isLoading, error };
};
