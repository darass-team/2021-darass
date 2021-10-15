import { useUserContext } from "@/hooks/contexts/useUserContext";
import { User } from "@/types/user";
import { patchEditUser } from "@/utils/api";
import { useMutation } from "../useMutation";

export const useEditUser = () => {
  const { refetchUser } = useUserContext();

  const { isLoading, error, mutation } = useMutation<FormData, User>({
    query: (data: FormData) => patchEditUser(data),
    onSuccess: () => {
      refetchUser?.();
    }
  });

  return { editUser: mutation, isLoading, error };
};
