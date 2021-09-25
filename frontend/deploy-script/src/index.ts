import { POST_MESSAGE_TYPE } from "./constants";
import { IFRAME_STYLE } from "./style";
import { createIframe, hideElement, resizeElementHeight, showElement } from "./utils/dom";
import { getModalUrl, getReplyModuleURL } from "./utils/getURL";
import { postMessageToIframe } from "./utils/postMessage";

const bindEvent = ($replyModuleIframe: HTMLIFrameElement, $modalIframe: HTMLIFrameElement) => {
  const onMessageReplyModule = (type: string, data: string) => {
    if (type === POST_MESSAGE_TYPE.SCROLL_HEIGHT) {
      resizeElementHeight($replyModuleIframe, data);

      return;
    }

    const closeCommand = Object.keys(POST_MESSAGE_TYPE.MODAL.CLOSE).find(iframeName => type === iframeName);
    if (closeCommand) {
      postMessageToIframe({ iframe: $replyModuleIframe, message: { type: closeCommand } });
      hideElement($modalIframe);

      return;
    }

    if (type === POST_MESSAGE_TYPE.MODAL.CLOSE.CONFIRM) {
      postMessageToIframe({ iframe: $replyModuleIframe, message: { type: POST_MESSAGE_TYPE.MODAL.CLOSE.CONFIRM } });
      hideElement($modalIframe);

      return;
    }

    if (type === POST_MESSAGE_TYPE.CONFIRM_OK) {
      postMessageToIframe({ iframe: $replyModuleIframe, message: { type: POST_MESSAGE_TYPE.CONFIRM_OK, data } });
      hideElement($modalIframe);

      return;
    }
  };

  const onMessageModal = (type: string, data: string) => {
    if (type === POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS_MODAL) {
      postMessageToIframe({
        iframe: $modalIframe,
        message: { type: POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS_MODAL, data }
      });
      showElement($modalIframe);

      return;
    }

    if (type === POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM) {
      postMessageToIframe({
        iframe: $modalIframe,
        message: { type: POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM, data }
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

    onMessageReplyModule(type, data);
    onMessageModal(type, data);
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
