import { Project } from "./../types/project";
import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { DeleteCommentRequestParameter } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import axios from "axios";
import { AlertError } from "../utils/error";

const _deleteComment = async ({ id }: DeleteCommentRequestParameter) => {
  try {
    const response = await request.delete(`${QUERY.COMMENT}/${id}`);

    return response.data;
  } catch (error) {
    console.error(error);
    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
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

interface Props {
  projectKey?: Project["secretKey"];
  page?: number;
}

export const useDeleteComment = ({ projectKey, page }: Props) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<void, Error, DeleteCommentRequestParameter>(({ id }) => _deleteComment({ id }), {
    onSuccess: () => {
      queryClient.invalidateQueries([REACT_QUERY_KEY.COMMENT_OF_PROJECT_PER_PAGE, projectKey, page]);
    }
  });

  const deleteComment = async ({ id }: DeleteCommentRequestParameter) => {
    return await deleteMutation.mutateAsync({ id });
  };

  return { deleteComment };
};
