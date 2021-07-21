import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";

document.addEventListener("keydown", event => {
  event.stopPropagation();
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
