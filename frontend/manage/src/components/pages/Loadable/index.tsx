import Loadable from "react-loadable";
import ErrorPage from "../ErrorPage";

export const LoadableScriptPublishing = Loadable({
  loader: () => import("../ScriptPublishing"),
  loading: () => <ErrorPage notice="로딩 중"></ErrorPage>
});

export const LoadableStatistics = Loadable({
  loader: () => import("../Statistics"),
  loading: () => <ErrorPage notice="로딩 중"></ErrorPage>
});
