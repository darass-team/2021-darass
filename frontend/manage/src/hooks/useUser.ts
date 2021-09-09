import axios from "axios";
import { useContext, useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { QUERY, REACT_QUERY_KEY } from "../constants";
import { accessTokenContext } from "../contexts/AccessTokenProvider";
import { User } from "../types/user";
import { AlertError } from "../utils/error";
import { request } from "../utils/request";

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
  const { accessToken, setAccessToken } = useContext(accessTokenContext);

  const {
    data: user,
    isLoading,
    error
  } = useQuery<User, Error>([REACT_QUERY_KEY.USER], getUser, {
    retry: false,
    refetchOnWindowFocus: false
  });

  const login = async () => {
    try {
      await queryClient.invalidateQueries([REACT_QUERY_KEY.USER]);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw new Error("알 수 없는 에러입니다.");
      }

      throw new AlertError("로그인에 실패하였습니다.");
    }
  };

  const logout = () => {
    setAccessToken(null);
    deleteRefreshToken().then(() => {
      queryClient.setQueryData<User | undefined>([REACT_QUERY_KEY.USER], undefined);
    });
  };

  useEffect(() => {
    if (error?.name === "noAccessToken") {
      refreshAccessToken().then(accessToken => {
        setAccessToken(accessToken);
      });
    }
  }, [error?.name]);

  useEffect(() => {
    login();
  }, [accessToken]);

  const isLoggedOut = !user && error?.name !== "noAccessToken";

  return { user, login, logout, isLoading, error, isLoggedOut };
};
