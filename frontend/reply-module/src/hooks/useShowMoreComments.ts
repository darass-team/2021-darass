import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { Comment, GetCommentsByPageResponse, GetCommentsRequestParams } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";

const _showMoreComments = async ({ url, projectSecretKey, sortOption, pageParam }: GetCommentsRequestParams) => {
  try {
    if (!url || !projectSecretKey) return undefined;

    const response = await request.get(QUERY.GET_COMMENTS_BY_PAGE({ url, projectSecretKey, sortOption, pageParam }));

    return response.data;
  } catch (error) {
    throw new Error("댓글을 더 불러오는 데에 실패하였습니다.");
  }
};

export const useShowMoreComments = () => {
  const queryClient = useQueryClient();

  const showMoreMutation = useMutation<GetCommentsByPageResponse, Error, GetCommentsRequestParams>(
    data => _showMoreComments(data),
    {
      onSuccess: newData => {
        queryClient.setQueryData<GetCommentsByPageResponse | undefined>(REACT_QUERY_KEY.COMMENT, oldData => {
          if (!oldData) return;
          return { ...oldData, comments: oldData.comments.concat(newData.comments) };
        });
      }
    }
  );

  const isLoading = showMoreMutation.isLoading;
  const error = showMoreMutation.error;

  const showMoreComment = async (data: GetCommentsRequestParams) => {
    return await showMoreMutation.mutateAsync(data);
  };

  return { showMoreComment, isLoading, error };
};
