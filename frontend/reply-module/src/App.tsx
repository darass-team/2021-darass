import CommentPage from "./components/pages/CommentPage";

const onResize = () => {
  let throttle: NodeJS.Timeout | null;

  const postScrollHeightToParent = () => {
    if (!throttle) {
      throttle = setTimeout(() => {
        throttle = null;
        window.parent.postMessage(document.querySelector("#root")?.scrollHeight, "*");
      }, 600);
    }
  };
  return postScrollHeightToParent;
};

window.addEventListener("resize", onResize());

const App = () => {
  return <CommentPage />;
};

export default App;
