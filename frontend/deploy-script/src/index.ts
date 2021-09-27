import { POST_MESSAGE_TYPE } from "./constants/postMessageType";
import { IFRAME_STYLE } from "./constants/style";
import { blockScroll, createIframe, hideElement, resizeElementHeight, showElement, unBlockScroll } from "./utils/dom";
import { getModalUrl, getReplyModuleURL } from "./utils/getURL";

const messageChannel = {
  replyModule: new MessageChannel(),
  replyModal: new MessageChannel()
};

const bindEventAboutReplyModule = ($replyModuleIframe: HTMLIFrameElement, $modalIframe: HTMLIFrameElement) => {
  messageChannel.replyModule.port1.addEventListener("message", ({ data: { type, data } }) => {
    const ACTION_TABLE = {
      [POST_MESSAGE_TYPE.ALERT]: () => {
        alert(data);
      },
      [POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS_MODAL]: () => {
        messageChannel.replyModal.port1.postMessage({ type: POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS_MODAL, data });
        showElement($modalIframe);
        blockScroll();
      },
      [POST_MESSAGE_TYPE.MODAL.OPEN.ALARM]: () => {
        messageChannel.replyModal.port1.postMessage({ type: POST_MESSAGE_TYPE.MODAL.OPEN.ALARM, data });
        showElement($modalIframe);
        blockScroll();
      },
      [POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM]: () => {
        messageChannel.replyModal.port1.postMessage({ type: POST_MESSAGE_TYPE.MODAL.OPEN.CONFIRM, data });
        showElement($modalIframe);
        blockScroll();
      },
      [POST_MESSAGE_TYPE.SCROLL_HEIGHT]: () => resizeElementHeight($replyModuleIframe, data)
    } as const;

    if (!Object.keys(ACTION_TABLE).includes(type)) return;

    ACTION_TABLE[type as keyof typeof ACTION_TABLE]();
  });

  messageChannel.replyModule.port1.start();
};

const bindEventAboutReplyModal = ($replyModuleIframe: HTMLIFrameElement, $modalIframe: HTMLIFrameElement) => {
  messageChannel.replyModal.port1.addEventListener("message", ({ data: { type, data } }) => {
    const ACTION_TABLE = {
      [POST_MESSAGE_TYPE.MODAL.CLOSE.ALARM]: () => {
        messageChannel.replyModule.port1.postMessage({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.ALARM });
        hideElement($modalIframe);
        unBlockScroll();
      },
      [POST_MESSAGE_TYPE.MODAL.CLOSE.CONFIRM]: () => {
        messageChannel.replyModule.port1.postMessage({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.CONFIRM });
        hideElement($modalIframe);
        unBlockScroll();
      },
      [POST_MESSAGE_TYPE.MODAL.CLOSE.LIKING_USERS_MODAL]: () => {
        messageChannel.replyModule.port1.postMessage({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.ALARM });
        hideElement($modalIframe);
        unBlockScroll();
      },
      [POST_MESSAGE_TYPE.CONFIRM_NO]: () => {
        messageChannel.replyModule.port1.postMessage({ type: POST_MESSAGE_TYPE.CONFIRM_NO });
        hideElement($modalIframe);
        unBlockScroll();
      },
      [POST_MESSAGE_TYPE.CONFIRM_OK]: () => {
        messageChannel.replyModule.port1.postMessage({ type: POST_MESSAGE_TYPE.CONFIRM_OK, data });
        hideElement($modalIframe);
        unBlockScroll();
      }
    };

    if (!Object.keys(ACTION_TABLE).includes(type)) return;

    ACTION_TABLE[type as keyof typeof ACTION_TABLE]();
  });

  messageChannel.replyModal.port1.start();
};

const init = () => {
  const $darass: HTMLElement | null = document.querySelector("#darass");
  if (!$darass) {
    alert("Darass를 렌더링할 수 없습니다. id가 darass인 요소를 추가해주세요.");

    return;
  }

  const projectKey = $darass.dataset.projectKey;
  if (!projectKey) {
    alert("유효하지 않은 프로젝트 키입니다. 프로젝트키를 확인해주세요.");

    return;
  }

  const $replyModuleIframe = createIframe(getReplyModuleURL(projectKey), IFRAME_STYLE.REPLY_MODULE);
  const $modalIframe = createIframe(getModalUrl(), IFRAME_STYLE.MODAL);
  $replyModuleIframe.setAttribute("scrolling", "no");

  $darass.append($replyModuleIframe, $modalIframe);

  window.addEventListener("message", ({ data }: MessageEvent) => {
    if (data.type === POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODULE.REQUEST_PORT) {
      $replyModuleIframe.contentWindow?.postMessage(
        { type: POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODULE.RESPONSE_PORT },
        "*",
        [messageChannel.replyModule.port2]
      );

      bindEventAboutReplyModule($replyModuleIframe, $modalIframe);
    }

    if (data.type === POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODAL.REQUEST_PORT) {
      $modalIframe.contentWindow?.postMessage(
        { type: POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODAL.RESPONSE_PORT },
        "*",
        [messageChannel.replyModal.port2]
      );

      bindEventAboutReplyModal($replyModuleIframe, $modalIframe);
    }
  });
};

window.addEventListener("load", init);
