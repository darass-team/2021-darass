import { GetCommentsRequestParams, GuestUserInfo } from "../types/comment";
import { NUM_OF_COMMENTS_PER_PAGE } from "./comment";

export const BASE_URL = "https://darass.o-r.kr";

export const QUERY = Object.freeze({
  LOGIN: "/api/v1/login/oauth?oauthProviderName=kakao&oauthAccessToken=",
  COMMENT: "/api/v1/comments",
  GET_ALL_COMMENTS: ({ url, projectSecretKey, sortOption, pageParam }: GetCommentsRequestParams) =>
    `/api/v1/comments/paging?url=${url}&projectKey=${projectSecretKey}&sortOption=${sortOption}&page=${pageParam}&size=${NUM_OF_COMMENTS_PER_PAGE}`,
  GET_PROJECT: (projectKey: string) => `/api/v1/projects/user-id?secretKey=${projectKey}`,
  CHECK_GUEST_PASSWORD: ({ guestUserId, guestUserPassword }: GuestUserInfo) =>
    `/api/v1/users/check-password?guestUserId=${guestUserId}&guestUserPassword=${guestUserPassword}`,
  LIKE_COMMENT: (commentId: number) => `/api/v1/comments/${commentId}/like`,
  USER: "/api/v1/users"
});
