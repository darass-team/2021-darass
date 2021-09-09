const PRODUCTION_BASE_URL = "https://api.darass.co.kr";
const DEVELOPMENT_BASE_URL = "https://dev-api.darass.co.kr";
const BASE_URL =
  process.env.BUILD_MODE === "development" || process.env.BUILD_MODE === "localhost"
    ? DEVELOPMENT_BASE_URL
    : PRODUCTION_BASE_URL;
const QUERY = {
  LOGIN: "/api/v1/login/oauth",
  LOGIN_REFRESH: "/api/v1/login/refresh",
  LOGOUT: "/api/v1/log-out",
  USER: "/api/v1/users",
  COMMENT: "/api/v1/comments",
  PROJECT: "/api/v1/projects",
  KEYWORD_COMMENTS_OF_PROJECT_PER_PAGE: "/api/v1/projects/comments/search/paging",
  STATISTICS_OF_PROJECT: "/api/v1/comments/stat"
};

export { BASE_URL, QUERY };
