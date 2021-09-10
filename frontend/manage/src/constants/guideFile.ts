import { CLIENT_ASSET_DOMAIN } from "./domain";

interface BlogGuideInfo {
  name: string;
  logoURL: string;
  iframeSrc: string;
  scriptType: "JSX" | "HTML";
}

interface GuideFile {
  [blogName: string]: BlogGuideInfo;
}

export const GUIDE_FILE: GuideFile = {
  TISTORY: {
    name: "티스토리",
    logoURL: `${CLIENT_ASSET_DOMAIN}/png/tistory.png`,
    iframeSrc: `${CLIENT_ASSET_DOMAIN}/script-guide/tistory.pdf`,
    scriptType: "HTML"
  },
  GATSBY: {
    name: "Gatsby",
    logoURL: `${CLIENT_ASSET_DOMAIN}/png/gatsby.png`,
    iframeSrc: `${CLIENT_ASSET_DOMAIN}/script-guide/gatsby.pdf`,
    scriptType: "JSX"
  },
  JEKYLL: {
    name: "Jekyll",
    logoURL: `${CLIENT_ASSET_DOMAIN}/png/jekyll.png`,
    iframeSrc: `${CLIENT_ASSET_DOMAIN}/script-guide/jekyll.pdf`,
    scriptType: "HTML"
  },
  HEXO: {
    name: "Hexo",
    logoURL: `${CLIENT_ASSET_DOMAIN}/png/hexo.png`,
    iframeSrc: `${CLIENT_ASSET_DOMAIN}/script-guide/hexo.pdf`,
    scriptType: "HTML"
  },
  UNIVERSAL: {
    name: "기타",
    logoURL: `${CLIENT_ASSET_DOMAIN}/png/universal.png`,
    iframeSrc: `${CLIENT_ASSET_DOMAIN}/script-guide/universal.pdf`,
    scriptType: "HTML"
  }
} as const;
