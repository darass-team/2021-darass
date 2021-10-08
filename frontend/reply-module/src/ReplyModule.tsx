import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ErrorPage from "@/components/@organisms/ErrorPage";
import GlobalStyles from "@/constants/styles/GlobalStyles";
import App from "@/components/ReplyModuleApp";

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

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <Sentry.ErrorBoundary fallback={<ErrorPage notice={"예상치 못한 에러가 발생하였습니다."} />}>
      <App />
    </Sentry.ErrorBoundary>
  </QueryClientProvider>,
  document.getElementById("root")
);
