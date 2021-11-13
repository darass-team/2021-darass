import { useMessageChannelFromReplyModuleContext } from "@/hooks";
import { useCommentContext } from "@/hooks/contexts/useCommentContext";
import { DeleteCommentRequestParameter } from "@/types/comment";
import { deleteComment as _deleteComment } from "@/utils/api";
import { useEffect } from "react";
import { useMutation } from "simple-react-query";

export const useDeleteComment = () => {
  const { refetchAllComment } = useCommentContext();
  const { openAlert } = useMessageChannelFromReplyModuleContext();

  const { isLoading, isError, error, data, mutation } = useMutation<DeleteCommentRequestParameter, void>({
    query: (_data: DeleteCommentRequestParameter) => _deleteComment(_data),
    onSuccess: () => {
      refetchAllComment();
    }
  });

  useEffect(() => {
    if (error) {
      openAlert(error.message);
    }
  }, [error]);

  return { deleteComment: mutation, isLoading, error };
};
