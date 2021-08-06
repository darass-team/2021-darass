import moment from "moment";
import { useQuery } from "react-query";
import { QUERY, REACT_QUERY_KEY } from "../constants";
import { Comment, GetAllCommentOfProjectRequest } from "../types/comment";
import { request } from "../utils/request";
import { comments as _comments } from "../__test__/fixture/comments";

const _getAllCommentsOfProject = async ({
  sortOption,
  projectKey,
  startDate,
  endDate,
  page,
  size
}: GetAllCommentOfProjectRequest) => {
  try {
    const today = moment().format("YYYY-MM-DD");

    const urlSearchParam = new URLSearchParams(QUERY.COMMENTS_OF_PROJECT + "?");
    urlSearchParam.set("sortOption", sortOption);
    urlSearchParam.set("projectKey", projectKey);
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

interface Props extends GetAllCommentOfProjectRequest {
  projectId: number;
}

export const useGetCommentsOfProjectPerPage = ({ sortOption, projectKey, startDate, endDate, page, size }: Props) => {
  const {
    data: comments,
    refetch,
    isLoading,
    error
  } = useQuery<Comment[], Error>(
    [REACT_QUERY_KEY.COMMENT_OF_PROJECT, projectKey, page],
    () => _getAllCommentsOfProject({ sortOption, projectKey, startDate, endDate, page, size }),
    {
      retry: false
    }
  );

  return { comments, refetch, isLoading, error };
};
