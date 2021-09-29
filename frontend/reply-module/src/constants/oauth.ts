import { REPLY_MODULE_DOMAIN } from "./domain";

export const OAUTH_ENDPOINT = {
  GITHUB: "https://github.com/login/oauth/authorize",
  KAKAO: "https://kauth.kakao.com/oauth/authorize",
  NAVER: "https://nid.naver.com/oauth2.0/authorize"
} as const;

export const OAUTH_URL = {
  KAKAO: `${OAUTH_ENDPOINT.KAKAO}?response_type=code&client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${REPLY_MODULE_DOMAIN}/oauth/kakao`,
  NAVER: `${OAUTH_ENDPOINT.NAVER}?response_type=code&client_id=${process.env.NAVER_CLIENT_ID}&redirect_uri=${REPLY_MODULE_DOMAIN}/oauth/naver`
} as const;
