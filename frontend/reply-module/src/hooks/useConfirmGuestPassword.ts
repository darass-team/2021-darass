import { useQuery } from "react-query";
import { QUERY } from "../constants/api";
import { REACT_QUERY_KEY } from "../constants/reactQueryKey";
import { GuestUserInfo } from "../types/comment";
import { request } from "../utils/request";

const _getPasswordConfirmResult = async ({ guestUserId, guestUserPassword }: GuestUserInfo) => {
  const response = await request.get(QUERY.CHECK_GUEST_PASSWORD({ guestUserId, guestUserPassword }));

  if (response.status >= 400) {
    throw new Error(response.data.message);
  }

  return response.data;
};

const useConfirmGuestPassword = ({ guestUserId, guestUserPassword }: GuestUserInfo) => {
  const { refetch: getPasswordConfirmResult } = useQuery<
    {
      isCorrectPassword: false;
    },
    Error
  >(REACT_QUERY_KEY.GUEST_PASSWORD_CONFIRM, () => _getPasswordConfirmResult({ guestUserId, guestUserPassword }), {
    enabled: false,
    retryOnMount: false,
    retry: false,
    cacheTime: 0,
    refetchOnWindowFocus: false
  });

  return { getPasswordConfirmResult };
};

export { useConfirmGuestPassword };
