const DEVELOP_END_POINT = "https://dorvcm7xtbd6v.cloudfront.net";
const PRODUCTION_END_POINT = "https://reply-darass.o-r.kr";

export const END_POINT = process.env.BUILD_MODE === "development" ? DEVELOP_END_POINT : PRODUCTION_END_POINT;

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
