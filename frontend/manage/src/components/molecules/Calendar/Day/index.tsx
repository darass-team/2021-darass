import moment from "moment";
import { Container } from "./styles";

export interface Props {
  date: moment.Moment;
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  changeDate: (date: moment.Moment) => void;
}

export interface DayInfo {
  isToday: boolean;
  isStartDate: boolean;
  isEndDate: boolean;
  isWithInPeriod: boolean;
}

const Day = ({ date, startDate, endDate, changeDate }: Props) => {
  const dayInfo: DayInfo = {
    isToday: moment().isSame(date, "day"),
    isStartDate: date.isSame(startDate, "day"),
    isEndDate: date.isSame(endDate, "day"),
    isWithInPeriod: date.isBetween(startDate, endDate, "day")
  };

  const isFutureDate = moment().diff(date) < 0;

  return (
    <Container onClick={() => changeDate(date)} dayInfo={dayInfo} disabled={isFutureDate}>
      {date.date()}
    </Container>
  );
};

export default Day;
