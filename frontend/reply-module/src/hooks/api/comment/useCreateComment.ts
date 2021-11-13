import { useMessageChannelFromReplyModuleContext } from "@/hooks";
import { useCommentContext } from "@/hooks/contexts/useCommentContext";
import { Comment, CreateCommentRequestData } from "@/types/comment";
import { postCreateComment } from "@/utils/api";
import { useEffect } from "react";
import { useMutation } from "simple-react-query";

export const useCreateComment = () => {
  const { refetchAllComment } = useCommentContext();
  const { openAlert } = useMessageChannelFromReplyModuleContext();

  const { isLoading, isError, error, data, mutation } = useMutation<CreateCommentRequestData, Comment>({
    query: (_data: CreateCommentRequestData) => postCreateComment(_data),
    onSuccess: () => {
      refetchAllComment();
    }
  });

  useEffect(() => {
    if (error) {
      openAlert(error.message);
    }
  }, [error]);

  return { createComment: mutation, isLoading, error };
};
