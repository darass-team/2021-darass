import styled from "styled-components";
import { contentBoxCSS, titleCSS } from "../../../styles/css";
import { PALETTE } from "../../../styles/palette";

export const Container = styled.div`
  ${contentBoxCSS}
`;

export const Title = styled.h2`
  ${titleCSS};
`;

export const ChartArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const SortButtonsWrapper = styled.div`
  align-self: flex-end;
  margin-bottom: 1rem;
`;

export const SortButton = styled.button.attrs({ type: "button" })<{ isSelected: boolean }>`
  border: 1px solid ${PALETTE.GRAY_400};
  padding: 0.5rem 1rem;
  background-color: ${({ isSelected }) => isSelected && PALETTE.GRAY_500};

  &:not(:first-child) {
    border-left: none;
  }

  &:hover {
    background-color: ${PALETTE.GRAY_500};
  }
`;

export const DataTable = styled.table`
  margin-top: 2rem;
  width: 100%;
  border: 1px solid ${PALETTE.GRAY_400};
  border-collapse: collapse;

  thead {
    background-color: ${PALETTE.PRIMARY};
  }

  tr {
    &:nth-child(2n) {
      background-color: ${PALETTE.GRAY_200};
    }
  }

  th,
  td {
    border: 1px solid ${PALETTE.GRAY_400};
    text-align: left;
    padding: 0.5rem;
  }
`;
