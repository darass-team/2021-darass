import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { Comment, CreateCommentRequestData } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { AlertError } from "../utils/Error";

const _createComment = async (_data: CreateCommentRequestData) => {
  try {
    const response = await request.post(QUERY.COMMENT, _data);

    return response.data;
  } catch (error) {
    if (error.response.data.code === 700) {
      throw new AlertError("관리자가 프로젝트를 삭제하여 더 이상 댓글을 작성할 수 없습니다.");
    }

    throw new AlertError("댓글 생성에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<Comment, Error, CreateCommentRequestData>(_data => _createComment(_data), {
    onSuccess: () => {
      queryClient.invalidateQueries(REACT_QUERY_KEY.COMMENT);
      queryClient.invalidateQueries(REACT_QUERY_KEY.COMMENT_COUNT);
    }
  });

  const isLoading = createMutation.isLoading;
  const error = createMutation.error;

  const createComment = async (data: CreateCommentRequestData) => {
    const comment = await createMutation.mutateAsync(data);

    return comment;
  };

  return { createComment, isLoading, error };
};
