import { PALETTE } from "@/constants/styles/palette";
import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";

export const Button = styled.button`
  width: fit-content;
  height: 3.6rem;
  background-color: ${PALETTE.SECONDARY};
  color: ${PALETTE.WHITE};
  font-size: 1.4rem;
  line-height: ${1.4 * LINE_HEIGHT_SCALE}rem;
  font-weight: 700;
  border-radius: 10px;
  padding: 0.3rem 1.4rem;
  transition: background-color 0.3s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: ${PALETTE.SECONDARY_HOVER};
    }
  }
`;
