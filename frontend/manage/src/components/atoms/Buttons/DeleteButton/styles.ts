import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import styled from "styled-components";
import { PALETTE } from "@/constants/styles/palette";

export const Button = styled.button.attrs({ type: "button" })`
  min-width: fit-content;
  height: 3.6rem;
  background-color: ${PALETTE.GRAY_200};
  border: 1px solid ${PALETTE.GRAY_500};
  color: ${PALETTE.RED_800};
  font-size: 1.4rem;
  line-height: ${1.4 * LINE_HEIGHT_SCALE}rem;
  font-weight: 700;
  border-radius: 10px;
  padding: 0.3rem 1.4rem;
  transition: all 0.3s;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${PALETTE.WHITE};
      background-color: ${PALETTE.RED_800};
    }
  }
`;
