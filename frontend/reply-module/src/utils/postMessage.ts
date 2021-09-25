import { AlarmContentType } from "@/components/molecules/AlarmContent";
import { Comment } from "@/types";
import { POST_MESSAGE_TYPE } from "../constants/postMessageType";

export const postToDeployScript = (message: Partial<MessageEvent>) => {
  window.parent?.postMessage(message, "*");
};

export const postScrollHeightToParentWindow = () => {
  postToDeployScript({
    type: POST_MESSAGE_TYPE.SCROLL_HEIGHT,
    data: document.querySelector("#root")?.scrollHeight
  });
};

export const postAlertMessage = (message: string) => {
  postToDeployScript({ type: POST_MESSAGE_TYPE.ALERT, data: message });
};

export const postOpenConfirm = (message: string) => {
  postToDeployScript({ type: POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM, data: message });
};

export const postOpenAlarm = (alarmContents: AlarmContentType[]) => {
  postToDeployScript({ type: POST_MESSAGE_TYPE.MODAL.OPEN.ALARM, data: alarmContents });
};

export const postOpenLikingUsersModal = (users: Comment["user"][]) => {
  postToDeployScript({ type: POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS_MODAL, data: users });
};

export const postConfirmNo = () => {
  postToDeployScript({ type: POST_MESSAGE_TYPE.CONFIRM_NO });
};

export const postConfirmOK = () => {
  postToDeployScript({ type: POST_MESSAGE_TYPE.CONFIRM_OK });
};

export const postCloseLikingUsersModal = () => {
  postToDeployScript({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.LIKING_USERS_MODAL });
};

export const postCloseConfirm = () => {
  postToDeployScript({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.CONFIRM });
};

export const postCloseAlarm = () => {
  postToDeployScript({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.ALARM });
};
