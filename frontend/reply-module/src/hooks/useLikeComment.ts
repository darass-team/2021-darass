import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { Comment, EditCommentRequestData, GetCommentsResponse, LikeCommentParameter } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { AlertError } from "../utils/Error";
import axios from "axios";

const _likeComment = async (id: Comment["id"]) => {
  try {
    const response = await request.post(QUERY.LIKE_COMMENT(id), {}, { withCredentials: true });

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 800) {
      throw new AlertError("'좋아요'를 누르려면 로그인을 해주세요.");
    }

    if (error.response?.data.code === 900) {
      throw new AlertError("이미 삭제된 댓글입니다.");
    }

    throw new AlertError("잠시 후 다시 시도해주세요.");
  }
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation<void, Error, LikeCommentParameter>(({ commentId }) => _likeComment(commentId), {
    onSuccess: () => {
      queryClient.invalidateQueries(REACT_QUERY_KEY.COMMENT);
    }
  });

  const isLoading = likeMutation.isLoading;
  const error = likeMutation.error;

  const likeComment = async (params: LikeCommentParameter) => {
    return await likeMutation.mutateAsync(params);
  };

  return { likeComment, isLoading, error };
};
