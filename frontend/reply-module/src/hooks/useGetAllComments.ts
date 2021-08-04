import { useQuery } from "react-query";
import { QUERY } from "../constants/api";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { Comment } from "../types";
import { GetCommentsRequestParams } from "../types/comment";
import { request } from "../utils/request";

const getAllComments = async ({ url, projectSecretKey, sortOption, pageParam }: GetCommentsRequestParams) => {
  if (!url || !projectSecretKey) return undefined;

  try {
    const response = await request.get(QUERY.GET_ALL_COMMENTS({ url, projectSecretKey, sortOption, pageParam }));

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const useGetAllComments = ({
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
    getAllComments({ url, projectSecretKey, sortOption, pageParam })
  );

  return { comments, isLoading, error, refetch };
};
