import { AlertError } from "./../utils/error";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";
import { QUERY, REACT_QUERY_KEY } from "../constants";
import { Comment, GetCommentsOfProjectPerPageRequest } from "../types/comment";
import { request } from "../utils/request";

const _getAllCommentsOfProject = async ({
  sortOption,
  projectKey,
  startDate,
  endDate,
  page,
  size,
  keyword
}: GetCommentsOfProjectPerPageRequest) => {
  try {
    const queryURL =
      keyword.length > 0 ? QUERY.KEYWORD_COMMENTS_OF_PROJECT_PER_PAGE : QUERY.COMMENTS_OF_PROJECT_PER_PAGE;

    const urlSearchParam = new URLSearchParams(queryURL + "?");
    projectKey && urlSearchParam.set("projectKey", projectKey);
    sortOption && urlSearchParam.set("sortOption", sortOption);
    keyword.length > 0 && urlSearchParam.set("keyword", keyword);
    keyword.length === 0 && urlSearchParam.set("startDate", startDate);
    keyword.length === 0 && urlSearchParam.set("endDate", endDate);
    urlSearchParam.set("page", `${page}`);
    urlSearchParam.set("size", `${size}`);

    const response = await request.get(decodeURIComponent(urlSearchParam.toString()));

    return response.data;
  } catch (error) {
    console.error(error);

    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
    }

    throw new AlertError("댓글조회에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

type Props = GetCommentsOfProjectPerPageRequest;

export const useGetCommentsOfProjectPerPage = ({
  sortOption = "latest",
  projectKey,
  startDate,
  endDate,
  page,
  size,
  keyword
}: Props) => {
  const queryClient = useQueryClient();

  const { data, refetch, isLoading, error } = useQuery<
    {
      comments: Comment[];
      totalComment: number;
      totalPage: number;
    },
    Error
  >(
    [REACT_QUERY_KEY.COMMENT_OF_PROJECT_PER_PAGE, projectKey, page],
    () => _getAllCommentsOfProject({ sortOption, projectKey, startDate, endDate, page, size, keyword }),
    {
      retry: false,
      enabled: false
    }
  );

  const prefetch = (pageIndex: number) => {
    queryClient.prefetchQuery([REACT_QUERY_KEY.COMMENT_OF_PROJECT_PER_PAGE, projectKey, pageIndex], async () => {
      const response = await _getAllCommentsOfProject({
        sortOption,
        projectKey,
        startDate,
        endDate,
        page: pageIndex,
        size,
        keyword
      });

      return response;
    });
  };

  const comments = !data || data?.comments.length === 0 ? [] : data.comments;
  const totalComment = data?.totalComment ? data?.totalComment : 0;
  const totalPage = data?.totalPage ? data?.totalPage : 0;

  return { comments, totalComment, totalPage, refetch, isLoading, error, prefetch };
};
