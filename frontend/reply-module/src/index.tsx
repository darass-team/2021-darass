import ReactDOM from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "./App";
import { POST_MESSAGE_TYPE } from "./constants/postMessageType";
import GlobalStyles from "./styles/GlobalStyles";
import { postScrollHeightToParentWindow } from "./utils/postMessage";

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
    <App />
  </QueryClientProvider>,
  document.getElementById("root")
);
