import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { Comment } from "@/types";
import { GetCommentsResponse } from "@/types/comment";
import { User } from "@/types/user";
import { getSecretComment } from "@/utils/api";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

interface Props {
  commentId: Comment["id"];
  guestUserId: User["id"];
  guestUserPassword: string;
}

export const useGetSecretComment = ({ commentId, guestUserId, guestUserPassword }: Props) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error, refetch } = useQuery<Comment, Error>(
    [REACT_QUERY_KEY.SECRET_COMMENT],
    () => getSecretComment({ commentId, guestUserId, guestUserPassword }),
    {
      enabled: false,
      retry: false
    }
  );

  useEffect(() => {
    if (!data) return;

    queryClient.setQueryData<GetCommentsResponse | undefined>([REACT_QUERY_KEY.COMMENT], commentData => {
      if (!commentData) return;

      const newComments: Comment[] = commentData.comments.reduce((acc: Comment[], curr: Comment) => {
        if (curr.id === data.id) {
          curr.content = data.content;
        }

        acc.push(curr);

        return acc;
      }, []);

      return {
        totalComment: commentData.totalComment,
        totalPage: commentData.totalPage,
        comments: newComments
      };
    });
  }, [data]);

  return { data, isLoading, error, refetch };
};
