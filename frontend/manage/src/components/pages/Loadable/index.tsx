import loadable from "@loadable/component";
import LoadingPage from "../LoadingPage";

export const LoadableHome = loadable(() => import("../Home"), { fallback: <></> });
export const LoadableScriptPublishing = loadable(() => import("../ScriptPublishing"), { fallback: <></> });
export const LoadableStatistics = loadable(() => import("../Statistics"), { fallback: <></> });
export const LoadableMyProject = loadable(() => import("../MyProject"), { fallback: <></> });
export const LoadableManage = loadable(() => import("../Manage"), { fallback: <></> });
export const LoadableUserProfile = loadable(() => import("../UserProfile"), { fallback: <></> });
export const LoadableNewProject = loadable(() => import("../NewProject"), { fallback: <></> });
export const LoadableProjectDetail = loadable(() => import("../ProjectDetail"), { fallback: <></> });
export const LoadableNotification = loadable(() => import("../Notification"), { fallback: <></> });
