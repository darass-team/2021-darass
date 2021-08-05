const ROUTE = {
  HOME: "/",
  LOGIN: "/login",
  USER_PROFILE: "/user",
  MY_PROJECT: "/projects",
  PROJECT_DETAIL: "/projects/:id",
  SCRIPT_PUBLISHING: "/projects/:id/guide",
  PROJECT_MANAGE: "/projects/:id/manage",
  NEW_PROJECT: "/projects/new",
  GET_PROJECT_DETAIL: (id: number) => `/projects/${id}`,
  GET_SCRIPT_PUBLISHING: (id: number) => `/projects/${id}/guide`,
  GET_PROJECT_MANAGE: (id: number) => `/projects/${id}/manage`
};

export { ROUTE };
