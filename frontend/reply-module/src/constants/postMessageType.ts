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

  CONFIRM_OK: "confirmOK",
  CONFIRM_NO: "confirmNO",

  MODAL: {
    OPEN: {
      ALERT: "openAlert",
      LIKING_USERS: "openLikingUsersModal",
      CONFIRM: "openConfirm",
      ALARM: "openAlarm"
    },
    CLOSE: {
      ALERT: "closeAlert",
      LIKING_USERS: "closeLikingUsersModal",
      CONFIRM: "closeConfirm",
      ALARM: "closeAlarm"
    }
  }
} as const;
