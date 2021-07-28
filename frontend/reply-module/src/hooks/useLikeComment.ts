import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { Comment, EditCommentRequestData, LikeCommentParameter } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";

const _likeComment = async (id: Comment["id"]) => {
  try {
    const response = await request.post<EditCommentRequestData>(QUERY.LIKE_COMMENT(id));

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation<void, Error, LikeCommentParameter>(
    ({ user, commentId }) => _likeComment(commentId),
    {
      onSuccess: (_, { user, commentId }) => {
        queryClient.setQueryData<Comment[] | undefined>(REACT_QUERY_KEY.COMMENT, comments => {
          return comments?.map(comment => {
            if (!user) return comment;

            if (comment.id === commentId) {
              if (comment.likingUsers.some(likingUser => likingUser.id === user.id)) {
                return {
                  ...comment,
                  likingUsers: comment.likingUsers.filter(likingUser => likingUser.id !== user.id)
                };
              }
              return { ...comment, likingUsers: comment.likingUsers.concat(user) };
            }

            return comment;
          });
        });
      }
    }
  );

  const isLoading = likeMutation.isLoading;
  const error = likeMutation.error;

  const likeComment = async (params: LikeCommentParameter) => {
    return await likeMutation.mutateAsync(params);
  };

  return { likeComment, isLoading, error };
};
