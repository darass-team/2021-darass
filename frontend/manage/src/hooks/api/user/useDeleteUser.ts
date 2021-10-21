import { QUERY } from "@/constants";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { useUserContext } from "@/context/userContext";
import { User } from "@/types/user";
import { AlertError } from "@/utils/alertError";
import { request } from "@/utils/request";
import axios from "axios";
import { useMutation } from "simple-react-query";

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
  const { setUser } = useUserContext();
  const { isLoading, isError, error, data, mutation } = useMutation<void, User>({
    query: _deleteUser,
    onSuccess: () => {
      setUser?.(undefined);
    }
  });

  return { deleteUser: mutation, isLoading, error };
};
