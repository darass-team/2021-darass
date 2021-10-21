import { QUERY } from "@/constants/api";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { DeleteCommentRequestParameter } from "@/types/comment";
import { Project } from "@/types/project";
import { AlertError } from "@/utils/alertError";
import { request } from "@/utils/request";
import axios from "axios";
import { useMutation } from "simple-react-query";

const _deleteComment = async ({ id }: DeleteCommentRequestParameter) => {
  try {
    const response = await request.delete(`${QUERY.COMMENT}/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 801 || error.response?.data.code === 806) {
      const newError = new AlertError("로그인이 필요합니다.");
      newError.name = NO_ACCESS_TOKEN;

      throw newError;
    }

    if (error.response?.data.code === 900) {
      throw new AlertError("존재하지 않는 댓글입니다.");
    }

    if (error.response?.data.code === 903) {
      throw new AlertError("해당 댓글에 대한 권한이 없습니다.");
    }

    throw new AlertError("댓글 삭제에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useDeleteComment = () => {
  const { mutation } = useMutation<DeleteCommentRequestParameter, void>({
    query: _deleteComment
  });

  return { deleteComment: mutation };
};
