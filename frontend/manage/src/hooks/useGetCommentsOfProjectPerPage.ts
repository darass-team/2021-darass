import { useQuery } from "react-query";
import { QUERY, REACT_QUERY_KEY } from "../constants";
import { Comment, GetCommentsOfProjectPerPageRequest } from "../types/comment";
import { request } from "../utils/request";

const _getAllCommentsOfProject = async ({
  sortOption,
  projectKey,
  startDate,
  endDate,
  page,
  size
}: GetCommentsOfProjectPerPageRequest) => {
  try {
    const urlSearchParam = new URLSearchParams(QUERY.COMMENTS_OF_PROJECT_PER_PAGE + "?");
    projectKey && urlSearchParam.set("projectKey", projectKey);
    sortOption && urlSearchParam.set("sortOption", sortOption);
    urlSearchParam.set("startDate", startDate);
    urlSearchParam.set("endDate", endDate);
    urlSearchParam.set("page", `${page}`);
    urlSearchParam.set("size", `${size}`);
    const response = await request.get(decodeURIComponent(urlSearchParam.toString()));

    return response.data;
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};

type Props = GetCommentsOfProjectPerPageRequest;

export const useGetCommentsOfProjectPerPage = ({
  sortOption = "latest",
  projectKey,
  startDate,
  endDate,
  page,
  size
}: Props) => {
  const { data, refetch, isLoading, error } = useQuery<
    {
      comments: Comment[];
      totalComment: number;
      totalPage: number;
    },
    Error
  >(
    [REACT_QUERY_KEY.COMMENT_OF_PROJECT_PER_PAGE, projectKey, page],
    () => _getAllCommentsOfProject({ sortOption, projectKey, startDate, endDate, page, size }),
    {
      retry: false,
      enabled: false
    }
  );

  const comments = !data || data?.comments.length === 0 ? [] : data.comments;
  const totalComment = data?.totalComment ? data?.totalComment : 0;
  const totalPage = data?.totalPage ? data?.totalPage : 0;

  return { comments, totalComment, totalPage, refetch, isLoading, error };
};
