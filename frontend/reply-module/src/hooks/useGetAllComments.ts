import { useQuery } from "react-query";
import { QUERY } from "../constants/api";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { Comment } from "../types";
import { GetCommentsRequestParams } from "../types/comment";
import { request } from "../utils/request";

const getAllComments = async ({ url, projectSecretKey }: GetCommentsRequestParams) => {
  if (!url || !projectSecretKey) return undefined;

  const response = await request.get(QUERY.GET_ALL_COMMENTS(url, projectSecretKey));

  if (response.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data;
};

export const useGetAllComments = ({ url, projectSecretKey }: GetCommentsRequestParams) => {
  const {
    data: comments,
    isLoading,
    error
  } = useQuery<Comment[], Error>(REACT_QUERY_KEY.COMMENT, () => getAllComments({ url, projectSecretKey }));

  return { comments, isLoading, error };
};
