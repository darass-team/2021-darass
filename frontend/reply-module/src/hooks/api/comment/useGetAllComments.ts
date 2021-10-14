import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { GetCommentsRequestParams, GetCommentsResponse } from "@/types/comment";
import { getAllComments } from "@/utils/api";
import { useQuery } from "react-query";

export const useGetAllComments = ({ url, projectSecretKey, sortOption = "oldest" }: GetCommentsRequestParams) => {
  const { data, isLoading, error, refetch } = useQuery<GetCommentsResponse, Error>([REACT_QUERY_KEY.COMMENT], () =>
    getAllComments({ url, projectSecretKey, sortOption })
  );

  const totalCommentsCount = data?.totalComment || 0;
  const totalPage = data?.totalPage;
  const comments = data?.comments || [];

  return { totalCommentsCount, totalPage, comments, isLoading, error, refetch };
};
