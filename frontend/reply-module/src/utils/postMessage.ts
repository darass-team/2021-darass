import { POST_MESSAGE_TYPE } from "../constants/postMessageType";
import { Comment } from "../types";

export const postScrollHeightToParentWindow = () => {
  window.parent.postMessage(
    { type: POST_MESSAGE_TYPE.SCROLL_HEIGHT, data: document.querySelector("#root")?.scrollHeight },
    "*"
  );
};

export const postOpenLikingUsersModal = (likingUsers: Comment["likingUsers"]) => {
  window.parent.postMessage({ type: POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS_MODAL, data: likingUsers }, "*");
};

export const postAlertMessage = (message: string) => {
  window.parent.postMessage({ type: POST_MESSAGE_TYPE.ALERT, data: message }, "*");
};

export const postOpenConfirm = (message: string) => {
  window.parent.postMessage({ type: POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM, data: message }, "*");
};

export const postCloseConfirm = () => {
  window.parent.postMessage({ type: POST_MESSAGE_TYPE.CONFIRM_NO }, "*");
};

export const postConfirmOK = () => {
  window.parent.postMessage({ type: POST_MESSAGE_TYPE.CONFIRM_OK }, "*");
};
