const ROUTE = {
  HOME: "/",
  LOGIN: "/login",
  ABOUT: "/about",
  NOTICE: "/notice",
  USER_PROFILE: "/user",
  MY_PROJECT: "/projects",
  PROJECT_DETAIL: "/projects/:id",
  SCRIPT_PUBLISHING: "/projects/:id/guide",
  PROJECT_MANAGE: "/projects/:id/manage",
  STATISTICS: "/projects/:id/statistics",
  NEW_PROJECT: "/projects/new",
  GET_PROJECT_DETAIL: (id: number) => `/projects/${id}`,
  GET_SCRIPT_PUBLISHING: (id: number) => `/projects/${id}/guide`,
  GET_PROJECT_MANAGE: (id: number) => `/projects/${id}/manage`,
  GET_STATISTICS: (id: number) => `/projects/${id}/statistics`
} as const;

export { ROUTE };
