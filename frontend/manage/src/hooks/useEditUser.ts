import { useMutation, useQueryClient } from "react-query";
import { QUERY, REACT_QUERY_KEY } from "../constants";
import { User } from "../types/user";
import { request } from "../utils/request";

const _editUser = async (data: FormData) => {
  const headers = {
    "Content-Type": "multipart/form-data"
  };

  try {
    const response = await request.patch(QUERY.USER, data, headers);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  const editMutation = useMutation<User, Error, FormData>(data => _editUser(data), {
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
