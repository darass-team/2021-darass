import { useQuery } from "react-query";
import { QUERY } from "../constants/api";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { GetCommentsResponse, GetCommentsRequestParams } from "../types/comment";
import { request } from "../utils/request";

const getAllComments = async ({ url, projectSecretKey, sortOption }: GetCommentsRequestParams) => {
  if (!url || !projectSecretKey) return undefined;

  try {
    const response = await request.get(QUERY.GET_ALL_COMMENTS({ url, projectSecretKey, sortOption }));
    return response.data;
  } catch (error) {
    throw new Error("댓글을 불러오는데 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useGetAllComments = ({ url, projectSecretKey, sortOption = "oldest" }: GetCommentsRequestParams) => {
  const { data, isLoading, error, refetch } = useQuery<GetCommentsResponse, Error>(REACT_QUERY_KEY.COMMENT, () =>
    getAllComments({ url, projectSecretKey, sortOption })
  );

  const totalCommentsCount = data?.totalComment;
  const totalPage = data?.totalPage;
  const comments = data?.comments;

  return { totalCommentsCount, totalPage, comments, isLoading, error, refetch };
};
