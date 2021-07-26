import { PALETTE } from "./../../../styles/palette";
import styled from "styled-components";

export const Button = styled.button`
  width: 6rem;
  height: 3.6rem;
  background-color: ${PALETTE.SECONDARY};
  color: ${PALETTE.WHITE};
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 10px;

  &:disabled {
    background-color: ${PALETTE.PRIMARY};
  }
`;
