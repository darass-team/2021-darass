import { useQuery } from "react-query";
import { QUERY } from "../constants/api";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { Comment } from "../types";
import { request } from "../utils/request";

interface GetRequestParams {
  url: string | null;
  projectKey?: string | null;
}

const getAllComments = async ({ url, projectKey }: GetRequestParams) => {
  if (!url || !projectKey) return undefined;

  const data = await request.get(QUERY.CREATE_COMMENT(url, projectKey));

  return data;
};

const useGetAllComments = ({ url, projectKey }: GetRequestParams) => {
  const {
    data: comments,
    isLoading,
    error
  } = useQuery<Comment[], Error>(REACT_QUERY_KEY.COMMENT, () => getAllComments({ url, projectKey }));

  return { comments, isLoading, error };
};

export { useGetAllComments };
