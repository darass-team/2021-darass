import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";

export const CursorWrapper = styled.span`
  border-right: 0.5rem solid transparent;
  animation: blinkCursor 1s infinite;

  @keyframes blinkCursor {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: ${PALETTE.PRIMARY};
    }
  }
`;
