export const ROUTE = {
  COMMON: {
    HOME: "/",
    ABOUT: "/about",
    NOTICE: "/notice"
  },
  NON_AUTHORIZED: {
    LOGIN: "/login",
    OAUTH: "/oauth/:provider"
  },
  AUTHORIZED: {
    USER_PROFILE: "/user",
    MY_PROJECT: "/projects",
    PROJECT_DETAIL: "/projects/:id",
    SCRIPT_PUBLISHING: "/projects/:id/guide",
    PROJECT_MANAGE: "/projects/:id/manage",
    STATISTICS: "/projects/:id/statistics",
    NEW_PROJECT: "/projects/new"
  }
} as const;
