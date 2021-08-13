const PRODUCTION_BASE_URL = "https://api.darass.o-r.kr";
const DEVELOPMENT_BASE_URL = "https://www.darass-develop.o-r.kr";
const BASE_URL = process.env.BUILD_MODE === "development" ? DEVELOPMENT_BASE_URL : PRODUCTION_BASE_URL;
const QUERY = {
  LOGIN: "/api/v1/login/oauth",
  USER: "/api/v1/users",
  COMMENT: "/api/v1/comments",
  PROJECT: "/api/v1/projects",
  KEYWORD_COMMENTS_OF_PROJECT_PER_PAGE: "/api/v1/projects/comments/search/paging",
  STATISTICS_OF_PROJECT: "/api/v1/comments/stat"
};

export { BASE_URL, QUERY };
