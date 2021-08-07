import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { Comment, EditCommentRequestData, GetCommentsByPageResponse, LikeCommentParameter } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { AlertError } from "../utils/Error";

const _likeComment = async (id: Comment["id"]) => {
  try {
    const response = await request.post<EditCommentRequestData>(QUERY.LIKE_COMMENT(id));

    return response.data;
  } catch (error) {
    if (error.response.data.code === 800) {
      throw new AlertError("'좋아요'를 누르려면 로그인을 해주세요.");
    }

    throw new AlertError("잠시 후 다시 시도해주세요.");
  }
};

export const useLikeComment = () => {
  const queryClient = useQueryClient();

  const likeMutation = useMutation<void, Error, LikeCommentParameter>(
    ({ user, commentId }) => _likeComment(commentId),
    {
      onSuccess: (_, { user, commentId }) => {
        queryClient.setQueryData<GetCommentsByPageResponse | undefined>(REACT_QUERY_KEY.COMMENT, oldData => {
          if (!oldData) return;
          const newComments =
            oldData?.comments?.map(comment => {
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
            }) || [];

          return { ...oldData, comments: newComments };
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
