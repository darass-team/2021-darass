import { BUILD_MODE_TABLE } from "../types/buildMode";

const BASE_URL_TABLE = {
  localhost: "https://dev-api.darass.co.kr",
  development: "https://dev-api.darass.co.kr",
  production: "https://api.darass.co.kr"
} as BUILD_MODE_TABLE;

export const BASE_URL = BASE_URL_TABLE[process.env.BUILD_MODE as keyof BUILD_MODE_TABLE];

export const QUERY = {
  LOGIN: "/api/v1/login/oauth",
  LOGIN_REFRESH: "/api/v1/login/refresh",
  LOGOUT: "/api/v1/log-out",
  USER: "/api/v1/users",
  COMMENT: "/api/v1/comments",
  PROJECT: "/api/v1/projects",
  KEYWORD_COMMENTS_OF_PROJECT_PER_PAGE: "/api/v1/projects/comments/search/paging",
  STATISTICS_OF_PROJECT: "/api/v1/comments/stat",
  ALARM: "/api/v1/comment-alarms"
} as const;
