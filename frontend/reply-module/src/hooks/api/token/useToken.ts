import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { TOKEN_REFETCH_TIMER } from "@/constants/timer";
import { deleteRefreshToken, getAccessTokenByRefreshToken } from "@/utils/api";
import { axiosBearerOption } from "@/utils/customAxios";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useToken = (enabled = false) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<string, Error>(deleteRefreshToken, {
    onSuccess: () => {
      queryClient.setQueryData<string | undefined>([REACT_QUERY_KEY.ACCESS_TOKEN], () => {
        return undefined;
      });
      axiosBearerOption.clear();
    }
  });

  const {
    data: accessToken,
    refetch,
    error
  } = useQuery<string, Error>([REACT_QUERY_KEY.ACCESS_TOKEN], getAccessTokenByRefreshToken, {
    retry: 2,
    refetchIntervalInBackground: true,
    refetchInterval: TOKEN_REFETCH_TIMER,
    enabled
  });

  const removeAccessToken = () => {
    deleteMutation.mutate();
    removeLocalStorage("active");
  };

  const refetchAccessToken = () => refetch();

  const isActiveAccessToken = getLocalStorage("active");

  useEffect(() => {
    if (isActiveAccessToken) {
      refetchAccessToken();
    }
  }, []);

  useEffect(() => {
    if (error) removeAccessToken();
  }, [error]);

  useEffect(() => {
    if (accessToken) {
      setLocalStorage("active", true);
    }
  }, [accessToken]);

  return { accessToken, refetchAccessToken, removeAccessToken, error, isActiveAccessToken };
};
