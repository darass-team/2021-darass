import { DOMAIN } from "./domain";

interface BlogGuideInfo {
  name: string;
  logoURL: string;
  iframeSrc: string;
}

interface GuideFile {
  [blogName: string]: BlogGuideInfo;
}

const GUIDE_FILE: GuideFile = {
  TISTORY: {
    name: "티스토리",
    logoURL: `${DOMAIN}/png/tistory.png`,
    iframeSrc: `${DOMAIN}/script-guide/tistory.pdf`
  },
  UNIVERSAL: {
    name: "기타",
    logoURL: `${DOMAIN}/png/universal.png`,
    iframeSrc: `${DOMAIN}/script-guide/universal.pdf`
  }
};

export { GUIDE_FILE };
