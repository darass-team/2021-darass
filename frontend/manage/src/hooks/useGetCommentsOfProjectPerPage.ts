import moment from "moment";
import { useQuery } from "react-query";
import { QUERY, REACT_QUERY_KEY } from "../constants";
import { Comment, GetCommentsOfProjectPerPageRequest } from "../types/comment";
import { request } from "../utils/request";
import { comments as _comments } from "../__test__/fixture/comments";

const _getAllCommentsOfProject = async ({
  sortOption,
  projectKey,
  startDate,
  endDate,
  page,
  size
}: GetCommentsOfProjectPerPageRequest) => {
  try {
    const today = moment().format("YYYY-MM-DD");

    const urlSearchParam = new URLSearchParams(QUERY.COMMENTS_OF_PROJECT_PER_PAGE + "?");
    urlSearchParam.set("sortOption", sortOption);
    projectKey && urlSearchParam.set("projectKey", projectKey);
    urlSearchParam.set("startDate", startDate || today);
    urlSearchParam.set("endDate", endDate || today);
    urlSearchParam.set("page", `${page}`);
    urlSearchParam.set("size", `${size}`);

    const response = await request.get(decodeURIComponent(urlSearchParam.toString()));

    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

interface Props extends GetCommentsOfProjectPerPageRequest {
  projectId: number;
}

export const useGetCommentsOfProjectPerPage = ({ sortOption, projectKey, startDate, endDate, page, size }: Props) => {
  const {
    data: comments,
    refetch,
    isLoading,
    error
  } = useQuery<Comment[], Error>(
    [REACT_QUERY_KEY.COMMENT_OF_PROJECT_PER_PAGE, projectKey, page],
    () => _getAllCommentsOfProject({ sortOption, projectKey, startDate, endDate, page, size }),
    {
      retry: false,
      enabled: false
    }
  );

  return { comments, refetch, isLoading, error };
};
