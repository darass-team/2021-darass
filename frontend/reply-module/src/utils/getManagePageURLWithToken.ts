import { COOKIE_KEY } from "../constants/cookie";
import { MANAGE_PAGE_DOMAIN } from "../constants/domain";
import { getCookie } from "./cookie";

export const getManagePageURLWithToken = (path = "") => {
  const accessToken = getCookie(COOKIE_KEY.ATK);
  if (!accessToken) {
    return MANAGE_PAGE_DOMAIN;
  }

  return `${MANAGE_PAGE_DOMAIN}${path}?${COOKIE_KEY.ATK}=${accessToken}`;
};
