import styled from "styled-components";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const PageIndex = styled.span<{ isCurrentPageIndex: boolean }>`
  padding: 0.2rem 1rem;
  border-right: 1px solid ${PALETTE.GRAY_400};
  font-weight: ${({ isCurrentPageIndex }) => (isCurrentPageIndex ? 700 : 500)};
  cursor: pointer;
  ${({ isCurrentPageIndex }) => isCurrentPageIndex && `background-color: ${PALETTE.GRAY_200}`};

  &:first-child {
    border-left: 1px solid ${PALETTE.GRAY_400};
  }
`;
