import { TOKEN_REFETCH_TIMER } from "@/constants/timer";
import { User } from "@/types/user";
import { deleteRefreshToken, getAccessTokenByRefreshToken, getUser } from "@/utils/api";
import { axiosBearerOption } from "@/utils/customAxios";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { useEffect } from "react";
import { useMutation } from "../useMutation";
import { useQuery } from "../useQuery";

const useGetAccessTokenApi = () => {
  const {
    data: accessToken,
    refetch: refetchAccessToken,
    error: accessTokenError,
    setData: setAccessToken,
    clearRefetchInterval
  } = useQuery<string>({
    query: getAccessTokenByRefreshToken,
    enabled: false,
    refetchInterval: TOKEN_REFETCH_TIMER
  });

  return {
    accessToken,
    refetchAccessToken,
    accessTokenError,
    setAccessToken,
    clearRefetchInterval
  };
};

export const useUser = () => {
  const {
    accessToken,
    refetchAccessToken: _refetchAccessToken,
    accessTokenError,
    setAccessToken,
    clearRefetchInterval
  } = useGetAccessTokenApi();

  const {
    data: user,
    isLoading,
    error,
    refetch: refetchUser,
    isSuccess,
    setData: setUser
  } = useQuery<User>({
    query: getUser,
    enabled: false
  });

  const { mutation: deleteMutation } = useMutation<void, void>({
    query: deleteRefreshToken,
    onSuccess: () => {
      setAccessToken(undefined);
      axiosBearerOption.clear();
    }
  });

  const refetchAccessToken = async () => {
    await _refetchAccessToken();
    await refetchUser();
  };

  const removeAccessToken = () => {
    deleteMutation();
    removeLocalStorage("active");
    clearRefetchInterval();
  };

  const logout = () => {
    if (!removeAccessToken) return;

    removeAccessToken();
  };

  const isActiveAccessToken = getLocalStorage("active");

  const actionWhenAccessTokenChange = () => {
    if (!accessToken) setUser(undefined);
    else {
      setLocalStorage("active", true);
      refetchUser();
    }
  };

  const actionInitAccessToken = () => {
    if (isActiveAccessToken) {
      refetchAccessToken();
    } else {
      clearRefetchInterval();
    }
  };

  useEffect(() => {
    actionInitAccessToken();
  }, []);

  useEffect(() => {
    if (accessTokenError) removeAccessToken();
  }, [accessTokenError]);

  useEffect(() => {
    actionWhenAccessTokenChange();
  }, [accessToken]);

  return { user, accessToken, refetchAccessToken, isLoading, error, refetchUser, logout, isSuccess, setUser };
};
