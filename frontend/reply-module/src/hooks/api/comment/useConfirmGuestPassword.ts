import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { useMessageChannelFromReplyModuleContext } from "@/hooks";
import { GuestUserConfirmInfo } from "@/types/comment";
import { getConfirmGuestPassword } from "@/utils/api";
import { useQuery, useQueryClient } from "react-query";

export const useConfirmGuestPassword = ({ guestUserId, guestUserPassword }: GuestUserConfirmInfo) => {
  const queryClient = useQueryClient();
  const { openAlert } = useMessageChannelFromReplyModuleContext();

  const { data, isLoading, error, refetch } = useQuery<boolean | undefined, Error>(
    [REACT_QUERY_KEY.IS_VALID_GUEST_PASSWORD],
    () => getConfirmGuestPassword({ guestUserId, guestUserPassword }),
    {
      enabled: false,
      onSuccess: data => {
        if (data === false) {
          openAlert("비밀번호가 일치하지 않습니다.");
        }
      }
    }
  );

  const reset = () => {
    queryClient.resetQueries([REACT_QUERY_KEY.IS_VALID_GUEST_PASSWORD], { exact: true });
  };

  return { data, isLoading, error, refetch, reset };
};
