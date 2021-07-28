import CommentArea from "./components/pages/CommentArea";
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
  return <CommentArea />;
};

export default App;
