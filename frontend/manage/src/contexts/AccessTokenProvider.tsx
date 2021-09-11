import { QUERY } from "@/constants";
import { useUser } from "@/hooks";
import { User } from "@/types/user";
import { AlertError } from "@/utils/error";
import { customAxios, request } from "@/utils/request";
import { removeSessionStorage } from "@/utils/sessionStorage";
import axios from "axios";
import { createContext, Dispatch, memo, ReactNode, SetStateAction, useEffect, useMemo, useRef, useState } from "react";

interface InitialState {
  user: User | undefined;
  logout: () => void;
  accessToken: string | null | undefined;
  setAccessToken: Dispatch<SetStateAction<string | null | undefined>>;
}

export const accessTokenContext = createContext<InitialState>({
  user: undefined,
  logout: () => {},
  accessToken: null,
  setAccessToken: () => {}
});

const { Provider } = accessTokenContext;

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

const AccessTokenProvider = ({ children }: Props) => {
  const [accessToken, setAccessToken] = useState<string | null | undefined>();
  const { user, error, invalidate } = useUser();
  const interceptorRef = useRef<number>();

  const logout = () => {
    deleteRefreshToken().finally(() => {
      setAccessToken(null);
      removeSessionStorage("user");
    });
  };

  useMemo(() => {
    if (accessToken) {
      interceptorRef.current = customAxios.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${accessToken}`;

        return config;
      });
    } else {
      if (interceptorRef.current === undefined) return;
      customAxios.interceptors.request.eject(interceptorRef.current);
    }
  }, [accessToken]);

  useEffect(() => {
    invalidate();
  }, [interceptorRef.current]);

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
  }, [error?.name]);

  return (
    <Provider
      value={{
        user,
        logout,
        accessToken,
        setAccessToken
      }}
    >
      {children}
    </Provider>
  );
};

export default AccessTokenProvider;
