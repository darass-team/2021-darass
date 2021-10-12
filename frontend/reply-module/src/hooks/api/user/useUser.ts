import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { User } from "@/types/user";
import { getUser } from "@/utils/api";
import { useQuery, useQueryClient } from "react-query";

interface Props {
  accessToken?: string;
  removeAccessToken?: () => void;
}

export const useUser = ({ accessToken, removeAccessToken }: Props) => {
  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    error,
    refetch,
    isSuccess
  } = useQuery<User, Error>([REACT_QUERY_KEY.USER], getUser, {
    retry: false,
    enabled: !!accessToken
  });

  const logout = () => {
    if (!removeAccessToken) return;

    removeAccessToken();
    queryClient.setQueryData<User | undefined>(REACT_QUERY_KEY.USER, () => {
      return undefined;
    });
  };

  return { user, isLoading, error, refetch, logout, isSuccess };
};
