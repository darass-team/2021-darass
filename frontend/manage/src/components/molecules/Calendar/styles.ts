import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import { PALETTE } from "@/constants/styles/palette";

export const Container = styled.div`
  min-width: 20rem;
  min-height: 20rem;
  padding: 1rem;
  box-shadow: 1px 1px 20px 0 rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  background-color: ${PALETTE.WHITE};
`;

export const Header = styled.div`
  padding: 0 1rem;
  color: ${PALETTE.BLACK_700};
  position: relative;
  width: 100%;
  text-align: center;
  border-bottom: 1px solid ${PALETTE.BLACK_700};
  margin-bottom: 2rem;
`;

export const MoveMonthButton = styled.button.attrs({ type: "button" })`
  position: absolute;
  cursor: pointer;
  left: 1rem;
  font-size: 2rem;
  line-height: ${2 * LINE_HEIGHT_SCALE}rem;
  width: 2rem;
  user-select: none;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      color: ${PALETTE.BLACK_900};
      font-size: 2.1rem;
    }
  }

  &:last-child {
    left: auto;
    right: 1rem;
  }
`;

export const Month = styled.span`
  margin: 0;
  left: 2rem;
  right: 2rem;
  text-align: center;
  cursor: pointer;
  font-weight: 400;
  font-size: 2rem;
  line-height: ${2 * LINE_HEIGHT_SCALE}rem;
`;

export const Year = styled.span`
  font-weight: 300;
  font-size: 1rem;
`;
