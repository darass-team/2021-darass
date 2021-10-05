import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import CommentArea from "./components/pages/CommentArea";
import ErrorPage from "./components/organisms/ErrorPage";
import OAuth from "./components/pages/OAuth";
import { POST_MESSAGE_TYPE } from "./constants/postMessageType";
import { ROUTE } from "./constants/route";
import GlobalStyles from "./constants/styles/GlobalStyles";
import { RecentlyAlarmContentContext } from "./hooks/contexts/useRecentlyAlarmContentContext";
import { useRecentlyAlarmWebSocket } from "./hooks";
import { messageFromReplyModule } from "./utils/postMessage";
import throttling from "./utils/throttle";
import { MessageChannelFromReplyModuleContext } from "./hooks/contexts/useMessageFromReplyModule";
import LoadingPage from "./components/organisms/LoadingPage";

Sentry.init({
  dsn: process.env.SENTRY_REPLY_MODULE_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1,
  enabled: process.env.BUILD_MODE === "production"
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

const App = () => {
  const [port, setPort] = useState<MessagePort>();
  const [receivedMessageFromReplyModal, setReceivedMessageFromReplyModal] = useState<MessageEvent["data"]>();
  const { recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime } = useRecentlyAlarmWebSocket();

  const onMessageInitMessageChannel = ({ data, ports }: MessageEvent) => {
    if (data.type !== POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODULE.RESPONSE_PORT) return;

    const [port2] = ports;
    setPort(port2);

    window.removeEventListener("message", onMessageInitMessageChannel);
  };

  useEffect(() => {
    if (!port) return;

    const onResize = throttling({ callback: messageFromReplyModule(port).setScrollHeight, delay: 600 });
    window.addEventListener("resize", onResize);

    const onListenMessage = ({ data }: MessageEvent) => {
      setReceivedMessageFromReplyModal(data);
    };
    port.removeEventListener("message", onListenMessage);
    port.addEventListener("message", onListenMessage);
    port.start();

    return () => {
      window.removeEventListener("resize", onResize);
      port.removeEventListener("message", onListenMessage);
    };
  }, [port]);

  useEffect(() => {
    window.addEventListener("message", onMessageInitMessageChannel);
    window.parent.postMessage({ type: POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODULE.REQUEST_PORT }, "*");

    return () => window.removeEventListener("message", onMessageInitMessageChannel);
  }, []);

  return (
    <MessageChannelFromReplyModuleContext.Provider
      value={{
        setScrollHeight: messageFromReplyModule(port).setScrollHeight,
        openAlert: messageFromReplyModule(port).openAlert,
        openConfirmModal: messageFromReplyModule(port).openConfirmModal,
        openAlarmModal: messageFromReplyModule(port).openAlarmModal,
        openLikingUserModal: messageFromReplyModule(port).openLikingUserModal,
        receivedMessageFromReplyModal
      }}
    >
      <RecentlyAlarmContentContext.Provider
        value={{ recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path={ROUTE.HOME} component={port ? CommentArea : LoadingPage} />
            <Route exact path={ROUTE.OAUTH} component={OAuth} />
            <Redirect to={ROUTE.HOME} />
          </Switch>
        </BrowserRouter>
      </RecentlyAlarmContentContext.Provider>
    </MessageChannelFromReplyModuleContext.Provider>
  );
};

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <Sentry.ErrorBoundary fallback={<ErrorPage notice={"예상치 못한 에러가 발생하였습니다."} />}>
      <App />
    </Sentry.ErrorBoundary>
  </QueryClientProvider>,
  document.getElementById("root")
);
