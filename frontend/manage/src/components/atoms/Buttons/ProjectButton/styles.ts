import { PALETTE } from "./../../../../styles/palette";
import styled from "styled-components";

const Button = styled.button`
  width: 28rem;
  height: 4rem;
  border: 1px solid ${PALETTE.BLACK_700};
  border-radius: 20px;
  background-color: ${PALETTE.WHITE};
  color: ${PALETTE.BLACK_700};
  font-size: 1.6rem;
  font-weight: 800;
`;

export { Button };
