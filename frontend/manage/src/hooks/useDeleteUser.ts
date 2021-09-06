import { QUERY, REACT_QUERY_KEY } from "@/constants";
import { User } from "@/types/user";
import { AlertError } from "@/utils/error";
import { request } from "@/utils/request";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const _deleteUser = async () => {
  try {
    const response = await request.delete(QUERY.USER);

    return response.data;
  } catch (error) {
    console.error(error);

    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 801) {
      throw new AlertError("로그인이 필요합니다.");
    }

    throw new AlertError("회원탈퇴에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
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
