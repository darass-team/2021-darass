import styled from "styled-components";
import { LINE_HEIGHT_SCALE, Z_INDEX } from "../../../styles/constants";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div<{ isDropDown: boolean | null }>`
  width: 100%;
  display: flex;
  flex-direction: column;

  @keyframes fadein {
    0% {
      transform: translateY(-100%);
      opacity: 0;
      max-height: 0;
    }
    70% {
      max-height: 100vh;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
      max-height: 100vh;
    }
  }

  @keyframes fadeout {
    0% {
      transform: translateY(0%);
      opacity: 1;
      max-height: 100vh;
    }
    70% {
      max-height: 0;
    }
    100% {
      transform: translateY(-100%);
      opacity: 0;
      max-height: 0;
    }
  }

  > *:not(:first-child) {
    overflow: hidden;
    max-height: 100vh;
    animation: ${props => (props.isDropDown ? "fadein 0.5s linear forwards" : "fadeout 0.5s linear forwards")};
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
  line-height: ${props => 1.2 - 1.2 * 0.1 * props.depth * LINE_HEIGHT_SCALE}rem;
  padding: 0.3rem 0 0.3rem ${props => 1 + 1 * 0.5 * props.depth}rem;
  z-index: ${props => Z_INDEX.CONTAINER_WITH_SIDEBAR.SIDEBAR.TITLE + props.depth};
  transition: "all 0.1s ease-in";

  &:hover {
    background-color: ${PALETTE.WHITE_HOVER};
  }

  & > img {
    transform: ${props => props.isDropDown && "rotate(180deg)"};
  }
`;
