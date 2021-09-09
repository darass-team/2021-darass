import { BUILD_MODE_TABLE } from "./../types/buildMode";

const REPLY_MODULE_BASE_URL_TABLE = {
  production: "https://reply-module.darass.co.kr",
  development: "https://dev-reply-module.darass.co.kr",
  localhost: "https://dev-reply-module.darass.co.kr"
} as BUILD_MODE_TABLE;

const MANAGE_BASE_URL_TABLE = {
  production: "https://darass.co.kr",
  development: "https://dev.darass.co.kr",
  localhost: "https://localhost:3001"
} as BUILD_MODE_TABLE;

export const CLIENT_ASSET_BASE_URL = "https://d257w05ca5bz5h.cloudfront.net";

export const REPLY_MODULE_BASE_URL = REPLY_MODULE_BASE_URL_TABLE[process.env.BUILD_MODE as keyof BUILD_MODE_TABLE];

export const MANAGE_PAGE_BASE_URL = MANAGE_BASE_URL_TABLE[process.env.BUILD_MODE as keyof BUILD_MODE_TABLE];
