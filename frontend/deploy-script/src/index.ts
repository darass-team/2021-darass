import { POST_MESSAGE_TYPE } from "./constants/postMessageType";
import { IFRAME_STYLE } from "./constants/style";
import { blockScroll, createIframe, hideElement, resizeElementHeight, showElement, unBlockScroll } from "./utils/dom";
import { getModalUrl, getReplyModuleURL } from "./utils/getURL";

const messageChannel = {
  replyModule: new MessageChannel(),
  replyModal: new MessageChannel()
};

const blockTistoryMobilePath = () => {
  if (window.location.host.includes("tistory")) {
    if (window.location.href.includes("/m/")) {
      window.location.href = window.location.href.replace("/m/", "/");
    }
  }
};

const init = () => {
  blockTistoryMobilePath();
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

  const isDarkModePage =
    $darass.dataset.darkMode === undefined ? false : $darass.dataset.darkMode === "true" ? true : false;

  const primaryColor = $darass.dataset.primaryColor || "#0BC586";

  const isShowSortOption =
    $darass.dataset.showSortOption === undefined ? true : $darass.dataset.showSortOption === "true" ? true : false;

  const isAllowSocialLogin =
    $darass.dataset.allowSocialLogin === undefined ? true : $darass.dataset.allowSocialLogin === "true" ? true : false;

  const isShowLogo = $darass.dataset.showLogo === undefined ? true : $darass.dataset.showLogo === "true" ? true : false;

  const $replyModuleIframe = createIframe(
    getReplyModuleURL({ projectKey, isDarkModePage, primaryColor, isShowSortOption, isAllowSocialLogin, isShowLogo }),
    IFRAME_STYLE.REPLY_MODULE
  );
  const $modalIframe = createIframe(getModalUrl({ primaryColor }), IFRAME_STYLE.MODAL);
  $replyModuleIframe.setAttribute("scrolling", "no");

  $darass.append($replyModuleIframe);
  document.body.append($modalIframe);

  const postReplyModulePort = () => {
    try {
      $replyModuleIframe.contentWindow?.postMessage(
        { type: POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODULE.RESPONSE_PORT },
        "*",
        [messageChannel.replyModule.port2]
      );
    } catch (error) {
      console.error("댓글 모듈을 로드하는데에 실패하셨습니다. ");
    }
  };

  const postReplyModalPort = () => {
    try {
      $modalIframe.contentWindow?.postMessage(
        { type: POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODAL.RESPONSE_PORT },
        "*",
        [messageChannel.replyModal.port2]
      );
    } catch (error) {
      console.error("댓글 모달을 로드하는데에 실패하셨습니다.");
    }
  };

  const onMessageFromReplyModuleIFrame = ({ data: { type, data } }: MessageEvent) => {
    const ACTION_TABLE = {
      [POST_MESSAGE_TYPE.MODAL.OPEN.ALERT]: () => {
        messageChannel.replyModal.port1.postMessage({ type: POST_MESSAGE_TYPE.MODAL.OPEN.ALERT, data });
        showElement($modalIframe);
        blockScroll();
      },
      [POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS]: () => {
        messageChannel.replyModal.port1.postMessage({
          type: POST_MESSAGE_TYPE.MODAL.OPEN.LIKING_USERS,
          data
        });
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
  };

  const onMessageFromReplyModalIFrame = ({ data: { type, data } }: MessageEvent) => {
    const ACTION_TABLE = {
      [POST_MESSAGE_TYPE.MODAL.CLOSE.ALERT]: () => {
        messageChannel.replyModule.port1.postMessage({ type: POST_MESSAGE_TYPE.MODAL.CLOSE.ALERT });
        hideElement($modalIframe);
        unBlockScroll();
      },
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
      [POST_MESSAGE_TYPE.MODAL.CLOSE.LIKING_USERS]: () => {
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
  };

  const onMessageForRequestPort = ({ data }: MessageEvent) => {
    if (data.type === POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODULE.REQUEST_PORT) {
      messageChannel.replyModule.port1.addEventListener("message", onMessageFromReplyModuleIFrame);
      messageChannel.replyModule.port1.start();
      postReplyModulePort();
    }
    if (data.type === POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODAL.REQUEST_PORT) {
      messageChannel.replyModal.port1.addEventListener("message", onMessageFromReplyModalIFrame);
      messageChannel.replyModal.port1.start();
      postReplyModalPort();
    }
  };

  window.addEventListener("message", onMessageForRequestPort);
};

window.addEventListener("load", init);
