import { useMutation, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { request } from "../utils/request";
import { Comment, CreateCommentRequestData } from "../types/comment";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";

const _createComment = async (_data: CreateCommentRequestData) => {
  const data = await request.post(QUERY.COMMENT, _data);

  return data;
};

const useCreateComment = () => {
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
    const project = await createMutation.mutateAsync(data);

    return project;
  };

  return { createComment, isLoading, error };
};

export { useCreateComment };
