import { QUERY, REACT_QUERY_KEY } from "@/constants";
import { User } from "@/types/user";
import { AlertError } from "@/utils/error";
import { request } from "@/utils/request";
import { getSessionStorage, removeSessionStorage, setSessionStorage } from "@/utils/sessionStorage";
import axios from "axios";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";

const getUser = async () => {
  try {
    const response = await request.get(QUERY.USER, { withCredentials: true });

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 801) {
      throw new Error("유효하지 않은 토큰입니다.");
    }

    if (error.response?.data.code === 806) {
      const newError = new Error("액세스 토큰이 존재하지 않습니다.");
      newError.name = "noAccessToken";

      throw newError;
    }

    throw new AlertError("유저정보 조회에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useUser = () => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error
  } = useQuery<User, Error>([REACT_QUERY_KEY.USER], getUser, {
    retry: false,
    refetchOnWindowFocus: false,
    initialData: getSessionStorage("user")
  });

  const clear = () => {
    queryClient.setQueryData<User | undefined>(REACT_QUERY_KEY.USER, user => {
      return undefined;
    });
  };

  const invalidate = () => {
    queryClient.invalidateQueries([REACT_QUERY_KEY.USER]);
  };

  useEffect(() => {
    if (user) {
      setSessionStorage("user", user);
    } else {
      removeSessionStorage("user");
    }
  }, [user]);

  return { user, isLoading, error, invalidate, clear };
};
