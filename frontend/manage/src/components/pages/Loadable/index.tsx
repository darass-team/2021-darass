import Loadable from "react-loadable";
import LoadingPage from "../LoadingPage";

export const LoadableScriptPublishing = Loadable({
  loader: () => import("../ScriptPublishing"),
  loading: () => <LoadingPage />
});

export const LoadableStatistics = Loadable({
  loader: () => import("../Statistics"),
  loading: () => <LoadingPage />
});
