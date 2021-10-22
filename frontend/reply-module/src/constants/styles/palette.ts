export const PALETTE = {
  PRIMARY: "#0BC586",
  WHITE: "#FFFFFF",
  BLACK_700: "#303030",
  BLACK_900: "#000000",
  GRAY_100: "#f1f3f5",
  GRAY_200: "#e9ecef",
  GRAY_300: "#dee2e6",
  GRAY_400: "#ced4da",
  GRAY_500: "#B5B5B5",
  GRAY_600: "#868e96",
  GRAY_700: "#495057",
  GRAY_800: "#343a40",
  RED_500: "#EC2626",
  RED_600: "#E41E1E",
  RED_800: "#CB2431",
  INDIGO_600: "#4c6ef5",
  BLUE_500: "#005EFF",
  BLUE_700: "#065FD4",
  get BAR() {
    return this.GRAY_500;
  },
  get WHITE_HOVER() {
    return this.GRAY_400;
  },
  get GRAY_HOVER() {
    return this.GRAY_500;
  },
  get DEFAULT_BG() {
    return this.GRAY_300;
  }
} as const;
