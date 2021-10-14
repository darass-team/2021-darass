import styled from "styled-components";
import { Z_INDEX } from "@/constants/styles/constants";
import { SpeechBubbleCSS } from "@/constants/styles/css";
import { PALETTE } from "@/constants/styles/palette";

export const Container = styled.div`
  position: absolute;
  z-index: ${Z_INDEX.CommentOption};
`;

export const OptionIcon = styled.img`
  cursor: pointer;
`;

export const OptionContainer = styled.div`
  ${SpeechBubbleCSS};
  padding: 0.6rem 0.6rem;
  right: -5px;

  & > * {
    width: 100%;
    border-radius: 0.5rem;
    font-weight: 700;
    padding: 0.3rem 0;
    transition: background-color 0.3s;
  }

  @media (hover: hover) and (pointer: fine) {
    & > *:hover {
      background-color: ${PALETTE.WHITE_HOVER};
    }
  }
`;

export const EditButton = styled.button`
  color: ${PALETTE.BLACK_700};
  background: transparent;
`;
export const DeleteButton = styled.button`
  color: ${PALETTE.RED_600};
  background: transparent;
`;
export const ViewButton = styled.button`
  color: ${PALETTE.BLACK_700};
  background: transparent;
`;
