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
    NOTIFICATION: "/notification",
    get NEW_PROJECT() {
      return `${this.MY_PROJECT}/new`;
    },
    get PROJECT_DETAIL() {
      return `${this.MY_PROJECT}/:id`;
    },
    get SCRIPT_PUBLISHING() {
      return `${this.PROJECT_DETAIL}/guide`;
    },
    get PROJECT_MANAGE() {
      return `${this.PROJECT_DETAIL}/manage`;
    },
    get STATISTICS() {
      return `${this.PROJECT_DETAIL}/statistics`;
    }
  }
} as const;
