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
  ${({ isOpen }) => !isOpen && "visibility: collapse"};
`;

export const Container = styled.div<{ isOpen: boolean; fadeInFrom: FadeInDirection }>`
  & > * {
    position: absolute;

    ${({ isOpen, fadeInFrom }) => fadeInDirectionCSS[fadeInFrom](isOpen)};
  }
`;
