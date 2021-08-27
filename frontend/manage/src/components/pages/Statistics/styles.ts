import styled from "styled-components";
import { Z_INDEX } from "../../../styles/constants";
import { contentBoxCSS, titleCSS } from "../../../styles/css";
import { PALETTE } from "../../../styles/palette";
import TooltipComponent from "../../atoms/Tooltip";
import CalendarComponent from "../../molecules/Calendar";

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

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const Calendar = styled(CalendarComponent)<{ isOpen: boolean }>`
  position: absolute;
  top: 4rem;
  left: 5.5rem;
  z-index: ${({ isOpen }) => (isOpen ? Z_INDEX.MODAL + 1 : -1)};
`;

export const Meta = styled.span`
  min-width: 4.5rem;
  @media all and (max-width: 450px) {
    display: none;
  }
`;

export const DataInputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const DateInputText = styled.span`
  border-radius: 10px;
  height: fit-content;
  border: 1px solid ${PALETTE.GRAY_400};
  padding: 0.5rem;
  user-select: none;
  cursor: pointer;
`;

export const DateRange = styled.span`
  margin-left: 1rem;
`;

export const SortButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 0 auto;
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

  @media all and (max-width: 450px) {
    padding: 0.5rem;
  }
`;

export const Tooltip = styled(TooltipComponent)`
  margin-left: 1rem;
  & > span {
    transform: translate(-95%, 50%);
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

  tbody {
    width: 100%;
  }

  tr {
    &:nth-child(2n) {
      background-color: ${PALETTE.GRAY_200};
    }
  }

  th {
    width: 50%;
  }

  th,
  td {
    border: 1px solid ${PALETTE.GRAY_400};
    text-align: left;
    padding: 0.5rem;
  }
`;
