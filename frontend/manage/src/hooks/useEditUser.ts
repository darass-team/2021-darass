import { useMutation, useQueryClient } from "react-query";
import { QUERY, REACT_QUERY_KEY } from "../constants";
import { EditUserRequest, User } from "../types/user";
import { request } from "../utils/request";

const _editUser = async ({ nickName }: EditUserRequest) => {
  try {
    const response = await request.patch(QUERY.USER, { nickName });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  const editMutation = useMutation<User, Error, EditUserRequest>(({ nickName }) => _editUser({ nickName }), {
    onSuccess: () => {
      queryClient.invalidateQueries(REACT_QUERY_KEY.USER);
    }
  });

  const isLoading = editMutation.isLoading;
  const error = editMutation.error;

  const editUser = async ({ nickName }: EditUserRequest) => {
    const user = await editMutation.mutateAsync({ nickName });

    return user;
  };

  return { editUser, isLoading, error };
};
