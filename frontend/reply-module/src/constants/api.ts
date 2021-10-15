import { GetCommentsRequestParams, GuestUserConfirmInfo, Comment } from "@/types/comment";
import { BUILD_MODE_TABLE } from "@/types/buildMode";
import { User } from "@/types/user";

const BASE_URL_TABLE = {
  localhost: "https://api.darass.co.kr",
  development: "https://dev-api.darass.co.kr",
  production: "https://api.darass.co.kr"
} as BUILD_MODE_TABLE;

export const BASE_URL = BASE_URL_TABLE[process.env.BUILD_MODE as keyof BUILD_MODE_TABLE];

export const QUERY = {
  LOGIN: "/api/v1/login/oauth",
  LOGIN_REFRESH: "/api/v1/login/refresh",
  LOGOUT: "/api/v1/log-out",
  COMMENT: "/api/v1/comments",
  GET_ALL_COMMENTS: ({ url, projectSecretKey, sortOption }: GetCommentsRequestParams) =>
    `/api/v1/comments?url=${url}&projectKey=${projectSecretKey}&sortOption=${sortOption}`,
  CHECK_GUEST_PASSWORD: ({ guestUserId, guestUserPassword }: GuestUserConfirmInfo) =>
    `/api/v1/users/check-password?guestUserId=${guestUserId}&guestUserPassword=${guestUserPassword}`,
  LIKE_COMMENT: (commentId: number) => `/api/v1/comments/${commentId}/like`,
  GET_SECRET_COMMENT: ({
    commentId,
    guestUserId,
    guestUserPassword
  }: {
    commentId: Comment["id"];
    guestUserId: User["id"];
    guestUserPassword: string;
  }) =>
    `/api/v1/comments/${commentId}/secret-comment?guestUserId=${guestUserId}&guestUserPassword=${guestUserPassword}`,
  USER: "/api/v1/users",
  ALARM: "/api/v1/comment-alarms",
  PROJECT: "/api/v1/projects"
} as const;
