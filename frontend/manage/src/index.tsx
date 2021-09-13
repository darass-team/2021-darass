import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import UserProvider from "./contexts/UserProvider";

Sentry.init({
  dsn: process.env.SENTRY_MANAGE_PAGE_DSN,
  integrations: [new Integrations.BrowserTracing()],
  enabled: process.env.BUILD_MODE === "production",
  tracesSampleRate: 1.0
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false
    }
  }
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <GlobalStyles />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserProvider>
  </QueryClientProvider>,
  document.getElementById("root")
);
