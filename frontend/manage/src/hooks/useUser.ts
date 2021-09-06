import { COOKIE_KEY, QUERY, REACT_QUERY_KEY } from "@/constants";
import { User } from "@/types/user";
import { deleteCookie, setCookie } from "@/utils/cookie";
import { AlertError } from "@/utils/error";
import { getKakaoAccessToken } from "@/utils/kakaoAPI";
import { request } from "@/utils/request";
import axios from "axios";
import { useQuery, useQueryClient } from "react-query";

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
      const kakaoAccessToken = await getKakaoAccessToken();
      const response = await request.post(QUERY.LOGIN, {
        oauthProviderName: "kakao",
        oauthAccessToken: kakaoAccessToken
      });

      const { accessToken: serverAccessToken } = response.data;

      setCookie(COOKIE_KEY.ATK, serverAccessToken);

      queryClient.invalidateQueries(REACT_QUERY_KEY.USER);
    } catch (error) {
      if (!axios.isAxiosError(error)) {
        throw new Error("알 수 없는 에러입니다.");
      }

      throw new AlertError("로그인에 실패하였습니다.");
    }
  };

  const logout = () => {
    deleteCookie(COOKIE_KEY.ATK);

    queryClient.setQueryData<User | undefined>(REACT_QUERY_KEY.USER, () => {
      return undefined;
    });
  };

  return { user, login, logout, isLoading, error };
};
