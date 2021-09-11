import { QUERY, REACT_QUERY_KEY, ROUTE } from "@/constants";
import { accessTokenContext } from "@/contexts/AccessTokenProvider";
import { User } from "@/types/user";
import { AlertError } from "@/utils/error";
import { request } from "@/utils/request";
import { getSessionStorage, removeSessionStorage, setSessionStorage } from "@/utils/sessionStorage";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useHistory } from "react-router";

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
  const history = useHistory();
  const { accessToken, setAccessToken } = useContext(accessTokenContext);

  const {
    data: user,
    isLoading,
    error
  } = useQuery<User, Error>([REACT_QUERY_KEY.USER], getUser, {
    retry: false,
    refetchOnWindowFocus: false,
    initialData: getSessionStorage("user")
  });

  const login = () => {
    // queryClient.invalidateQueries([REACT_QUERY_KEY.USER]);
  };

  const logout = () => {
    deleteRefreshToken()
      .then(() => {
        queryClient.setQueryData<User | undefined>([REACT_QUERY_KEY.USER], undefined);
      })
      .finally(() => {
        setAccessToken(null);
        removeSessionStorage("user");
      });
  };

  useEffect(() => {
    if (error?.name === "noAccessToken") {
      refreshAccessToken()
        .then(accessToken => {
          console.log("액세스토큰 재발급 성공");
          // setSessionStorage("lastPath", ROUTE.AUTHORIZED.MY_PROJECT);
          setAccessToken(accessToken);
          login();
        })

        .catch(err => {
          console.log(err);
          setAccessToken(null);
        });
    }
  }, [error?.name]);

  useEffect(() => {
    queryClient.invalidateQueries([REACT_QUERY_KEY.USER]);
  }, [accessToken]);

  useEffect(() => {
    setSessionStorage("user", user);
  }, [user]);

  return { user, login, logout, isLoading, error };
};
