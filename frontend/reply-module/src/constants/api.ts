const BASE_URL = "http://13.209.89.65";
const QUERY = {
  LOGIN: "/api/v1/login/oauth?oauthAccessToken=",
  COMMENT: "/api/v1/comments",
  CREATE_COMMENT: (url: string, projectKey: string) => `/api/v1/comments?url=${url}&projectKey=${projectKey}`,
  USER: "/api/v1/users"
};

export { BASE_URL, QUERY };
