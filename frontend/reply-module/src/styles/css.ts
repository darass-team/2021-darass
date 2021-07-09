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

export { InputCSS };
