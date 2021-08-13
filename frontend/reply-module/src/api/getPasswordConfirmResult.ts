import { QUERY } from "../constants/api";
import { GuestUserConfirmInfo } from "../types/comment";
import { request } from "../utils/request";

export const getPasswordConfirmResult = async ({ guestUserId, guestUserPassword }: GuestUserConfirmInfo) => {
  try {
    const response = await request.get(QUERY.CHECK_GUEST_PASSWORD({ guestUserId, guestUserPassword }));

    return response.data.isCorrectPassword;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};
