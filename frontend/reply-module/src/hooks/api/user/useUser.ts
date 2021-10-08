import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { User } from "@/types/user";
import { getUser } from "@/utils/api";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utils/localStorage";
import { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useToken } from "../token/useToken";

export const useUser = () => {
  const queryClient = useQueryClient();
  const { accessToken, deleteMutation, error: refreshError } = useToken(true);

  const {
    data: user,
    isLoading,
    error,
    refetch
  } = useQuery<User, Error>([REACT_QUERY_KEY.USER], getUser, {
    retry: false,
    initialData: getLocalStorage("user"),
    enabled: !!accessToken
  });

  const logout = () => {
    deleteMutation.mutate();
    queryClient.setQueryData<User | undefined>(REACT_QUERY_KEY.USER, () => {
      return undefined;
    });
  };

  useEffect(() => {
    if (refreshError) {
      logout();
    }
  }, [refreshError]);

  useEffect(() => {
    if (user) {
      setLocalStorage("user", user);
    } else {
      removeLocalStorage("user");
    }
  }, [user]);

  return { user, isLoading, error, refetch, logout };
};
