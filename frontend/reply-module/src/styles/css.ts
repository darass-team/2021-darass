import { css } from "styled-components";
import { PALETTE } from "./palette";

export const InputCSS = css`
  border: 1px solid ${PALETTE.BLACK_700};
  border-radius: 10px;
  color: ${PALETTE.BLACK_700};
  font-size: 1.4rem;
  outline: none;

  &::placeholder {
    color: ${PALETTE.BLACK_700};
  }
`;

export const SpeechBubbleCSS = css`
  position: absolute;
  width: 6rem;
  box-shadow: 1.04082px 1.04082px 6.24491px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${PALETTE.WHITE};

  ::before {
    content: "";
    position: absolute;
    top: -7px;
    right: 8px;

    border-bottom: 10px solid ${PALETTE.WHITE};
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }
`;
