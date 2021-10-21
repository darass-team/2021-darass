import { QUERY } from "@/constants";
import { Comment, GetCommentsOfProjectPerPageRequest } from "@/types/comment";
import { AlertError } from "@/utils/alertError";
import { request } from "@/utils/request";
import axios from "axios";
import { useQuery } from "simple-react-query";

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
    if (!projectKey || !sortOption) return;

    const queryURL = QUERY.KEYWORD_COMMENTS_OF_PROJECT_PER_PAGE;

    const urlSearchParam = new URLSearchParams(queryURL + "?");
    urlSearchParam.set("projectKey", projectKey);
    urlSearchParam.set("sortOption", sortOption);
    urlSearchParam.set("keyword", keyword);
    urlSearchParam.set("startDate", startDate);
    urlSearchParam.set("endDate", endDate);
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
  const { refetch, isLoading, isError, data, error, setData, isSuccess, isFetched } = useQuery<{
    comments: Comment[];
    totalComment: number;
    totalPage: number;
  }>({
    enabled: false,
    query: () => _getAllCommentsOfProject({ sortOption, projectKey, startDate, endDate, page, size, keyword })
  });

  const comments = !data || data?.comments.length === 0 ? [] : data.comments;
  const totalComment = data?.totalComment ? data?.totalComment : 0;
  const totalPage = data?.totalPage ? data?.totalPage : 0;

  return { comments, totalComment, totalPage, refetch, isLoading, error, isSuccess, isFetched };
};
