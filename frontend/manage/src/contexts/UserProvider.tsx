import { QUERY, REACT_QUERY_KEY } from "@/constants";
import { NO_ACCESS_TOKEN } from "@/constants/errorName";
import { useUser } from "@/hooks";
import { User } from "@/types/user";
import { AlertError } from "@/utils/error";
import { removeLocalStorage } from "@/utils/localStorage";
import { customAxios, request } from "@/utils/request";
import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";
import { QueryObserverResult, useQuery, useQueryClient } from "react-query";

// interface InitialState {
//   user: User | undefined;
//   isLoading: boolean;
//   logout: () => void;
//   refetchAccessToken: () => void;
// }

// export const userContext = createContext<InitialState>({
//   user: undefined,
//   isLoading: false,
//   logout: () => {},
//   refetchAccessToken: () => {}
// });

// const { Provider } = userContext;

// const getAccessTokenByRefreshToken = async () => {
//   try {
//     const response = await request.post(QUERY.LOGIN_REFRESH, {});

//     return response.data.accessToken;
//   } catch (error) {
//     if (!axios.isAxiosError(error)) {
//       throw new AlertError("알 수 없는 에러입니다.");
//     }

//     throw new Error("액세스 토큰 재발급에 실패하셨습니다.");
//   }
// };

// const deleteRefreshToken = async () => {
//   try {
//     const response = await request.delete(QUERY.LOGOUT);

//     return response.data.accessToken;
//   } catch (error) {
//     if (!axios.isAxiosError(error)) {
//       throw new AlertError("알 수 없는 에러입니다.");
//     }

//     throw new AlertError("로그아웃에 실패하였습니다.");
//   }
// };

interface Props {
  children: ReactNode;
}

const UserProvider = ({ children }: Props) => {
  // // const queryClient = useQueryClient();
  // const { user, error: userError, refetch: refetchUser, clear, isLoading } = useUser();
  // const [interceptorId, setInterceptorId] = useState<number>(-1);
  // const { data: accessToken, refetch: refetchAccessToken } = useQuery<string, Error>(
  //   [REACT_QUERY_KEY.ACCESS_TOKEN],
  //   getAccessTokenByRefreshToken,
  //   {
  //     retry: false,
  //     refetchIntervalInBackground: true,
  //     refetchInterval: (30 - 10) * 1000
  //   }
  // );
  // const logout = async () => {
  //   try {
  //     await deleteRefreshToken();
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     clear();
  //   }
  // };
  // useEffect(() => {
  //   customAxios.interceptors.request.eject(interceptorId);
  //   if (accessToken) {
  //     const id = customAxios.interceptors.request.use(config => {
  //       config.headers.Authorization = `Bearer ${accessToken}`;
  //       return config;
  //     });
  //     setInterceptorId(id);
  //     refetchUser();
  //   } else {
  //     customAxios.interceptors.request.eject(interceptorId);
  //     setInterceptorId(-1);
  //     removeLocalStorage("user");
  //   }
  // }, [accessToken]);
  // return (
  //   <Provider
  //     value={{
  //       user,
  //       isLoading,
  //       logout,
  //       refetchAccessToken
  //     }}
  //   >
  //     {children}
  //   </Provider>
  // );
};

export default UserProvider;
