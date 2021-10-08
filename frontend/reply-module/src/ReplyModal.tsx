import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import ReactDOM from "react-dom";
import ErrorPage from "@/components/@organisms/ErrorPage";
import GlobalStyles from "@/constants/styles/GlobalStyles";
import App from "@/components/ReplyModalApp";

Sentry.init({
  dsn: process.env.SENTRY_REPLY_MODULE_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1,
  enabled: process.env.BUILD_MODE === "production"
});

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
