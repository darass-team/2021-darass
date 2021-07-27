import { PALETTE } from "../../../../styles/palette";
import styled from "styled-components";

export const Button = styled.button`
  width: fit-content;
  height: 3.6rem;
  background-color: ${PALETTE.SECONDARY};
  color: ${PALETTE.WHITE};
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 10px;
  padding: 0.3rem 1.4rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${PALETTE.SECONDARY_HOVER};
  }
`;
