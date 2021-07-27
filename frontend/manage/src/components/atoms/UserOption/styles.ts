import styled from "styled-components";
import { speechBubbleCSS } from "../../../styles/css";
import { PALETTE } from "../../../styles/palette";

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
    font-weight: bold;
    padding: 0.1rem 0;
    transition: background-color 0.1s;
  }

  & > *:hover {
    border-radius: 10px;
    background-color: ${PALETTE.GRAY_400};
  }
`;
