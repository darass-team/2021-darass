import { useCommentContext } from "@/hooks/contexts/useCommentContext";
import { Comment, CreateCommentRequestData } from "@/types/comment";
import { postCreateComment } from "@/utils/api";
import { useMutation } from "../useMutation";

export const useCreateComment = () => {
  const { refetchAllComment } = useCommentContext();

  const { isLoading, isError, error, data, mutation } = useMutation<CreateCommentRequestData, Comment>({
    query: (_data: CreateCommentRequestData) => postCreateComment(_data),
    onSuccess: () => {
      refetchAllComment?.();
    }
  });

  return { createComment: mutation, isLoading, error };
};
