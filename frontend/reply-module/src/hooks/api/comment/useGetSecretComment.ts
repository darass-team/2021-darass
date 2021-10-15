import { useCommentContext } from "@/hooks/contexts/useCommentContext";
import { Comment } from "@/types";
import { User } from "@/types/user";
import { getSecretComment } from "@/utils/api";
import { useEffect } from "react";
import { useQuery } from "../useQuery";

interface Props {
  commentId: Comment["id"];
  guestUserId: User["id"];
  guestUserPassword: string;
}

export const useGetSecretComment = ({ commentId, guestUserId, guestUserPassword }: Props) => {
  const { setComments, comments } = useCommentContext();

  const { data, isLoading, error, refetch } = useQuery<Comment>({
    enabled: false,
    query: () => getSecretComment({ commentId, guestUserId, guestUserPassword })
  });

  useEffect(() => {
    if (!data) return;

    const newComments: Comment[] = comments.reduce((acc: Comment[], curr) => {
      if (curr.id === data.id) {
        curr.content = data.content;
        curr.readable = data.readable;
      }

      acc.push(curr);

      return acc;
    }, []);

    setComments?.(newComments);
  }, [data]);

  return { data, isLoading, error, refetch };
};
