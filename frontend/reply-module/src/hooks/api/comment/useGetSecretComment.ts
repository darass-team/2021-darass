import { useCommentContext } from "@/hooks/contexts/useCommentContext";
import { Comment } from "@/types";
import { User } from "@/types/user";
import { getSecretComment } from "@/utils/api";
import { useEffect } from "react";
import { useQuery } from "simple-react-query";

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

    const newComments: Comment[] = comments?.reduce((acc: Comment[], comment) => {
      const isRootComment = comment.id === data.id;
      if (isRootComment) {
        comment.readable = true;
        comment.subComments.forEach(subComment => {
          subComment.readable = true;
        });
      } else {
        comment.subComments.forEach(subComment => {
          if (subComment.id === data.id) {
            subComment.readable = true;
          }
        });
      }

      acc.push(comment);

      return acc;
    }, []);

    setComments?.(newComments);
  }, [data]);

  return { data, isLoading, error, refetch };
};
