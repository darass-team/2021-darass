import { QUERY } from "@/constants";
import { useUser } from "@/hooks";
import { User } from "@/types/user";
import { AlertError } from "@/utils/error";
import { customAxios, request } from "@/utils/request";
import { removeLocalStorage } from "@/utils/localStorage";
import axios from "axios";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useMemo, useState } from "react";

interface InitialState {
  user: User | undefined;
  isLoading: boolean;
  logout: () => void;
  accessToken: string | null | undefined;
  setAccessToken: Dispatch<SetStateAction<string | null | undefined>>;
}

export const userContext = createContext<InitialState>({
  user: undefined,
  isLoading: false,
  logout: () => {},
  accessToken: null,
  setAccessToken: () => {}
});

const { Provider } = userContext;

const refreshAccessToken = async () => {
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
  const [accessToken, setAccessToken] = useState<string | null | undefined>();
  const { user, error, refetch, clear, isLoading } = useUser();
  const [interceptorId, setInterceptorId] = useState<number>(-1);

  const logout = async () => {
    try {
      await deleteRefreshToken();
    } catch (error) {
      console.error(error);
    } finally {
      setAccessToken(null);
      clear();
    }
  };

  useMemo(() => {
    if (accessToken) {
      const id = customAxios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${accessToken}`;

        return config;
      });

      setInterceptorId(id);
    } else {
      removeLocalStorage("user");
      customAxios.interceptors.request.eject(interceptorId);
      setInterceptorId(-1);
    }
  }, [accessToken]);

  useEffect(() => {
    refetch();
  }, [interceptorId]);

  useEffect(() => {
    if (error?.name === "noAccessToken") {
      refreshAccessToken()
        .then(accessToken => {
          setAccessToken(accessToken);
        })
        .catch(() => {
          setAccessToken(null);
        });
    }
  }, [error]);

  return (
    <Provider
      value={{
        user,
        isLoading,
        logout,
        accessToken,
        setAccessToken
      }}
    >
      {children}
    </Provider>
  );
};

export default UserProvider;
