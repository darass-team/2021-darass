import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import { speechBubbleCSS } from "@/constants/styles/css";
import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";

export const Container = styled.div`
  ${speechBubbleCSS};
  background-color: ${PALETTE.GRAY_200};
  width: 10rem;
  ::before {
    border-bottom: 10px solid ${PALETTE.GRAY_200};
  }
  padding: 0.6rem 0.6rem;
`;

export const Label = styled.span`
  align-self: flex-start;
  font-size: 0.8rem;
  line-height: ${0.8 * LINE_HEIGHT_SCALE}rem;
  margin-bottom: 0.5rem;
`;

export const OptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  cursor: pointer;

  & > * {
    text-align: center;
    width: 100%;
    font-size: 1.2rem;
    line-height: ${1.2 * LINE_HEIGHT_SCALE}rem;
    font-weight: bold;
    border-radius: 10px;
    padding: 0.3rem 0;
    transition: background-color 0.1s;
  }

  & > * {
    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background-color: ${PALETTE.GRAY_400};
      }
    }
  }
`;
