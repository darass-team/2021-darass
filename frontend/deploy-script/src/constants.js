const LOCALHOST_END_POINT = "https://localhost:3000";
const DEVELOP_END_POINT = "https://dev-reply-module.darass.co.kr";
const PRODUCTION_END_POINT = "https://reply-module.darass.co.kr";

const END_POINT_TABLE = {
  localhost: LOCALHOST_END_POINT,
  development: DEVELOP_END_POINT,
  production: PRODUCTION_END_POINT
};

export const END_POINT = END_POINT_TABLE[process.env.BUILD_MODE];

export const POST_MESSAGE_TYPE = {
  CLICK: "click",
  SCROLL_HEIGHT: "scrollHeight",
  OPEN_LIKING_USERS_MODAL: "openLikingUsersModal",
  CLOSE_MODAL: "closeModal",
  ALERT: "alert",
  OPEN_CONFIRM: "confirm",
  CLOSE_CONFIRM: "closeConfirm",
  CONFIRM_OK: "confirmOK"
};
