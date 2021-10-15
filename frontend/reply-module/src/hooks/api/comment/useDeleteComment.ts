import { useCommentContext } from "@/hooks/contexts/useCommentContext";
import { DeleteCommentRequestParameter } from "@/types/comment";
import { deleteComment as _deleteComment } from "@/utils/api";
import { useMutation } from "../useMutation";

export const useDeleteComment = () => {
  const { refetchAllComment } = useCommentContext();

  const { isLoading, isError, error, data, mutation } = useMutation<DeleteCommentRequestParameter, void>({
    query: (_data: DeleteCommentRequestParameter) => _deleteComment(_data),
    onSuccess: () => {
      refetchAllComment?.();
    }
  });

  return { deleteComment: mutation, isLoading, error };
};
