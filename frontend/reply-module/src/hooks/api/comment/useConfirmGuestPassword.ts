import { useMessageChannelFromReplyModuleContext } from "@/hooks";
import { GuestUserConfirmInfo } from "@/types/comment";
import { getConfirmGuestPassword } from "@/utils/api";
import { useEffect } from "react";
import { useQuery } from "../useQuery";

export const useConfirmGuestPassword = ({ guestUserId, guestUserPassword }: GuestUserConfirmInfo) => {
  const { openAlert } = useMessageChannelFromReplyModuleContext();

  const { data, isLoading, error, refetch } = useQuery({
    enabled: false,
    query: () => getConfirmGuestPassword({ guestUserId, guestUserPassword })
  });

  useEffect(() => {
    if (data === false) openAlert("비밀번호가 일치하지 않습니다.");
  }, [data]);

  useEffect(() => {
    if (error) {
      openAlert(error.message);
    }
  }, [error]);

  const reset = () => {
    refetch();
  };

  return { data, isLoading, error, refetch, reset };
};
