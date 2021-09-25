import { Z_INDEX } from "@/constants/styles/constants";
import { contentBoxCSS } from "@/constants/styles/css";
import styled from "styled-components";

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
