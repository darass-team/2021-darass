import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div<{ isDropDown: boolean | null }>`
  width: 100%;
  display: flex;
  flex-direction: column;

  @keyframes fadein {
    0% {
      transform: translateY(-100%);

      opacity: 0;
      z-index: -1;
      max-height: 0;
    }
    30% {
      max-height: 100vh;
    }
    90% {
      z-index: -1;
    }
    100% {
      transform: translateY(0%);

      opacity: 1;
      z-index: 1;
      max-height: 100vh;
    }
  }

  @keyframes fadeout {
    0% {
      transform: translateY(0%);

      opacity: 1;
      z-index: 1;
      max-height: 100vh;
    }
    10% {
      z-index: -1;
    }
    70% {
      max-height: 0;
    }
    100% {
      transform: translateY(-100%);

      opacity: 0;
      z-index: -1;
      max-height: 0;
    }
  }
  overflow: hidden;

  > *:not(:first-child) {
    overflow: hidden;
    max-height: 100vh;

    animation: ${props => (props.isDropDown ? "fadein 0.5s ease-in forwards" : "fadeout 0.5s ease-out forwards")};
  }
`;

export const MainTitle = styled.button<{ isDropDown: boolean | null; depth: number }>`
  position: relative;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 700;
  font-size: ${props => 1.2 - 1.2 * 0.1 * props.depth}rem;
  padding: 0.3rem 0 0.3rem ${props => 1 + 1 * 0.5 * props.depth}rem;

  transition: all 0.1s ease-in;

  &:hover {
    background-color: ${PALETTE.WHITE_HOVER};
  }

  & > img {
    transform: ${props => props.isDropDown && "rotate(180deg);"};
  }
`;
