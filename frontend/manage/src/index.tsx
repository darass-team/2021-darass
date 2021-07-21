import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";

const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <GlobalStyles />
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
