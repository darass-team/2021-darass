import { CLIENT_ASSET_DOMAIN } from "./domain";

const hasKey = <T extends object>(obj: T, k: keyof any): k is keyof T => k in obj;

const _SVG = {
  ARROW_DOWN: "/arrow-down",
  BACK_BUTTON: "/back-button",
  CAMERA: "/camera",
  DEFAULT_USER_IMAGE: "/default-user-image",
  DOWN_ARROW: "/down-arrow",
  DOWN_RIGHT_ARROW: "/down-right-arrow",
  GITHUB_LOGO: "/github",
  HAMBURGER: "/hambuger",
  KAKAO: "/kakao",
  LIKE: "/like",
  LOADING: "/loading",
  MOON_ICON: "/moon",
  SUN_ICON: "/sun",
  SCROLL_DOWN: "/scroll-down",
  THREE_DOTS: "/three-dots"
} as const;

export const SVG = new Proxy(_SVG, {
  get(target, props) {
    if (hasKey(target, props)) {
      return CLIENT_ASSET_DOMAIN + "/svg" + target[props] + ".svg";
    }

    return undefined;
  }
});

const _PNG = {
  ALARM: "/alarm",
  GATSBY: "/gatsby",
  HEXO: "/hexo",
  HOME_BACKGROUND_IMAGE_1: "/home_background_image",
  HOME_BACKGROUND_IMAGE_2: "/home_background_image2",
  JEKYLL: "/jekyll",
  KAKAO_LOGO: "/kakaotalk",
  LOGIN_PAGE_BACKGROUND: "/ loginpage_background",
  LOGO: "/logo",
  NAVER_LOGO: "/naver",
  PHONE_SMALL: "/phone_small",
  TISTORY: "/tistory",
  UNIVERSAL: "/universal",
  WOOTECO: "/wooteco"
};

export const PNG = new Proxy(_PNG, {
  get(target, props) {
    if (hasKey(target, props)) {
      return CLIENT_ASSET_DOMAIN + "/png" + target[props] + ".png";
    }

    return undefined;
  }
});
