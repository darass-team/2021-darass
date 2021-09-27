export const POST_MESSAGE_TYPE = {
  INIT_MESSAGE_CHANNEL: {
    REPLY_MODULE: {
      REQUEST_PORT: "requestReplyModulePort",
      RESPONSE_PORT: "responseReplyModulePort"
    },
    REPLY_MODAL: {
      REQUEST_PORT: "requestReplyModalPort",
      RESPONSE_PORT: "responseReplyModalPort"
    }
  },

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
