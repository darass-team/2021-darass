const REPLY_MODULE_BASE_URL_DEVELOPMENT = "https://dev-reply-module.darass.co.kr";
const REPLY_MODULE_BASE_URL_PRODUCTION = "https://reply-module.darass.co.kr";

export const CLIENT_ASSET_BASE_URL = "https://d257w05ca5bz5h.cloudfront.net";

export const REPLY_MODULE_BASE_URL =
  process.env.BUILD_MODE === "development" ? REPLY_MODULE_BASE_URL_DEVELOPMENT : REPLY_MODULE_BASE_URL_PRODUCTION;

const MANAGE_PAGE_BASE_URL_DEVELOPMENT = "https://dev.darass.co.kr";
const MANAGE_PAGE_BASE_URL_PRODUCTION = "https://darass.co.kr";
const MANAGE_PAGE_BASE_URL_LOCALHOST = "https://localhost:3001";

export const MANAGE_PAGE_BASE_URL =
  process.env.BUILD_MODE === "development"
    ? MANAGE_PAGE_BASE_URL_DEVELOPMENT
    : process.env.BUILD_MODE === "production"
    ? MANAGE_PAGE_BASE_URL_PRODUCTION
    : MANAGE_PAGE_BASE_URL_LOCALHOST;
