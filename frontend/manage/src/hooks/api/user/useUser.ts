import { QUERY } from "@/constants";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { TOKEN_REFETCH_TIMER } from "@/constants/timer";
import { User } from "@/types/user";
import { AlertError } from "@/utils/alertError";
import { axiosBearerOption } from "@/utils/customAxios";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { request } from "@/utils/request";
import axios from "axios";
import { useEffect } from "react";
import { useMutation } from "simple-react-query";
import { useQuery } from "simple-react-query";

export const deleteRefreshToken = async () => {
  try {
    const response = await request.delete(QUERY.LOGOUT);

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    throw new AlertError("로그아웃에 실패하였습니다.");
  }
};

export const getAccessTokenByRefreshToken = async () => {
  try {
    const response = await request.post(QUERY.LOGIN_REFRESH, {});
    const { accessToken } = response.data;
    axiosBearerOption.clear();
    axiosBearerOption.setAccessToken(accessToken);

    return accessToken;
  } catch (error) {
    axiosBearerOption.clear();
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    throw new Error("액세스 토큰 재발급에 실패하셨습니다.");
  }
};

const getUser = async () => {
  try {
    const response = await request.get(QUERY.USER);

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 806 || error.response?.data.code === 801) {
      const newError = new Error("액세스 토큰이 존재하지 않습니다.");
      newError.name = NO_ACCESS_TOKEN;

      throw newError;
    }

    throw new AlertError("유저정보 조회에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

const useGetAccessTokenApi = () => {
  const {
    data: accessToken,
    refetch: refetchAccessToken,
    error: accessTokenError,
    setData: setAccessToken,
    clearRefetchInterval
  } = useQuery<string | undefined>({
    query: getAccessTokenByRefreshToken,
    enabled: false,
    refetchInterval: TOKEN_REFETCH_TIMER
  });

  return {
    accessToken,
    refetchAccessToken,
    accessTokenError,
    setAccessToken,
    clearRefetchInterval
  };
};

export const useUser = () => {
  const {
    accessToken,
    refetchAccessToken: _refetchAccessToken,
    accessTokenError,
    setAccessToken,
    clearRefetchInterval
  } = useGetAccessTokenApi();

  const {
    data: user,
    isLoading,
    error,
    refetch: refetchUser,
    isSuccess,
    setData: setUser,
    isFetched
  } = useQuery<User | undefined>({
    query: getUser,
    enabled: false
  });

  const { mutation: deleteMutation } = useMutation<void, void>({
    query: deleteRefreshToken,
    onSuccess: () => {
      setAccessToken(undefined);
      axiosBearerOption.clear();
    }
  });

  const refetchAccessToken = async () => {
    await _refetchAccessToken();
    await refetchUser();
  };

  const removeAccessToken = () => {
    deleteMutation();
    removeLocalStorage("active");
    clearRefetchInterval();
  };

  const logout = () => {
    removeAccessToken();
    setUser(undefined);
  };

  const isActiveAccessToken = getLocalStorage("active");

  const actionWhenAccessTokenChange = () => {
    if (!accessToken) setUser(undefined);
    else {
      setLocalStorage("active", true);
      refetchUser();
    }
  };

  const actionInitAccessToken = () => {
    if (isActiveAccessToken) {
      refetchAccessToken();
    } else {
      logout();
      clearRefetchInterval();
    }
  };

  useEffect(() => {
    actionInitAccessToken();
  }, []);

  useEffect(() => {
    if (accessTokenError) {
      logout();
    }
  }, [accessTokenError]);

  useEffect(() => {
    actionWhenAccessTokenChange();
  }, [accessToken]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error]);

  return {
    user,
    accessToken,
    refetchAccessToken,
    isLoading,
    error,
    refetchUser,
    logout,
    isSuccess,
    setUser,
    isActiveAccessToken,
    isFetched
  };
};
