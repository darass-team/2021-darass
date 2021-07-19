import CommentPage from "./components/pages/CommentPage";
import { postScrollHeightToParentWindow } from "./utils/iframePostMessage";

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

window.addEventListener("resize", onResize());

const App = () => {
  return <CommentPage />;
};

export default App;
