import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import { PALETTE } from "@/constants/styles/palette";

export const Button = styled.button`
  width: 225px;
  height: 75px;
  background: ${PALETTE.TERTIARY};
  border: none;
  border-radius: 40px;
  font-weight: 700;
  font-size: 1.5rem;
  line-height: ${1.5 * LINE_HEIGHT_SCALE}rem;
  color: ${PALETTE.BLACK_700};
`;
