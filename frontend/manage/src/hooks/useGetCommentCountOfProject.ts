import { GetCommentCountOfProject } from "./../types/comment";
import { QUERY, REACT_QUERY_KEY } from "../constants";
import { request } from "../utils/request";
import { useQuery } from "react-query";

const getCommentsCountOfProject = async ({ projectKey }: GetCommentCountOfProject) => {
  try {
    const urlSearchParams = new URLSearchParams(QUERY.COMMENTS_COUNT_OF_PROJECT + "?");
    projectKey && urlSearchParams.set("projectKey", projectKey);

    const response = await request.get(decodeURIComponent(urlSearchParams.toString()));

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};

export const useGetCommentCountOfProject = ({ projectKey }: GetCommentCountOfProject) => {
  const { data, refetch, isLoading, error } = useQuery<{ count: number }, Error>(
    REACT_QUERY_KEY.COMMENT_COUNT_OF_PROJECT,
    () => getCommentsCountOfProject({ projectKey }),
    {
      retry: false,
      enabled: false
    }
  );

  const commentsCount = data ? data.count : undefined;

  return { commentsCount, refetch, isLoading, error };
};
