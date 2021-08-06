import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { EditCommentParameter, EditCommentRequestData } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { AlertError } from "../utils/Error";

const _editComment = async (editedComment: EditCommentParameter) => {
  try {
    const response = await request.patch<EditCommentRequestData>(`${QUERY.COMMENT}/${editedComment.id}`, {
      content: editedComment.content,
      guestUserId: editedComment.guestUserId,
      guestUserPassword: editedComment.guestUserPassword
    });
    return response.data;
  } catch (error) {
    if (error.response.data.code === 903) {
      throw new AlertError("해당 댓글을 수정할 권한이 없습니다.");
    }

    throw new AlertError("댓글을 수정하는데 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useEditComment = () => {
  const queryClient = useQueryClient();

  const editMutation = useMutation<void, Error, EditCommentParameter>(comment => _editComment(comment), {
    onSuccess: () => {
      queryClient.invalidateQueries(REACT_QUERY_KEY.COMMENT);
      queryClient.invalidateQueries(REACT_QUERY_KEY.COMMENT_COUNT);
    }
  });

  const isLoading = editMutation.isLoading;
  const error = editMutation.error;

  const editComment = async (_comment: EditCommentParameter) => {
    return await editMutation.mutateAsync(_comment);
  };

  return { editComment, isLoading, error };
};
