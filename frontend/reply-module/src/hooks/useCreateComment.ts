import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { Comment, CreateCommentRequestData } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";

const _createComment = async (_data: CreateCommentRequestData) => {
  try {
    const response = await request.post(QUERY.COMMENT, _data);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const useCreateComment = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation<Comment, Error, CreateCommentRequestData>(_data => _createComment(_data), {
    onSuccess: data => {
      queryClient.setQueryData<Comment[] | undefined>(REACT_QUERY_KEY.COMMENT, comments => {
        return comments?.concat(data);
      });
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
