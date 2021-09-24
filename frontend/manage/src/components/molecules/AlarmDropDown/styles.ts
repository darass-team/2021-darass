import styled from "styled-components";
import { PALETTE } from "@/styles/palette";
import { LINE_HEIGHT_SCALE, Z_INDEX } from "@/styles/constants";
import { contentBoxCSS } from "@/styles/css";

export const Container = styled.div`
  position: relative;
  z-index: ${Z_INDEX.NAV.DESKTOP.ALARM_ICON};
  padding-top: 0.2rem;
`;

export const DropDownContainer = styled.div`
  position: absolute;
  height: fit-content;
  max-height: 30rem;
  min-height: 30rem;
  right: -4rem;
  top: 3rem;
  width: 30rem;
  overflow-y: scroll;
  ${contentBoxCSS}
  padding: 0rem;
  z-index: ${Z_INDEX.NAV.DESKTOP.ALARM_DROPDOWN};
`;
