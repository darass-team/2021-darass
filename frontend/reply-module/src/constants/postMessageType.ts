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
