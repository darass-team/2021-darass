import styled from "styled-components";
import { LINE_HEIGHT_SCALE } from "@/constants/styles/constants";
import { PALETTE } from "@/constants/styles/palette";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageIndexWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PageIndex = styled.span<{ isCurrentPageIndex: boolean }>`
  padding: 0.2rem 1rem;
  border-right: 1px solid ${PALETTE.GRAY_400};
  font-size: 1.2rem;
  font-weight: ${({ isCurrentPageIndex }) => (isCurrentPageIndex ? 700 : 500)};
  cursor: pointer;
  ${({ isCurrentPageIndex }) => isCurrentPageIndex && `background-color: ${PALETTE.GRAY_200}`};

  &:first-child {
    border-left: 1px solid ${PALETTE.GRAY_400};
  }
`;

export const PageIndexMoveButton = styled.button.attrs({ type: "button" })`
  padding-bottom: 0.3em;
  font-size: 3rem;
  line-height: ${3 * LINE_HEIGHT_SCALE}rem;
  text-align: center;
  vertical-align: middle;

  &:disabled {
    color: ${PALETTE.GRAY_400};
    cursor: not-allowed;
  }
`;
