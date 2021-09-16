import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { QUERY } from "../constants/api";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { TOKEN_REFETCH_TIMER } from "../constants/timer";
import { AlertError } from "../utils/Error";
import { customAxios, request } from "../utils/request";

const axiosBearerOption = {
  _interceptorId: -1,

  setAccessToken(_accessToken: string) {
    this._interceptorId = customAxios.interceptors.request.use(config => {
      config.headers.Authorization = `Bearer ${_accessToken}`;

      return config;
    });
  },
  clear() {
    customAxios.interceptors.request.eject(this._interceptorId);
  }
};

const getAccessTokenByRefreshToken = async () => {
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

export const useToken = (enabled = false) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<string, Error>(deleteRefreshToken, {
    onSuccess: () => {
      queryClient.setQueryData<string | undefined>([REACT_QUERY_KEY.ACCESS_TOKEN], () => {
        return undefined;
      });
    }
  });

  const {
    data: accessToken,
    refetch: refetchAccessToken,
    error
  } = useQuery<string, Error>([REACT_QUERY_KEY.ACCESS_TOKEN], getAccessTokenByRefreshToken, {
    retry: 2,
    refetchIntervalInBackground: true,
    refetchInterval: TOKEN_REFETCH_TIMER,
    enabled
  });

  return { accessToken, refetchAccessToken, deleteMutation, error };
};
