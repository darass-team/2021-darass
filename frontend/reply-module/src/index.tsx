import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { postScrollHeightToParentWindow } from "./utils/iframePostMessage";

const init = () => {
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
  window.addEventListener("message", (event: MessageEvent) => {
    if (event.data !== "click") return;

    dispatchEvent(customClickEvent);
  });
};

init();

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
