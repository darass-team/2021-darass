const BASE_URL = "https://darass.o-r.kr";
const QUERY = {
  LOGIN: "/api/v1/login/oauth?oauthAccessToken=",
  COMMENT: "/api/v1/comments",
  GET_ALL_COMMENTS: (url: string, projectKey: string) => `/api/v1/comments?url=${url}&projectKey=${projectKey}`,
  GET_PROJECT: (projectKey: string) => `/api/v1/projects/user-id?secretKey=${projectKey}`,
  USER: "/api/v1/users"
};

export { BASE_URL, QUERY };
