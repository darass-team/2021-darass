import { deleteComment as _deleteComment } from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { DeleteCommentRequestParameter } from "@/types/comment";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, DeleteCommentRequestParameter>(data => _deleteComment(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(REACT_QUERY_KEY.COMMENT);
    }
  });

  const isLoading = deleteMutation.isLoading;
  const error = deleteMutation.error;

  const deleteComment = async (data: DeleteCommentRequestParameter) => {
    return await deleteMutation.mutateAsync(data);
  };

  return { deleteComment, isLoading, error };
};
