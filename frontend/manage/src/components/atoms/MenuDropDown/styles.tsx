import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  @keyframes fadein {
    0% {
      transform: translateY(-100%);
      opacity: 0;
      z-index: -1;
    }
    100% {
      transform: translateY(0%);
      opacity: 1;
      z-index: 1;
    }
  }

  @keyframes displayVisible {
    0% {
      max-height: 0;
    }
    100% {
      max-height: 100%;
    }
  }

  > *:not(:first-child) {
    overflow: hidden;

    animation: fadein 0.2s ease-in forwards, displayVisible 0.3s forwards;
  }
`;

export const MainTitle = styled.button<{ isDropDown: Boolean; depth: number }>`
  position: relative;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: ${props => 1.2 - 1.2 * 0.1 * props.depth}rem;
  font-weight: 700;
  padding: 0.3rem 0 0.3rem ${props => 1 + 1 * 0.5 * props.depth}rem;

  transition: all 0.1s ease-in;

  &:hover {
    background-color: ${PALETTE.WHITE_HOVER};
  }

  & > img {
    transform: ${props => props.isDropDown && "rotate(180deg);"};
  }
`;
