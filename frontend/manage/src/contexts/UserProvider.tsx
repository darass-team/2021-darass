import { QUERY } from "@/constants";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { useUser } from "@/hooks";
import { User } from "@/types/user";
import { AlertError } from "@/utils/error";
import { removeLocalStorage } from "@/utils/localStorage";
import { customAxios, request } from "@/utils/request";
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { QueryObserverResult } from "react-query";

interface InitialState {
  user: User | undefined;
  isLoading: boolean;
  logout: () => void;
  refreshAccessToken: () => Promise<QueryObserverResult<User, Error>> | Promise<void>;
}

export const userContext = createContext<InitialState>({
  user: undefined,
  isLoading: false,
  logout: () => {},
  refreshAccessToken: async () => {}
});

const { Provider } = userContext;

const getAccessTokenByRefreshToken = async () => {
  try {
    const response = await request.post(QUERY.LOGIN_REFRESH, {});

    return response.data.accessToken;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    const newError = new Error("액세스 토큰 재발급에 실패하셨습니다.");
    newError.name = "requestFailAccessToken";
    throw newError;
  }
};

const deleteRefreshToken = async () => {
  try {
    const response = await request.delete(QUERY.LOGOUT);

    return response.data.accessToken;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new AlertError("알 수 없는 에러입니다.");
    }

    throw new AlertError("로그아웃에 실패하였습니다.");
  }
};

interface Props {
  children: ReactNode;
}

const UserProvider = ({ children }: Props) => {
  const { user, error: userError, refetch: refetchUser, clear, isLoading } = useUser();
  const [interceptorId, setInterceptorId] = useState<number>(-1);

  const logout = async () => {
    try {
      await deleteRefreshToken();
    } catch (error) {
      console.error(error);
    } finally {
      clear();
    }
  };

  const refreshAccessToken = async () => {
    try {
      const accessToken = await getAccessTokenByRefreshToken();

      customAxios.interceptors.request.eject(interceptorId);
      const id = customAxios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${accessToken}`;

        return config;
      });

      setInterceptorId(id);
    } catch (error) {
      console.error(error);

      customAxios.interceptors.request.eject(interceptorId);
      removeLocalStorage("user");

      setInterceptorId(-1);
    }
  };

  useEffect(() => {
    refetchUser();
  }, [interceptorId]);

  useEffect(() => {
    if (userError?.name === NO_ACCESS_TOKEN) {
      refreshAccessToken();
    }
  }, [userError]);

  return (
    <Provider
      value={{
        user,
        isLoading,
        logout,
        refreshAccessToken
      }}
    >
      {children}
    </Provider>
  );
};

export default UserProvider;
