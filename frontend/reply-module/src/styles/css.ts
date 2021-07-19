import { css } from "styled-components";
import { PALETTE } from "./palette";

const InputCSS = css`
  border: 1px solid ${PALETTE.BLACK_700};
  border-radius: 10px;
  color: ${PALETTE.BLACK_700};
  font-size: 1.4rem;
  outline: none;

  &::placeholder {
    color: ${PALETTE.BLACK_700};
  }
`;

const SpeechBubbleCSS = css`
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
    top: -5px;
    right: 8px;

    border-bottom: 10px solid ${PALETTE.WHITE};
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
  }

  & > button {
    width: 100%;
    background-color: ${PALETTE.WHITE};
    font-weight: 600;
    margin-bottom: 0.3rem;

    :first-child {
      padding-top: 0.5rem;
      border-radius: 10px 10px 0 0;
    }

    :last-child {
      margin-bottom: 0;
      padding-bottom: 0.5rem;
      border-radius: 0 0 10px 10px;
    }
  }
`;

export { InputCSS, SpeechBubbleCSS };
