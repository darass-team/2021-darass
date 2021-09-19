import { AlertError } from "../../../utils/Error";
import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../../../constants/api";
import { request } from "../../../utils/request";
import { DeleteCommentRequestParameter } from "../../../types/comment";
import { REACT_QUERY_KEY } from "../../../constants/reactQueryKey";
import axios from "axios";

const _deleteComment = async ({ id, guestUserId, guestUserPassword }: DeleteCommentRequestParameter) => {
  try {
    const response = await request.delete(
      `${QUERY.COMMENT}/${id}/?guestUserId=${guestUserId}&guestUserPassword=${guestUserPassword}`
    );

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 900) {
      throw new AlertError("이미 삭제된 댓글입니다.");
    }

    if (error.response?.data.code === 903) {
      throw new AlertError("해당 댓글을 삭제할 권한이 없습니다.");
    }

    throw new AlertError("댓글 삭제에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
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
