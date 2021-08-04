import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { Comment, DeleteCommentRequestParameter } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";

const _deleteComment = async ({ id, guestUserId, guestUserPassword }: DeleteCommentRequestParameter) => {
  try {
    const response = await request.delete(
      `${QUERY.COMMENT}/${id}/?guestUserId=${guestUserId}&guestUserPassword=${guestUserPassword}`
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

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
