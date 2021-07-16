import { useMutation, useQuery, useQueryClient } from "react-query";
import { COOKIE_KEY, QUERY, REACT_QUERY_KEY } from "../constants";
import { User } from "../types/user";
import { deleteCookie, setCookie } from "../utils/cookie";
import { getKakaoAccessToken } from "../utils/kakaoAPI";
import { request } from "../utils/request";

const useUser = () => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error
  } = useQuery<User, Error>(REACT_QUERY_KEY.USER, async () => await request.get(QUERY.USER));

  const login = async () => {
    try {
      const kakaoAccessToken = await getKakaoAccessToken();
      const serverAccessToken = await request.get(`${QUERY.LOGIN}${kakaoAccessToken}`);

      setCookie(COOKIE_KEY.ATK, serverAccessToken);

      queryClient.invalidateQueries(REACT_QUERY_KEY.USER);
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteMutation = useMutation<void, Error, void>(async () => {}, {
    onSuccess: () => {
      queryClient.setQueryData<User | undefined>(REACT_QUERY_KEY.USER, () => {
        return undefined;
      });
    }
  });

  const logout = async () => {
    try {
      deleteCookie(COOKIE_KEY.ATK);

      deleteMutation.mutate();
    } catch (error) {
      console.error(error.message);
    }
  };

  return { user, login, logout, isLoading, error };
};

export { useUser };
