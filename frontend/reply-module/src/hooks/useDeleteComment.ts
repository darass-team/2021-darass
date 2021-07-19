import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { Comment, DeleteCommentRequestParameter } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";

const _deleteComment = async ({ id, guestUserId, guestUserPassword }: DeleteCommentRequestParameter) => {
  const data = await request.delete(
    `${QUERY.COMMENT}/${id}/?guestUserId=${guestUserId}&guestUserPassword=${guestUserPassword}`
  );

  return data;
};

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, DeleteCommentRequestParameter>(data => _deleteComment(data), {
    onSuccess: (_, deletedComment) => {
      queryClient.setQueryData<Comment[] | undefined>(REACT_QUERY_KEY.COMMENT, comments => {
        return comments?.filter(comment => comment.id !== deletedComment.id);
      });
    }
  });

  const isLoading = deleteMutation.isLoading;
  const error = deleteMutation.error;

  const deleteComment = async (data: DeleteCommentRequestParameter) => {
    return deleteMutation.mutateAsync(data);
  };

  return { deleteComment, isLoading, error };
};

export { useDeleteComment };
