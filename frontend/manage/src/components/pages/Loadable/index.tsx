import loadable from "@loadable/component";
import LoadingPage from "../LoadingPage";

export const LoadableScriptPublishing = loadable(() => import("../ScriptPublishing"), { fallback: <LoadingPage /> });

export const LoadableStatistics = loadable(() => import("../Statistics"), { fallback: <LoadingPage /> });
