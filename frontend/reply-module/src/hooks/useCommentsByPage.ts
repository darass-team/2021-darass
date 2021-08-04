import { useQuery } from "react-query";
import { QUERY } from "../constants/api";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { Comment } from "../types";
import { GetCommentsRequestParams } from "../types/comment";
import { request } from "../utils/request";

const getCommentsByPage = async ({ url, projectSecretKey, sortOption, pageParam }: GetCommentsRequestParams) => {
  if (!url || !projectSecretKey) return undefined;

  try {
    const response = await request.get(QUERY.GET_ALL_COMMENTS({ url, projectSecretKey, sortOption, pageParam }));
    return response.data;
  } catch (error) {
    throw new Error("댓글을 불러오는데 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useCommentsByPage = ({
  url,
  projectSecretKey,
  sortOption = "oldest",
  pageParam = 1
}: GetCommentsRequestParams) => {
  const {
    data: comments,
    isLoading,
    error,
    refetch
  } = useQuery<Comment[], Error>(REACT_QUERY_KEY.COMMENT, () =>
    getCommentsByPage({ url, projectSecretKey, sortOption, pageParam })
  );

  return { comments, isLoading, error, refetch };
};
