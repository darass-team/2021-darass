import { Comment } from "@/types";
import { GetAlarmResponse } from "@/types/comment";
import { POST_MESSAGE_TYPE } from "@/constants/postMessageType";

export const messageFromReplyModule = (port?: MessagePort) => {
  return {
    setScrollHeight: () => {
      const height = Number(document.querySelector("#root")?.scrollHeight);

      port?.postMessage({
        type: POST_MESSAGE_TYPE.SCROLL_HEIGHT,
        data: height
      });
    },
    openAlert: (message: string) => {
      port?.postMessage({ type: POST_MESSAGE_TYPE.MODAL.OPEN.ALERT, data: message });
    },
    openConfirmModal: async (message: string): Promise<"yes" | "no"> => {
      return await new Promise(resolve => {
        const onMessageConfirmResult = ({ data }: MessageEvent) => {
          if (data.type === POST_MESSAGE_TYPE.CONFIRM_NO || data.type === POST_MESSAGE_TYPE.MODAL.CLOSE.CONFIRM) {
            resolve("no");
            port?.removeEventListener("message", onMessageConfirmResult);
          } else if (data.type === POST_MESSAGE_TYPE.CONFIRM_OK) {
            resolve("yes");
            port?.removeEventListener("message", onMessageConfirmResult);
          }
        };

        port?.addEventListener("message", onMessageConfirmResult);
        port?.start();
        port?.postMessage({ type: POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM, data: message });
      });
    },
    openAlarmModal: (alarmContents: GetAlarmResponse[]) => {
      port?.postMessage({ type: POST_MESSAGE_TYPE.MODAL.OPEN.ALARM, data: alarmContents });
    },
    openLikingUserModal: (users: Comment["user"][]) => {
      port?.postMessage({ type: POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS, data: users });
    }
  };
};

export const messageFromReplyModal = (port: MessagePort) => {
  return {
    clickedConfirmNo: () => {
      port.postMessage({ type: POST_MESSAGE_TYPE.CONFIRM_NO });
    },
    clickedConfirmOk: () => {
      port.postMessage({ type: POST_MESSAGE_TYPE.CONFIRM_OK });
    },
    closeAlertModal: () => {
      port.postMessage({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.ALERT });
    },
    closeConfirmModal: () => {
      port.postMessage({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.CONFIRM });
    },
    closeAlarmModal: () => {
      port.postMessage({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.ALARM });
    },
    closeLikingUserModal: () => {
      port.postMessage({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.LIKING_USERS });
    }
  };
};
