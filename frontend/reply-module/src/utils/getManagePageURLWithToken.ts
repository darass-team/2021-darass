import { MANAGE_PAGE_BASE_URL } from "../constants/api";
import { COOKIE_KEY } from "../constants/cookie";
import { getCookie } from "./cookie";

export const getManagePageURLWithToken = (path = "") => {
  const accessToken = getCookie(COOKIE_KEY.ATK);
  if (!accessToken) {
    return MANAGE_PAGE_BASE_URL;
  }

  return `${MANAGE_PAGE_BASE_URL}${path}?${COOKIE_KEY.ATK}=${accessToken}`;
};
