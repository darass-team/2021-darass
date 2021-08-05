import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "../../../styles/constants";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Introduction = styled.h2`
  font-size: 3rem;
  line-height: ${3 * LINE_HEIGHT_SCALE}rem;
  color: ${PALETTE.WHITE};
  font-weight: 800;
  text-align: center;
`;

export const Button = styled.button`
  min-width: 18rem;
  height: 6rem;
  background: ${PALETTE.TERTIARY};
  border: none;
  border-radius: 4rem;
  font-weight: 800;
  font-size: 2.5rem;
  line-height: ${2.5 * LINE_HEIGHT_SCALE}rem;
  color: ${PALETTE.BLACK_700};
  margin-top: 8.8rem;
`;
