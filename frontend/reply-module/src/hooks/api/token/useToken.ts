import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { TOKEN_REFETCH_TIMER } from "@/constants/timer";
import { deleteRefreshToken, getAccessTokenByRefreshToken } from "@/utils/api";
import { axiosBearerOption } from "@/utils/customAxios";
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
