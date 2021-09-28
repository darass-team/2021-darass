import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import AlarmModal from "./components/molecules/FullScreenModal/AlarmModal";
import ConfirmModal from "./components/molecules/FullScreenModal/ConfirmModal";
import LikingUsersModal from "./components/molecules/FullScreenModal/LikingUsersModal";
import ErrorPage from "./components/pages/ErrorPage";
import { POST_MESSAGE_TYPE } from "./constants/postMessageType";
import GlobalStyles from "./constants/styles/GlobalStyles";
import { MessageChannelContext } from "./contexts/messageChannelContext";

Sentry.init({
  dsn: process.env.SENTRY_REPLY_MODULE_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1,
  enabled: process.env.BUILD_MODE === "production"
});

const App = () => {
  const [port, setPort] = useState<MessagePort>();

  const onMessageInitMessageChannel = ({ data, ports }: MessageEvent) => {
    if (data.type !== POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODAL.RESPONSE_PORT) return;

    const [port2] = ports;
    setPort(port2);
    window.removeEventListener("message", onMessageInitMessageChannel);
  };

  useEffect(() => {
    window.addEventListener("message", onMessageInitMessageChannel);
    window.parent.postMessage({ type: POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODAL.REQUEST_PORT }, "*");

    return () => window.removeEventListener("message", onMessageInitMessageChannel);
  }, []);

  return (
    <MessageChannelContext.Provider value={{ port }}>
      <LikingUsersModal />
      <ConfirmModal />
      <AlarmModal />
    </MessageChannelContext.Provider>
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
