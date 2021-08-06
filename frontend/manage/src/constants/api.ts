const DEVELOPMENT_BASE_URL = "https://darass.o-r.kr";
const PRODUCTION_BASE_URL = "https://darass.o-r.kr";
const BASE_URL = process.env.BUILD_MODE === "development" ? DEVELOPMENT_BASE_URL : PRODUCTION_BASE_URL;
const QUERY = {
  LOGIN: "/api/v1/login/oauth?oauthProviderName=kakao&oauthAccessToken=",
  USER: "/api/v1/users",
  COMMENT: "/api/v1/comments",
  PROJECT: "/api/v1/projects",
  COMMENTS_OF_PROJECT: "/api/v1/projects/comments/paging"
};

export { BASE_URL, QUERY };
