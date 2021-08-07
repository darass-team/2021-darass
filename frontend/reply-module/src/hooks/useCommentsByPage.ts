import { useQuery } from "react-query";
import { QUERY } from "../constants/api";
import { INITIAL_PAGE_PARAM } from "../constants/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { GetCommentsByPageResponse, GetCommentsRequestParams } from "../types/comment";
import { request } from "../utils/request";

const getCommentsByPage = async ({ url, projectSecretKey, sortOption, pageParam }: GetCommentsRequestParams) => {
  if (!url || !projectSecretKey) return undefined;

  try {
    const response = await request.get(QUERY.GET_COMMENTS_BY_PAGE({ url, projectSecretKey, sortOption, pageParam }));
    return response.data;
  } catch (error) {
    throw new Error("댓글을 불러오는데 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useCommentsByPage = ({
  url,
  projectSecretKey,
  sortOption = "oldest",
  pageParam = INITIAL_PAGE_PARAM
}: GetCommentsRequestParams) => {
  const { data, isLoading, error, refetch } = useQuery<GetCommentsByPageResponse, Error>(REACT_QUERY_KEY.COMMENT, () =>
    getCommentsByPage({ url, projectSecretKey, sortOption, pageParam })
  );

  const totalCommentsCount = data?.totalComment;
  const totalPage = data?.totalPage;
  const comments = data?.comments;

  return { totalCommentsCount, totalPage, comments, isLoading, error, refetch };
};
