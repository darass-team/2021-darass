import loadable from "@loadable/component";
import LoadingPage from "../LoadingPage";

export const LoadableHome = loadable(() => import("../Home"), { fallback: <LoadingPage /> });
export const LoadableScriptPublishing = loadable(() => import("../ScriptPublishing"), { fallback: <LoadingPage /> });
export const LoadableStatistics = loadable(() => import("../Statistics"), { fallback: <LoadingPage /> });
export const LoadableMyProject = loadable(() => import("../MyProject"), { fallback: <LoadingPage /> });
export const LoadableManage = loadable(() => import("../Manage"), { fallback: <LoadingPage /> });
export const LoadableUserProfile = loadable(() => import("../UserProfile"), { fallback: <LoadingPage /> });
export const LoadableNewProject = loadable(() => import("../NewProject"), { fallback: <LoadingPage /> });
export const LoadableProjectDetail = loadable(() => import("../ProjectDetail"), { fallback: <LoadingPage /> });
