import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { useUser } from "@/hooks";
import { GetCommentsRequestParams, GetCommentsResponse } from "@/types/comment";
import { getAllComments } from "@/utils/api";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

export const useGetAllComments = ({ url, projectSecretKey, sortOption = "oldest" }: GetCommentsRequestParams) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { data, isLoading, error, refetch } = useQuery<GetCommentsResponse, Error>([REACT_QUERY_KEY.COMMENT], () =>
    getAllComments({ url, projectSecretKey, sortOption })
  );

  const totalCommentsCount = data?.totalComment || 0;
  const totalPage = data?.totalPage;
  const comments = data?.comments || [];

  useEffect(() => {
    queryClient.invalidateQueries([REACT_QUERY_KEY.COMMENT]);
  }, [user]);

  return { totalCommentsCount, totalPage, comments, isLoading, error, refetch };
};
