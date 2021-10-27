import { PNG, SCRIPT_GUIDE } from "./clientAssets";

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
    logoURL: PNG.TISTORY,
    iframeSrc: SCRIPT_GUIDE.TISTORY,
    scriptType: "HTML"
  },
  GATSBY: {
    name: "Gatsby",
    logoURL: PNG.GATSBY,
    iframeSrc: SCRIPT_GUIDE.GATSBY,
    scriptType: "JSX"
  },
  JEKYLL: {
    name: "Jekyll",
    logoURL: PNG.JEKYLL,
    iframeSrc: SCRIPT_GUIDE.JEKYLL,
    scriptType: "HTML"
  },
  HEXO: {
    name: "Hexo",
    logoURL: PNG.HEXO,
    iframeSrc: SCRIPT_GUIDE.HEXO,
    scriptType: "HTML"
  },
  UNIVERSAL: {
    name: "기타",
    logoURL: PNG.UNIVERSAL,
    iframeSrc: SCRIPT_GUIDE.UNIVERSAL,
    scriptType: "HTML"
  }
} as const;
