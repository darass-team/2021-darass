import styled from "styled-components";
import { PALETTE } from "@/styles/palette";
import { LINE_HEIGHT_SCALE, Z_INDEX } from "@/styles/constants";
import { contentBoxCSS } from "@/styles/css";

export const Container = styled.div`
  position: relative;
  z-index: ${Z_INDEX.NAV.DESKTOP.ALARM};
  padding-top: 0.2rem;
`;

export const DropDownContainer = styled.div`
  position: absolute;
  height: fit-content;
  max-height: 30rem;
  min-height: 30rem;
  right: 0;
  width: 30rem;
  overflow-y: scroll;
  ${contentBoxCSS}
  padding: 0rem;
`;

export const DropDownHeader = styled.div`
  padding: 1rem;
  background-color: ${PALETTE.WHITE};
  line-height: ${1 * LINE_HEIGHT_SCALE};
`;

export const NotificationCount = styled.span`
  color: ${PALETTE.SECONDARY};
  font-weight: 700;
`;

export const DropDownContent = styled.div`
  padding: 0.5rem 1rem;
  width: 100%;
  height: auto;
  border-top: 1px solid ${PALETTE.GRAY_400};
  border-bottom: none;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s linear;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${PALETTE.GRAY_300};
    }
  }
`;
export const ContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
`;

export const Notification = styled.span`
  display: flex;
  justify-content: space-between;
`;

export const Name = styled.span`
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
  font-weight: 600;
  color: ${PALETTE.SECONDARY};
`;

export const Content = styled.span`
  display: flex;
  line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
  margin-top: 0.5rem;
`;

export const Url = styled.span`
  color: ${PALETTE.GRAY_500};
`;
