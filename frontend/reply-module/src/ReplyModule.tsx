import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import CommentArea from "./components/pages/CommentArea";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import OAuth from "./components/pages/OAuth";
import { ROUTE } from "./constants/route";
import { POST_MESSAGE_TYPE } from "./constants/postMessageType";
import GlobalStyles from "./constants/styles/GlobalStyles";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import ErrorPage from "./components/pages/ErrorPage";
import throttling from "./utils/throttle";
import { useEffect, useState } from "react";
import { messageFromReplyModule } from "./utils/postMessage";
import { MessageChannelContext } from "./contexts/messageChannelContext";

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

  const onMessageInitMessageChannel = ({ data, ports }: MessageEvent) => {
    if (data.type !== POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODULE.RESPONSE_PORT) return;

    const [port2] = ports;
    setPort(port2);
  };

  const onResize = throttling({ callback: messageFromReplyModule(port).setScrollHeight, delay: 600 });

  useEffect(() => {
    window.addEventListener("message", onMessageInitMessageChannel);
    window.addEventListener("resize", onResize);
    window.parent.postMessage({ type: POST_MESSAGE_TYPE.INIT_MESSAGE_CHANNEL.REPLY_MODULE.REQUEST_PORT }, "*");

    return () => {
      window.removeEventListener("message", onMessageInitMessageChannel);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <MessageChannelContext.Provider value={{ port }}>
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTE.HOME} component={CommentArea} />
          <Route exact path={ROUTE.OAUTH} component={OAuth} />
          <Redirect to={ROUTE.HOME} />
        </Switch>
      </BrowserRouter>
    </MessageChannelContext.Provider>
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
