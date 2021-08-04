import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { Comment, EditCommentParameter, EditCommentRequestData } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";

const _editComment = async (editedComment: EditCommentParameter) => {
  try {
    const response = await request.patch<EditCommentRequestData>(`${QUERY.COMMENT}/${editedComment.id}`, {
      content: editedComment.content,
      guestUserId: editedComment.guestUserId,
      guestUserPassword: editedComment.guestUserPassword
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

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
