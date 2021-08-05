import { CLIENT_ASSET_BASE_URL } from "./domain";

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
    logoURL: `${CLIENT_ASSET_BASE_URL}/png/tistory.png`,
    iframeSrc: `${CLIENT_ASSET_BASE_URL}/script-guide/tistory.pdf`
  },
  UNIVERSAL: {
    name: "기타",
    logoURL: `${CLIENT_ASSET_BASE_URL}/png/universal.png`,
    iframeSrc: `${CLIENT_ASSET_BASE_URL}/script-guide/universal.pdf`
  }
};

export { GUIDE_FILE };
