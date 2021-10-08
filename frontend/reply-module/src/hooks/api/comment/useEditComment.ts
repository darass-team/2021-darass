import { editComment as _editComment } from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";
import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { EditCommentParameter } from "@/types/comment";

export const useEditComment = () => {
  const queryClient = useQueryClient();

  const editMutation = useMutation<void, Error, EditCommentParameter>(comment => _editComment(comment), {
    onSuccess: () => {
      queryClient.invalidateQueries(REACT_QUERY_KEY.COMMENT);
    }
  });

  const isLoading = editMutation.isLoading;
  const error = editMutation.error;

  const editComment = async (_comment: EditCommentParameter) => {
    return await editMutation.mutateAsync(_comment);
  };

  return { editComment, isLoading, error };
};
