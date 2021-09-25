const LOCALHOST_END_POINT = "https://localhost:3000";
const DEVELOP_END_POINT = "https://dev-reply-module.darass.co.kr";
const PRODUCTION_END_POINT = "https://reply-module.darass.co.kr";

const END_POINT_TABLE = {
  localhost: LOCALHOST_END_POINT,
  development: DEVELOP_END_POINT,
  production: PRODUCTION_END_POINT
} as const;

export const END_POINT = END_POINT_TABLE[process.env.BUILD_MODE as keyof typeof END_POINT_TABLE];

export const POST_MESSAGE_TYPE = {
  CLICK: "click",
  SCROLL_HEIGHT: "scrollHeight",

  ALERT: "alert",
  CONFIRM_OK: "confirmOK",
  CONFIRM_NO: "confirmNO",

  MODAL: {
    OPEN: {
      LIKING_USERS_MODAL: "openLikingUsersModal",
      CONFIRM: "openConfirm",
      ALARM: "openAlarm"
    },
    CLOSE: {
      LIKING_USERS_MODAL: "closeLikingUsersModal",
      CONFIRM: "closeConfirm",
      ALARM: "closeAlarm"
    }
  }
} as const;

export const URL_REPLACE_TABLE = [{ from: "://m.", to: "://" }] as const;
