import { QUERY } from "@/constants/api";
import { REACT_QUERY_KEY } from "@/constants/reactQueryKey";
import { MessageChannelContext } from "@/contexts/messageChannelContext";
import { GuestUserConfirmInfo } from "@/types/comment";
import { AlertError } from "@/utils/alertError";
import { messageFromReplyModule } from "@/utils/postMessage";
import { request } from "@/utils/request";
import axios from "axios";
import { useContext } from "react";
import { useQuery, useQueryClient } from "react-query";

const confirmGuestPassword = async ({ guestUserId, guestUserPassword }: GuestUserConfirmInfo) => {
  try {
    const response = await request.get(QUERY.CHECK_GUEST_PASSWORD({ guestUserId, guestUserPassword }));
    const isCorrectPassword = response.data.isCorrectPassword;

    return isCorrectPassword;
  } catch (error) {
    if (!axios.isAxiosError(error)) {
      throw new Error("알 수 없는 에러입니다.");
    }

    if (error.response?.data.code === 600) {
      throw new AlertError("해당 유저가 존재하지 않습니다.");
    }
  }
};

export const useConfirmGuestPassword = ({ guestUserId, guestUserPassword }: GuestUserConfirmInfo) => {
  const queryClient = useQueryClient();
  const { port } = useContext(MessageChannelContext);

  const { data, isLoading, error, refetch } = useQuery<boolean | undefined, Error>(
    [REACT_QUERY_KEY.IS_VALID_GUEST_PASSWORD],
    () => confirmGuestPassword({ guestUserId, guestUserPassword }),
    {
      enabled: false,
      onSuccess: data => {
        if (data === false) {
          messageFromReplyModule(port).openAlert("비밀번호가 일치하지 않습니다.");
        }
      }
    }
  );

  const reset = () => {
    queryClient.resetQueries([REACT_QUERY_KEY.IS_VALID_GUEST_PASSWORD], { exact: true });
  };

  return { data, isLoading, error, refetch, reset };
};
