import * as Sentry from "@sentry/react";
import ReactDOM from "react-dom";
import { Integrations } from "@sentry/tracing";
import { useEffect, useState } from "react";
import AlarmModal from "./components/molecules/AlarmModal";
import AlertModal from "./components/molecules/AlertModal";
import ConfirmModal from "./components/molecules/ConfirmModal";
import LikingUsersModal from "./components/molecules/LikingUsersModal";
import ErrorPage from "./components/organisms/ErrorPage";
import LoadingPage from "./components/organisms/LoadingPage";
import { POST_MESSAGE_TYPE } from "./constants/postMessageType";
import GlobalStyles from "./constants/styles/GlobalStyles";
import { MessageChannelFromReplyModalContext } from "./hooks/contexts/useMessageFromReplyModal";
import { messageFromReplyModal } from "./utils/postMessage";

Sentry.init({
  dsn: process.env.SENTRY_REPLY_MODULE_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1,
  enabled: process.env.BUILD_MODE === "production"
});

const App = () => {
  const [port, setPort] = useState<MessagePort>();
  const [receivedMessageFromReplyModule, setReceivedMessageFromReplyModule] = useState<MessageEvent["data"]>();

  const onMessageInitMessageChannel = ({ data, ports }: MessageEvent) => {
    if (data.type !== POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODAL.RESPONSE_PORT) return;

    const [port2] = ports;
    setPort(port2);
    window.removeEventListener("message", onMessageInitMessageChannel);
  };

  const onListenMessage = ({ data }: MessageEvent) => {
    setReceivedMessageFromReplyModule(data);
  };

  useEffect(() => {
    window.addEventListener("message", onMessageInitMessageChannel);
    window.parent.postMessage({ type: POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODAL.REQUEST_PORT }, "*");

    return () => window.removeEventListener("message", onMessageInitMessageChannel);
  }, []);

  useEffect(() => {
    if (!port) return;

    port.removeEventListener("message", onListenMessage);
    port.addEventListener("message", onListenMessage);
    port.start();

    return () => port.removeEventListener("message", onListenMessage);
  }, [port]);

  if (!port) {
    return <LoadingPage />;
  }

  return (
    <MessageChannelFromReplyModalContext.Provider
      value={{
        clickedConfirmNo: messageFromReplyModal(port).clickedConfirmNo,
        clickedConfirmOk: messageFromReplyModal(port).clickedConfirmOk,
        closeAlertModal: messageFromReplyModal(port).closeAlertModal,
        closeConfirmModal: messageFromReplyModal(port).closeConfirmModal,
        closeAlarmModal: messageFromReplyModal(port).closeAlarmModal,
        closeLikingUserModal: messageFromReplyModal(port).closeLikingUserModal,
        receivedMessageFromReplyModule
      }}
    >
      <LikingUsersModal />
      <ConfirmModal />
      <AlarmModal />
      <AlertModal />
    </MessageChannelFromReplyModalContext.Provider>
  );
};

ReactDOM.render(
  <>
    <GlobalStyles />
    <Sentry.ErrorBoundary fallback={<ErrorPage notice={"예상치 못한 에러가 발생하였습니다."} />}>
      <GlobalStyles />
      <App />
    </Sentry.ErrorBoundary>
  </>,
  document.getElementById("root")
);
