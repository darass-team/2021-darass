import { useMessageChannelFromReplyModuleContext } from "@/hooks";
import { useUserContext } from "@/hooks/contexts/useUserContext";
import { User } from "@/types/user";
import { patchEditUser } from "@/utils/api";
import { useEffect } from "react";
import { useMutation } from "simple-react-query";

export const useEditUser = () => {
  const { refetchUser } = useUserContext();
  const { openAlert } = useMessageChannelFromReplyModuleContext();

  const { isLoading, error, mutation } = useMutation<FormData, User>({
    query: (data: FormData) => patchEditUser(data),
    onSuccess: () => {
      refetchUser();
    }
  });

  useEffect(() => {
    if (error) {
      openAlert(error.message);
    }
  }, [error]);

  return { editUser: mutation, isLoading, error };
};
