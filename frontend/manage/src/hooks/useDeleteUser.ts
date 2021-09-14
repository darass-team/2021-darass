import { QUERY, REACT_QUERY_KEY } from "@/constants";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { userContext } from "@/contexts/UserProvider";
import { User } from "@/types/user";
import { AlertError } from "@/utils/error";
import { request } from "@/utils/request";
import axios from "axios";
import { useContext, useEffect } from "react";
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

    if (error.response?.data.code === 801 || error.response?.data.code === 806) {
      const newError = new AlertError("로그인이 필요합니다.");
      newError.name = NO_ACCESS_TOKEN;

      throw newError;
    }

    throw new AlertError("회원탈퇴에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { refreshAccessToken } = useContext(userContext);

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
    try {
      return await deleteMutation.mutateAsync();
    } catch (error) {
      if ((error as Error)?.name === NO_ACCESS_TOKEN) {
        return await refetch();
      } else {
        throw error;
      }
    }
  };

  const refetch = async () => {
    try {
      await refreshAccessToken();

      return await deleteMutation.mutateAsync();
    } catch (error) {
      if ((error as Error)?.name === NO_ACCESS_TOKEN) {
        return null;
      }

      throw error;
    }
  };

  return { deleteUser, isLoading, error };
};
