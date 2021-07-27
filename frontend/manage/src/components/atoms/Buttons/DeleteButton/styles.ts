import styled from "styled-components";
import { PALETTE } from "../../../../styles/palette";

export const Button = styled.button`
  width: fit-content;
  height: 3.6rem;
  background-color: ${PALETTE.GRAY_200};
  border: 1px solid ${PALETTE.GRAY_300};
  color: ${PALETTE.RED_600};
  font-size: 1.6rem;
  font-weight: 500;
  border-radius: 10px;
  padding: 0.3rem 1.4rem;
  transition: all 0.3s;

  &:hover {
    color: ${PALETTE.WHITE};
    background-color: ${PALETTE.RED_600};
  }
`;
