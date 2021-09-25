import { POST_MESSAGE_TYPE } from "./constants/common";
import { IFRAME_STYLE } from "./constants/style";
import { createIframe, hideElement, resizeElementHeight, showElement } from "./utils/dom";
import { getModalUrl, getReplyModuleURL } from "./utils/getURL";
import { postMessageToIframe } from "./utils/postMessage";

const bindEvent = ($replyModuleIframe: HTMLIFrameElement, $modalIframe: HTMLIFrameElement) => {
  const onMessageToReplyModule = (type: string, data: string) => {
    if (type === POST_MESSAGE_TYPE.SCROLL_HEIGHT) {
      resizeElementHeight($replyModuleIframe, data);

      return;
    }

    const closeCommand = Object.values(POST_MESSAGE_TYPE.MODAL.CLOSE).find(command => type === command);
    if (closeCommand) {
      postMessageToIframe({ iframe: $replyModuleIframe, message: { type: closeCommand } });
      hideElement($modalIframe);

      return;
    }

    if (type === POST_MESSAGE_TYPE.CONFIRM_NO) {
      postMessageToIframe({ iframe: $replyModuleIframe, message: { type: POST_MESSAGE_TYPE.CONFIRM_NO } });
      hideElement($modalIframe);

      return;
    }

    if (type === POST_MESSAGE_TYPE.CONFIRM_OK) {
      postMessageToIframe({ iframe: $replyModuleIframe, message: { type: POST_MESSAGE_TYPE.CONFIRM_OK, data } });
      hideElement($modalIframe);

      return;
    }
  };

  const onMessageToModal = (type: string, data: any) => {
    const openCommand = Object.values(POST_MESSAGE_TYPE.MODAL.OPEN).find(command => type === command);
    if (openCommand) {
      postMessageToIframe({
        iframe: $modalIframe,
        message: { type: openCommand, data }
      });
      showElement($modalIframe);

      return;
    }
  };

  window.addEventListener("click", () => {
    postMessageToIframe({ iframe: $replyModuleIframe, message: { type: POST_MESSAGE_TYPE.CLICK } });
  });

  window.addEventListener("message", ({ data: { type, data } }) => {
    if (!type) return;

    if (type === POST_MESSAGE_TYPE.ALERT) {
      alert(data);

      return;
    }

    onMessageToReplyModule(type, data);
    onMessageToModal(type, data);
  });
};

(function () {
  const $darass: HTMLElement | null = document.querySelector("#darass");
  if (!$darass) {
    alert("Darass를 렌더링할 수 없습니다. id가 darass인 요소를 추가해주세요.");

    return;
  }

  const $replyModuleIframe = createIframe(getReplyModuleURL($darass), IFRAME_STYLE.REPLY_MODULE);
  const $modalIframe = createIframe(getModalUrl(), IFRAME_STYLE.MODAL);
  $replyModuleIframe.setAttribute("scrolling", "no");

  $darass.append($replyModuleIframe, $modalIframe);
  bindEvent($replyModuleIframe, $modalIframe);
})();
