const ROUTE = {
  HOME: "/",
  LOGIN: "/login",
  MY_PROJECT: "/projects",
  NEW_PROJECT: "/projects/new",
  PROJECT_DETAIL: "/projects/:id",
  SCRIPT_PUBLISHING: "/projects/:id/guide",
  GET_PROJECT_DETAIL: (id: number) => `/projects/${id}`,
  GET_SCRIPT_PUBLISHING: (id: number) => `/projects/${id}/guide`
};

export { ROUTE };
