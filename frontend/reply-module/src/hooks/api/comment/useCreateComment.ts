import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { Comment, CreateCommentRequestData } from "@/types/comment";
import { postCreateComment } from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<Comment, Error, CreateCommentRequestData>(_data => postCreateComment(_data), {
    onSuccess: () => {
      queryClient.invalidateQueries(REACT_QUERY_KEY.COMMENT);
    }
  });

  const isLoading = createMutation.isLoading;
  const error = createMutation.error;

  const createComment = async (data: CreateCommentRequestData) => {
    const comment = await createMutation.mutateAsync(data);

    return comment;
  };

  return { createComment, isLoading, error };
};
