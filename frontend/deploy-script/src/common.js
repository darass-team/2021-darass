import { POST_MESSAGE_TYPE } from "./constants.js";

export const postMessageToIframe = ({ $iframe, message }) => {
  $iframe.contentWindow.postMessage(message, "*");
};

export const postParentClickEventToIframe = $iframe => {
  postMessageToIframe({ $iframe, message: { type: POST_MESSAGE_TYPE.CLICK } });
};

export const hideElement = element => {
  if (!element instanceof HTMLElement) return;

  element.style.display = "none";
};

export const showElement = element => {
  if (!element instanceof HTMLElement) return;

  element.style.display = "";
};

export const disableScroll = () => {
  document.body.style.overflow = "hidden";
};

export const enableScroll = () => {
  document.body.style.overflow = "revert";
};

export const resizeElementHeight = ({ element, height }) => {
  if (!element instanceof HTMLElement) return;

  element.style.setProperty("height", `${height}px`, "important");
};
