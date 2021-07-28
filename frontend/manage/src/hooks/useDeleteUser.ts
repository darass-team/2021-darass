import { useMutation, useQueryClient } from "react-query";
import { QUERY, REACT_QUERY_KEY } from "../constants";
import { User } from "../types/user";
import { request } from "../utils/request";

const _deleteUser = async () => {
  try {
    const response = await request.delete(QUERY.USER);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<User, Error>(() => _deleteUser(), {
    onSuccess: () => {
      queryClient.setQueryData<User | undefined>(REACT_QUERY_KEY.USER, user => {
        return undefined;
      });
    }
  });

  const isLoading = deleteMutation.isLoading;
  const error = deleteMutation.error;

  const deleteUser = async () => {
    await deleteMutation.mutateAsync();
  };

  return { deleteUser, isLoading, error };
};
