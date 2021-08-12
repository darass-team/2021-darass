import { GetCommentsRequestParams, GuestUserConfirmInfo } from "../types/comment";

const MANAGE_PAGE_BASE_URL_DEVELOPMENT = "https://d3oy1fczrkrons.cloudfront.net";
const MANAGE_PAGE_BASE_URL_PRODUCTION = "https://darass.o-r.kr";
export const MANAGE_PAGE_BASE_URL =
  process.env.BUILD_MODE === "development" ? MANAGE_PAGE_BASE_URL_DEVELOPMENT : MANAGE_PAGE_BASE_URL_PRODUCTION;

const DEVELOPMENT_BASE_URL = "https://www.darass-develop.o-r.kr";
const PRODUCTION_BASE_URL = "https://api.darass.o-r.kr";
export const BASE_URL = process.env.BUILD_MODE === "development" ? DEVELOPMENT_BASE_URL : PRODUCTION_BASE_URL;

export const QUERY = {
  LOGIN: "/api/v1/login/oauth",
  COMMENT: "/api/v1/comments",
  GET_ALL_COMMENTS: ({ url, projectSecretKey, sortOption }: GetCommentsRequestParams) =>
    `/api/v1/comments?url=${url}&projectKey=${projectSecretKey}&sortOption=${sortOption}`,
  GET_PROJECT: (projectKey: string) => `/api/v1/projects/user-id?secretKey=${projectKey}`,
  CHECK_GUEST_PASSWORD: ({ guestUserId, guestUserPassword }: GuestUserConfirmInfo) =>
    `/api/v1/users/check-password?guestUserId=${guestUserId}&guestUserPassword=${guestUserPassword}`,
  LIKE_COMMENT: (commentId: number) => `/api/v1/comments/${commentId}/like`,
  USER: "/api/v1/users"
} as const;
