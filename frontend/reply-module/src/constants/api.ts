import { GuestUserInfo } from "../types/comment";
const BASE_URL = "https://darass.o-r.kr";
const QUERY = {
  LOGIN: "/api/v1/login/oauth?oauthProviderName=kakao&oauthAccessToken=",
  COMMENT: "/api/v1/comments",
  GET_ALL_COMMENTS: (url: string, projectKey: string) => `/api/v1/comments?url=${url}&projectKey=${projectKey}`,
  GET_PROJECT: (projectKey: string) => `/api/v1/projects/user-id?secretKey=${projectKey}`,
  CHECK_GUEST_PASSWORD: ({ guestUserId, guestUserPassword }: GuestUserInfo) =>
    `/api/v1/users/check-password?guestUserId=${guestUserId}&guestUserPassword=${guestUserPassword}`,
  USER: "/api/v1/users"
};

export { BASE_URL, QUERY };
