import styled from "styled-components";
import { SpeechBubbleCSS } from "../../../styles/css";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div`
  position: absolute;
`;

export const OptionIcon = styled.img`
  cursor: pointer;
`;

export const OptionContainer = styled.div`
  ${SpeechBubbleCSS};
  right: -5px;
`;

export const EditButton = styled.button`
  color: ${PALETTE.BLACK_700};
  background: transparent;
`;
export const DeleteButton = styled.button`
  color: ${PALETTE.RED_600};
  background: transparent;
`;
