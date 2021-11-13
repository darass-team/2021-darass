import { useMessageChannelFromReplyModuleContext } from "@/hooks";
import { useCommentContext } from "@/hooks/contexts/useCommentContext";
import { EditCommentParameter } from "@/types/comment";
import { editComment as _editComment } from "@/utils/api";
import { useEffect } from "react";
import { useMutation } from "simple-react-query";

export const useEditComment = () => {
  const { refetchAllComment } = useCommentContext();
  const { openAlert } = useMessageChannelFromReplyModuleContext();

  const { isLoading, isError, error, data, mutation } = useMutation<EditCommentParameter, void>({
    query: (_data: EditCommentParameter) => _editComment(_data),
    onSuccess: () => {
      refetchAllComment();
    }
  });

  useEffect(() => {
    if (error) {
      openAlert(error.message);
    }
  }, [error]);

  return { editComment: mutation, isLoading, error };
};
