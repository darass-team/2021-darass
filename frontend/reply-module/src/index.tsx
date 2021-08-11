import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { POST_MESSAGE_TYPE } from "./constants/postMessageType";
import GlobalStyles from "./styles/GlobalStyles";
import { postScrollHeightToParentWindow } from "./utils/postMessage";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import ErrorPage from "./components/pages/ErrorPage";

const init = () => {
  Sentry.init({
    dsn: process.env.SENTRY_REPLY_MODULE_DSN,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1
    //enabled: process.env.BUILD_MODE === "production"
  });

  const onResize = () => {
    let throttle: NodeJS.Timeout | null;

    const runThrottle = () => {
      if (!throttle) {
        throttle = setTimeout(() => {
          throttle = null;
          postScrollHeightToParentWindow();
        }, 600);
      }
    };
    return runThrottle;
  };

  const customClickEvent = new MouseEvent("click", { clientX: 0, clientY: 0 });

  window.addEventListener("resize", onResize());
  window.addEventListener("message", ({ data }: MessageEvent) => {
    if (data.type !== POST_MESSAGE_TYPE.CLICK) return;

    dispatchEvent(customClickEvent);
  });
};

init();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <Sentry.ErrorBoundary fallback={<ErrorPage notice={"예상치 못한 에러가 발생하였습니다."} />}>
      <App />
    </Sentry.ErrorBoundary>
  </QueryClientProvider>,
  document.getElementById("root")
);
