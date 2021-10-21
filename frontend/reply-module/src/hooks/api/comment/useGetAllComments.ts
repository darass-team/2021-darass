import { useUserContext } from "@/hooks/contexts/useUserContext";
import { GetCommentsRequestParams, GetCommentsResponse, Comment } from "@/types/comment";
import { getAllComments } from "@/utils/api";
import { useEffect } from "react";
import { useQuery } from "simple-react-query";
export const useGetAllComments = ({ url, projectSecretKey, sortOption = "oldest" }: GetCommentsRequestParams) => {
  const { user } = useUserContext();

  const { data, isLoading, refetch, error, setData } = useQuery<GetCommentsResponse>({
    enabled: true,
    query: () => getAllComments({ url, projectSecretKey, sortOption })
  });

  useEffect(() => {
    refetch();
  }, [user]);

  const totalCommentsCount = data?.totalComment || 0;
  const totalPage = data?.totalPage || 0;
  const comments = data?.comments || [];

  const setComments = (comments: Comment[]) => setData({ totalComment: totalCommentsCount, totalPage, comments });

  return { totalCommentsCount, totalPage, comments, isLoading, error, refetch, setComments };
};
