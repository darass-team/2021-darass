import { POST_MESSAGE_TYPE } from "../constants/postMessageType";
import { Comment } from "../types";

export const postToDeployScript = (message: Partial<MessageEvent>) => {
  window.parent?.postMessage(message, "*");
};

export const postScrollHeightToParentWindow = () => {
  postToDeployScript({
    type: POST_MESSAGE_TYPE.SCROLL_HEIGHT,
    data: document.querySelector("#root")?.scrollHeight
  });
};

export const postOpenLikingUsersModal = (likingUsers: Comment["likingUsers"]) => {
  postToDeployScript({ type: POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS_MODAL, data: likingUsers });
};

export const postAlertMessage = (message: string) => {
  postToDeployScript({ type: POST_MESSAGE_TYPE.ALERT, data: message });
};

export const postOpenConfirm = (message: string) => {
  postToDeployScript({ type: POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM, data: message });
};

export const postCloseConfirm = () => {
  postToDeployScript({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.CONFIRM });
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
