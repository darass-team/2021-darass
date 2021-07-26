import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { Comment, EditCommentParameter, EditCommentRequestData } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";

const _editComment = async (editedComment: EditCommentParameter) => {
  const response = await request.patch<EditCommentRequestData>(`${QUERY.COMMENT}/${editedComment.id}`, {
    content: editedComment.content,
    guestUserId: editedComment.guestUserId,
    guestUserPassword: editedComment.guestUserPassword
  });

  if (response.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data;
};

export const useEditComment = () => {
  const queryClient = useQueryClient();

  const editMutation = useMutation<void, Error, EditCommentParameter>(comment => _editComment(comment), {
    onSuccess: (_, editedComment) => {
      queryClient.setQueryData<Comment[] | undefined>(REACT_QUERY_KEY.COMMENT, comments => {
        return comments?.map(comment => {
          if (comment.id === editedComment.id) {
            return { ...comment, content: editedComment.content };
          }

          return comment;
        });
      });
    }
  });

  const isLoading = editMutation.isLoading;
  const error = editMutation.error;

  const editComment = async (_comment: EditCommentParameter) => {
    return await editMutation.mutateAsync(_comment);
  };

  return { editComment, isLoading, error };
};
