import { GetCommentsRequestParams, GuestUserConfirmInfo } from "../types/comment";
import { NUM_OF_COMMENTS_PER_PAGE } from "./comment";

export const MANAGE_PAGE_BASE_URL = "https://d3oy1fczrkrons.cloudfront.net";

const DEVELOPMENT_BASE_URL = "https://darass.o-r.kr";
const PRODUCTION_BASE_URL = "https://darass.o-r.kr";
export const BASE_URL = process.env.BUILD_MODE === "development" ? DEVELOPMENT_BASE_URL : PRODUCTION_BASE_URL;

export const QUERY = Object.freeze({
  LOGIN: "/api/v1/login/oauth?oauthProviderName=kakao&oauthAccessToken=",
  COMMENT: "/api/v1/comments",
  GET_ALL_COMMENTS: ({ url, projectSecretKey, sortOption, pageParam }: GetCommentsRequestParams) =>
    `/api/v1/comments/paging?url=${url}&projectKey=${projectSecretKey}&sortOption=${sortOption}&page=${pageParam}&size=${NUM_OF_COMMENTS_PER_PAGE}`,
  GET_PROJECT: (projectKey: string) => `/api/v1/projects/user-id?secretKey=${projectKey}`,
  CHECK_GUEST_PASSWORD: ({ guestUserId, guestUserPassword }: GuestUserConfirmInfo) =>
    `/api/v1/users/check-password?guestUserId=${guestUserId}&guestUserPassword=${guestUserPassword}`,
  LIKE_COMMENT: (commentId: number) => `/api/v1/comments/${commentId}/like`,
  USER: "/api/v1/users"
});
