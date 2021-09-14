import { QUERY, REACT_QUERY_KEY } from "@/constants";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { userContext } from "@/contexts/UserProvider";
import { User } from "@/types/user";
import { AlertError } from "@/utils/error";
import { request } from "@/utils/request";
import axios from "axios";
import { useContext } from "react";
import { useMutation, useQueryClient } from "react-query";

const _editUser = async (data: FormData) => {
  const headers = {
    "Content-Type": "multipart/form-data"
  };

  try {
    const response = await request.patch(QUERY.USER, data, headers);

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

    throw new AlertError("유저정보 수정에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useEditUser = () => {
  const queryClient = useQueryClient();
  const { refreshAccessToken } = useContext(userContext);

  const editMutation = useMutation<User, Error, FormData>(data => _editUser(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(REACT_QUERY_KEY.USER);
    }
  });

  const isLoading = editMutation.isLoading;
  const error = editMutation.error;

  const editUser = async (data: FormData) => {
    try {
      const user = await editMutation.mutateAsync(data);

      return user;
    } catch (error) {
      if ((error as Error)?.name === NO_ACCESS_TOKEN) {
        return await refetch(data);
      } else {
        throw error;
      }
    }
  };

  const refetch = async (data: FormData) => {
    try {
      await refreshAccessToken();

      return await editMutation.mutateAsync(data);
    } catch (error) {
      if ((error as Error)?.name === NO_ACCESS_TOKEN) {
        return null;
      }

      throw error;
    }
  };

  return { editUser, isLoading, error };
};
