import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { User } from "@/types/user";
import { patchEditUser } from "@/utils/api";
import { useMutation, useQueryClient } from "react-query";

export const useEditUser = () => {
  const queryClient = useQueryClient();

  const editMutation = useMutation<User, Error, FormData>(data => patchEditUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(REACT_QUERY_KEY.USER);
    }
  });

  const isLoading = editMutation.isLoading;
  const error = editMutation.error;

  const editUser = async (data: FormData) => {
    const user = await editMutation.mutateAsync(data);

    return user;
  };

  return { editUser, isLoading, error };
};
