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
    get NEW_PROJECT() {
      return `${this.MY_PROJECT}/new`;
    },
    get PROJECT_DETAIL() {
      return `${this.MY_PROJECT}/:id`;
    },
    get SCRIPT_PUBLISHING() {
      return `${this.MY_PROJECT}/:id/guide`;
    },
    get PROJECT_MANAGE() {
      return `${this.MY_PROJECT}/:id/manage`;
    },
    get STATISTICS() {
      return `${this.MY_PROJECT}/:id/statistics`;
    }
  }
} as const;
