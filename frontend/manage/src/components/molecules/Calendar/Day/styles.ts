import { PALETTE } from "@/constants/styles/palette";
import styled, { css } from "styled-components";
import { DayInfo } from ".";

const todayCSS = css`
  font-weight: 700;
  background-color: ${PALETTE.GRAY_500};
  border-radius: 10px;
`;

const startDayCSS = css`
  border-radius: 10px 0 0 10px;
  background-color: ${PALETTE.PRIMARY};
`;

const endDayCSS = css`
  border-radius: 0 10px 10px 0;
  background-color: ${PALETTE.PRIMARY};
`;

const bothWithStartAndEndDayCSS = css`
  border-radius: 10px;
`;

const withIndPeriodCSS = css`
  background-color: ${PALETTE.PRIMARY};
  border-radius: 0;
`;

export const Container = styled.button.attrs({ type: "button" })<{ dayInfo: DayInfo }>`
  user-select: none;
  ${({ dayInfo: { isToday } }) => isToday && todayCSS};
  ${({ dayInfo: { isEndDate } }) => isEndDate && endDayCSS};
  ${({ dayInfo: { isStartDate } }) => isStartDate && startDayCSS};
  ${({ dayInfo: { isStartDate, isEndDate } }) => isStartDate && isEndDate && bothWithStartAndEndDayCSS};
  ${({ dayInfo: { isWithInPeriod } }) => isWithInPeriod && withIndPeriodCSS};

  transition: background-color 0.3s, border-radius 0.1s;

  &:disabled {
    cursor: not-allowed;
    color: ${PALETTE.GRAY_400};
  }
`;
