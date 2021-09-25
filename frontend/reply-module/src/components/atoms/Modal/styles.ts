import { CLOSE_MODAL_ANIMATION_FINISH_TIME } from "@/constants/styles/constants";
import { fadeInDirectionCSS } from "@/constants/styles/css";
import styled from "styled-components";
import { FadeInDirection } from ".";

export const Dimmed = styled.div<{ isOpen: boolean; opacity: number; fadeInFrom: FadeInDirection }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ opacity }) => `rgba(0, 0, 0, ${opacity})`};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};

  transition: all 0.2s linear;
  visibility: ${({ isOpen }) => (isOpen ? "visible" : "collapse")};
`;

export const Container = styled.div<{ isOpen: boolean; fadeInFrom: FadeInDirection }>`
  & > * {
    position: absolute;
    transition: all ${CLOSE_MODAL_ANIMATION_FINISH_TIME}ms ease-in-out;
    ${({ isOpen, fadeInFrom }) => fadeInDirectionCSS[fadeInFrom](isOpen)};
  }
`;
