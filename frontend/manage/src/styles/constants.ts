export const PAGE_MAX_WIDTH = "1080px";
export const NAVIGATION_HEIGHT = "70px";

export const Z_INDEX = {
  ERROR_NOTICE: 1,
  NAV: {
    MOBILE: {
      HAMBUGER_BUTTON: 3,
      MENU_WRAPPER: 2,
      DIMMED: {
        OPEN: 2,
        CLOSE: -1
      }
    },
    DESKTOP: {
      USER_AVATAR_WRAPPER: 2
    }
  },

  CONTAINER_WITH_SIDEBAR: {
    SIDEBAR: {
      SELF: 1,
      TITLE: 1
    },
    MAIN_CONTENT: {
      SELF: 0
    }
  },
  CALENDAR: 1,
  MODAL: 2
} as const;

export const LINE_HEIGHT_SCALE = 1.5;
