import { AlertError } from "./../utils/Error";
import { useQuery, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { COOKIE_KEY } from "../constants/cookie";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { User } from "../types/user";
import { deleteCookie, setCookie } from "../utils/cookie";
import { getKakaoAccessToken } from "../utils/kakaoAPI";
import { request } from "../utils/request";

const getUser = async () => {
  try {
    const response = await request.get(QUERY.USER);

    return response.data;
  } catch (error) {
    console.error(error.response.data.message);
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
      const response = await request.get(`${QUERY.LOGIN}${kakaoAccessToken}1`);

      const { accessToken: serverAccessToken } = response.data;
      setCookie(COOKIE_KEY.ATK, serverAccessToken);

      queryClient.invalidateQueries(REACT_QUERY_KEY.USER);
    } catch (error) {
      throw new AlertError("로그인에 실패하였습니다.");
    }
  };

  const logout = () => {
    deleteCookie(COOKIE_KEY.ATK);

    queryClient.setQueryData<User | undefined>(REACT_QUERY_KEY.USER, () => undefined);
  };

  return { user, login, logout, isLoading, error };
};
