import { useHistory } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useMemo } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDeleteUser } from ".";
import { QUERY, REACT_QUERY_KEY, ROUTE } from "../constants";
import { accessTokenContext } from "../contexts/AccessTokenProvider";
import { User } from "../types/user";
import { AlertError } from "../utils/error";
import { request } from "../utils/request";

const getUser = async () => {
  try {
    const response = await request.get(QUERY.USER);

    return response.data;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 801) {
      throw new Error("유효하지 않은 토큰입니다.");
    }

    if (error.response?.data.code === 800) {
      throw new Error("로그인이 필요합니다.");
    }

    console.error(error.message);
    throw new AlertError("유저정보 조회에 실패하였습니다.\n잠시 후 다시 시도해주세요.");
  }
};

export const useUser = () => {
  const queryClient = useQueryClient();
  const { deleteUser } = useDeleteUser();
  const history = useHistory();
  const { accessToken, setAccessToken } = useContext(accessTokenContext);

  const {
    data: user,
    isLoading,
    error
  } = useQuery<User, Error>(REACT_QUERY_KEY.USER, getUser, {
    retry: false,
    refetchOnWindowFocus: false
  });

  const login = async () => {
    try {
      await queryClient.invalidateQueries(REACT_QUERY_KEY.USER);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw new Error("알 수 없는 에러입니다.");
      }

      throw new AlertError("로그인에 실패하였습니다.");
    }
  };

  // TODO: Logout api 필요
  const logout = () => {
    setAccessToken(null);
    // deleteUser();

    // queryClient.invalidateQueries(REACT_QUERY_KEY.USER);

    // queryClient.setQueryData<User | undefined>(REACT_QUERY_KEY.USER, user => {
    //   return undefined;
    // });
  };

  // const user = accessToken ? _user : undefined;

  if (user) {
    console.log("user가 있음");
  } else {
    console.log("user가 없음");
  }

  return { user, login, logout, isLoading, error };
};
