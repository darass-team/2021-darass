import dayjs from "dayjs";
import "dayjs/locale/ko";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);
import { Container } from "./styles";

export interface Props {
  date: dayjs.Dayjs;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  changeDate: (date: dayjs.Dayjs) => void;
}

export interface DayInfo {
  isToday: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isWithInPeriod: boolean;
}

const Day = ({ date, startDate, endDate, changeDate }: Props) => {
  const dayInfo: DayInfo = {
    isToday: dayjs().isSame(date, "day"),
    isStartDate: date.isSame(startDate, "day"),
    isEndDate: date.isSame(endDate, "day"),
    isWithInPeriod: date.isBetween(startDate, endDate, "day")
  };

  const isWithIn1Year = date.isBetween(dayjs().subtract(1, "year"), dayjs());

  return (
    <Container onClick={() => changeDate(date)} dayInfo={dayInfo} disabled={!isWithIn1Year}>
      {date.date()}
    </Container>
  );
};

export default Day;
