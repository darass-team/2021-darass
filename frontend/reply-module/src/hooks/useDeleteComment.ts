import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { Comment } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";

const _deleteComment = async (id: Comment["id"]) => {
  const data = await request.delete(`${QUERY.COMMENT}/${id}`);

  return data;
};

const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, Comment["id"]>(id => _deleteComment(id), {
    onSuccess: (_, commentId) => {
      queryClient.setQueryData<Comment[] | undefined>(REACT_QUERY_KEY.COMMENT, comments => {
        return comments?.filter(comment => comment.id !== commentId);
      });
    }
  });

  const isLoading = deleteMutation.isLoading;
  const error = deleteMutation.error;

  const deleteComment = (id: Comment["id"]) => {
    deleteMutation.mutateAsync(id);
  };

  return { deleteComment, isLoading, error };
};

export { useDeleteComment };
