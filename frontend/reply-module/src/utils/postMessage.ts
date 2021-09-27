import { AlarmContentType } from "@/components/molecules/AlarmContent";
import { Comment } from "@/types";
import { POST_MESSAGE_TYPE } from "../constants/postMessageType";

export const messageFromReplyModule = (port: MessagePort | undefined) => {
  return {
    setScrollHeight: () => {
      port?.postMessage({
        type: POST_MESSAGE_TYPE.SCROLL_HEIGHT,
        data: document.querySelector("#root")?.scrollHeight
      });
    },
    openAlert: (message: string) => {
      port?.postMessage({ type: POST_MESSAGE_TYPE.ALERT, data: message });
    },
    openConfirmModal: (message: string) => {
      port?.postMessage({ type: POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM, data: message });
    },
    openAlarmModal: (alarmContents: AlarmContentType[]) => {
      port?.postMessage({ type: POST_MESSAGE_TYPE.MODAL.OPEN.ALARM, data: alarmContents });
    },
    openLikingUserModal: (users: Comment["user"][]) => {
      port?.postMessage({ type: POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS_MODAL, data: users });
    }
  };
};

export const messageFromReplyModal = (port: MessagePort | undefined) => {
  return {
    clickedConfirmNo: () => {
      port?.postMessage({ type: POST_MESSAGE_TYPE.CONFIRM_NO });
    },
    clickedConfirmOk: () => {
      port?.postMessage({ type: POST_MESSAGE_TYPE.CONFIRM_OK });
    },
    closeConfirmModal: () => {
      port?.postMessage({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.CONFIRM });
    },
    closeAlarmModal: () => {
      port?.postMessage({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.ALARM });
    },
    closeLikingUserModal: () => {
      port?.postMessage({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.LIKING_USERS_MODAL });
    }
  };
};
