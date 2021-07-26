import styled from "styled-components";
import { PALETTE } from "../../../../styles/palette";

export const Button = styled.button`
  width: 225px;
  height: 75px;
  background: ${PALETTE.TERTIARY};
  border: none;
  border-radius: 40px;
  font-weight: 800;
  font-size: 1.5rem;
  color: ${PALETTE.BLACK_700};
`;
