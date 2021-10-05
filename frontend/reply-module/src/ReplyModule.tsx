import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import ErrorPage from "./components/organisms/ErrorPage";
import LoadingPage from "./components/organisms/LoadingPage";
import CommentArea from "./components/pages/CommentArea";
import OAuth from "./components/pages/OAuth";
import { ROUTE } from "./constants/route";
import GlobalStyles from "./constants/styles/GlobalStyles";
import { MessageChannelFromReplyModuleContext } from "./hooks/contexts/useMessageFromReplyModule";
import { RecentlyAlarmContentContext } from "./hooks/contexts/useRecentlyAlarmContentContext";
import { useReplyModule } from "./useReplyModule";
import { messageFromReplyModule } from "./utils/postMessage";

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
  const { port, recentlyAlarmContent, hasNewAlarmOnRealTime, setHasNewAlarmOnRealTime, receivedMessageFromReplyModal } =
    useReplyModule();

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
