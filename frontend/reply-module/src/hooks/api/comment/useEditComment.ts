import { useCommentContext } from "@/hooks/contexts/useCommentContext";
import { EditCommentParameter } from "@/types/comment";
import { editComment as _editComment } from "@/utils/api";
import { useMutation } from "../useMutation";

export const useEditComment = () => {
  const { refetchAllComment } = useCommentContext();

  const { isLoading, isError, error, data, mutation } = useMutation<EditCommentParameter, void>({
    query: (_data: EditCommentParameter) => _editComment(_data),
    onSuccess: () => {
      refetchAllComment?.();
    }
  });

  return { editComment: mutation, isLoading, error };
};
