import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyles from "./constants/styles/GlobalStyles";

Sentry.init({
  dsn: process.env.SENTRY_MANAGE_PAGE_DSN,
  integrations: [new Integrations.BrowserTracing()],
  enabled: process.env.BUILD_MODE === "production",
  tracesSampleRate: 1.0
});

ReactDOM.render(
  <>
    <GlobalStyles />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>,
  document.getElementById("root")
);
