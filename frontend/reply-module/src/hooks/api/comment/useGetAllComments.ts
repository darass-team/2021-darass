import { useUserContext } from "@/hooks/contexts/useUserContext";
import { GetCommentsRequestParams, GetCommentsResponse, Comment } from "@/types/comment";
import { getAllComments } from "@/utils/api";
import { deepObjectEqual } from "@/utils/deepEqual";
import { useEffect } from "react";
import { useQuery } from "simple-react-query";

const compareComments = (prevComments: GetCommentsResponse, currComments: GetCommentsResponse) => {
  if (!prevComments) return false;

  return deepObjectEqual(prevComments, currComments);
};

export const useGetAllComments = ({ url, projectSecretKey, sortOption = "oldest" }: GetCommentsRequestParams) => {
  const { user } = useUserContext();

  const { data, isLoading, refetch, error, setData, isFetched } = useQuery<GetCommentsResponse>({
    enabled: true,
    query: () => getAllComments({ url, projectSecretKey, sortOption }),
    isEqualToPrevDataFunc: compareComments
  });

  useEffect(() => {
    refetch();
  }, [user]);

  const totalCommentsCount = data?.totalComment || 0;
  const totalPage = data?.totalPage || 0;
  const comments = data?.comments || [];

  const setComments = (comments: Comment[]) => setData({ totalComment: totalCommentsCount, totalPage, comments });

  return { totalCommentsCount, totalPage, comments, isLoading, error, refetch, setComments, isFetched };
};
