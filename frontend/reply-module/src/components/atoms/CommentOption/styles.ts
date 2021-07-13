import styled from "styled-components";
import { SpeechBubbleCSS } from "../../../styles/css";
import { PALETTE } from "../../../styles/palette";

const Container = styled.div`
  position: absolute;
`;

const OptionIcon = styled.img`
  cursor: pointer;
`;

const OptionContainer = styled.div`
  ${SpeechBubbleCSS};
  right: -5px;
`;

const EditButton = styled.button`
  color: ${PALETTE.BLACK_700};
`;
const DeleteButton = styled.button`
  color: ${PALETTE.RED_600};
`;

export { Container, OptionIcon, OptionContainer, EditButton, DeleteButton };
