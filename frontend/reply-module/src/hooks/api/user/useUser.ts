import { TOKEN_REFETCH_TIMER } from "@/constants/timer";
import { User } from "@/types/user";
import { deleteRefreshToken, getAccessTokenByRefreshToken, getUser } from "@/utils/api";
import { axiosBearerOption } from "@/utils/customAxios";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { useEffect } from "react";
import { useMutation } from "../useMutation";
import { useQuery } from "../useQuery";

export const useUser = () => {
  const {
    data: accessToken,
    refetch: _refetchAccessToken,
    error: accessTokenError,
    setData: setAccessToken
  } = useQuery<string>({
    query: getAccessTokenByRefreshToken,
    enabled: true,
    refetchInterval: TOKEN_REFETCH_TIMER
  });

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
  };

  const logout = () => {
    if (!removeAccessToken) return;

    removeAccessToken();
  };

  const isActiveAccessToken = getLocalStorage("active");

  useEffect(() => {
    if (isActiveAccessToken) {
      refetchAccessToken();
    }
  }, []);

  useEffect(() => {
    if (accessTokenError) removeAccessToken();
  }, [accessTokenError]);

  useEffect(() => {
    if (accessToken) {
      setLocalStorage("active", true);
    }
  }, [accessToken]);

  useEffect(() => {
    refetchUser();
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) setUser(undefined);
    else refetchUser();
  }, [accessToken]);

  return { user, accessToken, refetchAccessToken, isLoading, error, refetchUser, logout, isSuccess, setUser };
};
