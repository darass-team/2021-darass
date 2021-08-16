import styled from "styled-components";
import { SpeechBubbleCSS } from "../../../styles/css";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div`
  ${SpeechBubbleCSS};
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
  line-height: 1.2rem;
  margin-bottom: 0.5rem;
`;

export const OptionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 2.5rem;
    border-radius: 0.7rem;
    padding: 0.4rem 0;
    transition: background-color 0.3s;
  }

  @media (hover: hover) and (pointer: fine) {
    & > *:hover {
      background-color: ${PALETTE.GRAY_HOVER};
    }
  }
`;
