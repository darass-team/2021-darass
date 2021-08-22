const REPLY_MODULE_BASE_URL_DEVELOPMENT = "https://dorvcm7xtbd6v.cloudfront.net";
const REPLY_MODULE_BASE_URL_PRODUCTION = "https://reply-module.darass.co.kr";

export const CLIENT_ASSET_BASE_URL = "https://d257w05ca5bz5h.cloudfront.net";

export const REPLY_MODULE_BASE_URL =
  process.env.BUILD_MODE === "development" ? REPLY_MODULE_BASE_URL_DEVELOPMENT : REPLY_MODULE_BASE_URL_PRODUCTION;
