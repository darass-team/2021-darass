import { DOMAIN } from "./domain";

interface GuideFile {
  [blogName: string]: {
    logoURL: string;
    iframeSrc: string;
  };
}

const GUIDE_FILE: GuideFile = {
  UNIVERSAL: {
    logoURL: `${DOMAIN}/png/universal.png`,
    iframeSrc: `${DOMAIN}/script-guide/universal.pdf`
  },
  TISTORY: {
    logoURL: `${DOMAIN}/png/tistory.png`,
    iframeSrc: `${DOMAIN}/script-guide/tistory.pdf`
  }
};

export { GUIDE_FILE };
